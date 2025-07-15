// File processing utilities for Evidence Timeline Builder

// File size limits (in bytes)
const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB
const MAX_TEXT_FILE_SIZE = 50 * 1024 * 1024 // 50MB for text files

// Processing timeout (in milliseconds)
const PROCESSING_TIMEOUT = 30000 // 30 seconds

/**
 * Create a timeout promise that rejects after specified time
 */
const createTimeout = (ms, fileName) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`File processing timeout: ${fileName} took longer than ${ms/1000} seconds to process`))
    }, ms)
  })
}

/**
 * Validate file before processing
 */
const validateFile = (file) => {
  if (!file || !file.name) {
    throw new Error('Invalid file: File is missing or has no name')
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File too large: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds maximum size of ${MAX_FILE_SIZE / 1024 / 1024}MB`)
  }

  if (file.size === 0) {
    throw new Error(`Empty file: ${file.name} has no content`)
  }

  // Additional validation for text files
  const extension = file.name.toLowerCase().split('.').pop()
  const textExtensions = ['txt', 'log', 'csv', 'json', 'eml', 'msg']
  if (textExtensions.includes(extension) && file.size > MAX_TEXT_FILE_SIZE) {
    throw new Error(`Text file too large: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds maximum size of ${MAX_TEXT_FILE_SIZE / 1024 / 1024}MB for text files`)
  }
}

/**
 * Extract EXIF data from image files
 */
export const extractImageMetadata = async (file) => {
  validateFile(file)

  return Promise.race([
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
        // Basic image metadata
        const metadata = {
          filename: file.name,
          size: file.size,
          type: file.type,
          width: img.width,
          height: img.height,
          lastModified: file.lastModified
        }
        
        // Try to extract EXIF data (simplified)
        try {
          // For now, use file modification date as timestamp
          const timestamp = file.lastModified || Date.now()
          resolve({
            timestamp,
            metadata,
            title: `Image: ${file.name}`,
            description: `Image file (${img.width}x${img.height})`,
            category: 'media'
          })
        } catch (error) {
          console.warn('Could not extract EXIF data:', error)
          resolve({
            timestamp: file.lastModified || Date.now(),
            metadata,
            title: `Image: ${file.name}`,
            description: `Image file (${img.width}x${img.height})`,
            category: 'media'
          })
        }

        img.onerror = () => {
          reject(new Error(`Failed to load image: ${file.name}`))
        }
      }

      reader.onerror = () => {
        reject(new Error(`Failed to read image file: ${file.name}`))
      }

      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }),
  createTimeout(PROCESSING_TIMEOUT, file.name)
  ])
}

/**
 * Parse CSV files and extract timeline events
 */
export const parseCSVFile = async (file) => {
  validateFile(file)

  return Promise.race([
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
        const text = e.target.result
        const lines = text.split('\n').filter(line => line.trim())
        
        if (lines.length === 0) {
          reject(new Error('Empty CSV file'))
          return
        }
        
        // Parse header
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
        
        // Find timestamp column (various possible names)
        const timestampColumns = ['timestamp', 'date', 'time', 'datetime', 'created', 'modified']
        const timestampIndex = headers.findIndex(h => 
          timestampColumns.some(col => h.includes(col))
        )
        
        // Find title/description columns
        const titleIndex = headers.findIndex(h => 
          ['title', 'name', 'subject', 'description', 'event'].some(col => h.includes(col))
        )
        
        const events = []
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''))
          
          if (values.length < headers.length) continue
          
          let timestamp = Date.now()
          if (timestampIndex >= 0 && values[timestampIndex]) {
            const parsedDate = new Date(values[timestampIndex])
            if (!isNaN(parsedDate.getTime())) {
              timestamp = parsedDate.getTime()
            }
          }
          
          const title = titleIndex >= 0 ? values[titleIndex] : `CSV Row ${i}`
          
          // Create metadata object from all columns
          const metadata = {}
          headers.forEach((header, index) => {
            if (values[index]) {
              metadata[header] = values[index]
            }
          })
          
          events.push({
            id: `csv-${file.name}-${i}`,
            title: title || `CSV Entry ${i}`,
            timestamp,
            category: 'document',
            description: `Imported from CSV: ${file.name}`,
            metadata: {
              ...metadata,
              source: file.name,
              row: i
            }
          })
        }
        
        resolve(events)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error(`Failed to read CSV file: ${file.name}`))
    }

    reader.readAsText(file)
  }),
  createTimeout(PROCESSING_TIMEOUT, file.name)
  ])
}

/**
 * Parse JSON files and extract timeline events
 */
export const parseJSONFile = async (file) => {
  validateFile(file)

  return Promise.race([
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
        const data = JSON.parse(e.target.result)
        const events = []
        
        // Handle different JSON structures
        if (Array.isArray(data)) {
          // Array of objects
          data.forEach((item, index) => {
            const event = extractEventFromObject(item, file.name, index)
            if (event) events.push(event)
          })
        } else if (data.events && Array.isArray(data.events)) {
          // Object with events array
          data.events.forEach((item, index) => {
            const event = extractEventFromObject(item, file.name, index)
            if (event) events.push(event)
          })
        } else if (typeof data === 'object') {
          // Single object
          const event = extractEventFromObject(data, file.name, 0)
          if (event) events.push(event)
        }
        
        resolve(events)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error(`Failed to read JSON file: ${file.name}`))
    }

    reader.readAsText(file)
  }),
  createTimeout(PROCESSING_TIMEOUT, file.name)
  ])
}

/**
 * Extract event data from a JSON object
 */
const extractEventFromObject = (obj, filename, index) => {
  if (!obj || typeof obj !== 'object') return null
  
  // Look for timestamp fields
  const timestampFields = ['timestamp', 'date', 'time', 'datetime', 'created_at', 'updated_at', 'modified']
  let timestamp = Date.now()
  
  for (const field of timestampFields) {
    if (obj[field]) {
      const parsedDate = new Date(obj[field])
      if (!isNaN(parsedDate.getTime())) {
        timestamp = parsedDate.getTime()
        break
      }
    }
  }
  
  // Look for title fields
  const titleFields = ['title', 'name', 'subject', 'description', 'event', 'message']
  let title = `JSON Entry ${index + 1}`
  
  for (const field of titleFields) {
    if (obj[field] && typeof obj[field] === 'string') {
      title = obj[field]
      break
    }
  }
  
  // Determine category based on content
  let category = 'other'
  const objStr = JSON.stringify(obj).toLowerCase()
  if (objStr.includes('email') || objStr.includes('mail') || objStr.includes('message')) {
    category = 'communication'
  } else if (objStr.includes('file') || objStr.includes('document') || objStr.includes('pdf')) {
    category = 'document'
  } else if (objStr.includes('system') || objStr.includes('log') || objStr.includes('error')) {
    category = 'system'
  } else if (objStr.includes('image') || objStr.includes('video') || objStr.includes('media')) {
    category = 'media'
  }
  
  return {
    id: `json-${filename}-${index}`,
    title: title.substring(0, 100), // Limit title length
    timestamp,
    category,
    description: `Imported from JSON: ${filename}`,
    metadata: {
      ...obj,
      source: filename,
      index
    }
  }
}

/**
 * Process email files (simplified - for .eml files)
 */
export const parseEmailFile = async (file) => {
  validateFile(file)

  return Promise.race([
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
        const content = e.target.result
        const lines = content.split('\n')
        
        let subject = 'Unknown Subject'
        let from = 'Unknown Sender'
        let date = new Date()
        let to = 'Unknown Recipient'
        
        // Parse email headers
        for (const line of lines) {
          const lowerLine = line.toLowerCase()
          if (lowerLine.startsWith('subject:')) {
            subject = line.substring(8).trim()
          } else if (lowerLine.startsWith('from:')) {
            from = line.substring(5).trim()
          } else if (lowerLine.startsWith('date:')) {
            const dateStr = line.substring(5).trim()
            const parsedDate = new Date(dateStr)
            if (!isNaN(parsedDate.getTime())) {
              date = parsedDate
            }
          } else if (lowerLine.startsWith('to:')) {
            to = line.substring(3).trim()
          }
        }
        
        const event = {
          id: `email-${file.name}-${Date.now()}`,
          title: subject,
          timestamp: date.getTime(),
          category: 'communication',
          description: `Email from ${from}`,
          metadata: {
            from,
            to,
            subject,
            filename: file.name,
            size: file.size,
            type: file.type
          }
        }
        
        resolve([event])
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error(`Failed to read email file: ${file.name}`))
    }

    reader.readAsText(file)
  }),
  createTimeout(PROCESSING_TIMEOUT, file.name)
  ])
}

/**
 * Process system log files
 */
export const parseLogFile = async (file) => {
  validateFile(file)

  return Promise.race([
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
        const content = e.target.result
        const lines = content.split('\n').filter(line => line.trim())
        const events = []
        
        lines.forEach((line, index) => {
          // Try to extract timestamp from common log formats
          const timestampRegex = /(\d{4}-\d{2}-\d{2}[\s\T]\d{2}:\d{2}:\d{2})/
          const match = line.match(timestampRegex)
          
          let timestamp = file.lastModified || Date.now()
          if (match) {
            const parsedDate = new Date(match[1])
            if (!isNaN(parsedDate.getTime())) {
              timestamp = parsedDate.getTime()
            }
          }
          
          // Extract log level and message
          const logLevelRegex = /(ERROR|WARN|INFO|DEBUG|TRACE)/i
          const levelMatch = line.match(logLevelRegex)
          const level = levelMatch ? levelMatch[1].toUpperCase() : 'INFO'
          
          events.push({
            id: `log-${file.name}-${index}`,
            title: `Log Entry: ${level}`,
            timestamp,
            category: 'system',
            description: line.substring(0, 200), // First 200 chars
            metadata: {
              level,
              fullMessage: line,
              lineNumber: index + 1,
              filename: file.name,
              source: 'log'
            }
          })
        })
        
        resolve(events)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error(`Failed to read log file: ${file.name}`))
    }

    reader.readAsText(file)
  }),
  createTimeout(PROCESSING_TIMEOUT, file.name)
  ])
}

/**
 * Main file processor - determines file type and calls appropriate parser
 */
export const processFile = async (file) => {
  try {
    validateFile(file)

    const extension = file.name.toLowerCase().split('.').pop()
    const mimeType = file.type.toLowerCase()

    console.log(`Processing file: ${file.name} (${extension}, ${(file.size / 1024).toFixed(1)}KB)`)

    const startTime = Date.now()
    let result

    switch (extension) {
      case 'csv':
        result = await parseCSVFile(file)
        break

      case 'json':
        result = await parseJSONFile(file)
        break

      case 'eml':
      case 'msg':
        result = await parseEmailFile(file)
        break

      case 'log':
      case 'txt':
        if (file.name.toLowerCase().includes('log')) {
          result = await parseLogFile(file)
        } else {
          // Handle plain text files
          result = await parseLogFile(file) // Use log parser for text files
        }
        break

      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'webp':
        result = [await extractImageMetadata(file)]
        break

      default:
        // Generic file processing
        result = [{
          id: `file-${file.name}-${Date.now()}`,
          title: `File: ${file.name}`,
          timestamp: file.lastModified || Date.now(),
          category: mimeType.startsWith('image/') ? 'media' : 'document',
          description: `Imported file: ${file.name}`,
          metadata: {
            filename: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
          }
        }]
    }

    const processingTime = Date.now() - startTime
    console.log(`Successfully processed ${file.name} in ${processingTime}ms, generated ${result.length} events`)

    return result
  } catch (error) {
    console.error('Error processing file:', error)
    // Return a basic event even if processing fails
    return [{
      id: `error-${file.name}-${Date.now()}`,
      title: `Error: ${file.name}`,
      timestamp: file.lastModified || Date.now(),
      category: 'other',
      description: `Failed to process file: ${error.message}`,
      metadata: {
        filename: file.name,
        size: file.size,
        type: file.type,
        error: error.message
      }
    }]
  }
}

/**
 * Batch process multiple files
 */
export const processFiles = async (files) => {
  const allEvents = []
  const errors = []
  
  for (const file of files) {
    try {
      const events = await processFile(file)
      allEvents.push(...events)
    } catch (error) {
      errors.push({ file: file.name, error: error.message })
    }
  }
  
  return { events: allEvents, errors }
}

