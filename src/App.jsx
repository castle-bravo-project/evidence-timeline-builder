import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { 
  Upload, 
  Download, 
  Trash2,
  AlertCircle,
  CheckCircle,
  Loader2,
  BarChart3,
  TrendingUp,
  ZoomIn,
  ZoomOut,
  Filter
} from 'lucide-react'
import { processFiles } from './lib/fileProcessors.js'
import TimelineControls from './components/TimelineControls.jsx'
import EnhancedTimeline from './components/EnhancedTimeline.jsx'
import ExportPanel from './components/ExportPanel.jsx'
import './App.css'

// Debug: Check if import worked
console.log('processFiles imported:', typeof processFiles)

// Event details panel
const EventDetails = ({ event, onClose, onDelete }) => {
  if (!event) return null

  return (
    <Card className="timeline-panel">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{event.title}</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Category</label>
            <Badge className={`ml-2 category-${event.category}`}>
              {event.category}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium">Timestamp</label>
            <p className="text-sm text-muted-foreground">
              {new Date(event.timestamp).toLocaleString()}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <p className="text-sm text-muted-foreground">
              {event.description || 'No description available'}
            </p>
          </div>
          {event.metadata && (
            <div>
              <label className="text-sm font-medium">Metadata</label>
              <pre className="text-xs bg-muted p-2 rounded mt-1 overflow-auto">
                {JSON.stringify(event.metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// File upload component
const FileUpload = ({ onFileUpload, isProcessing, processingStatus, onCancelUpload }) => {
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      onFileUpload(files)
    }
    e.target.value = '' // Reset input
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.currentTarget.classList.remove('drag-over')
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      onFileUpload(files)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.currentTarget.classList.add('drag-over')
  }

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over')
  }

  return (
    <Card className="timeline-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Import Evidence
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors ${
            isProcessing ? 'opacity-50 pointer-events-none' : ''
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-accent animate-spin" />
              <Button
                variant="outline"
                size="sm"
                onClick={onCancelUpload}
                className="mb-2"
              >
                Cancel Upload
              </Button>
            </div>
          ) : (
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          )}

          <p className="text-sm text-muted-foreground mb-2">
            {isProcessing ? 'Processing files...' : 'Drop files here or click to browse'}
          </p>
          <p className="text-xs text-muted-foreground">
            Supports: CSV, JSON, Images, EML, Logs, and more
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Max file size: 100MB (50MB for text files)
          </p>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".csv,.json,.jpg,.jpeg,.png,.gif,.bmp,.webp,.eml,.msg,.log,.txt"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isProcessing}
          />
        </div>
        
        {/* Processing Status */}
        {processingStatus && (
          <div className="mt-4 space-y-2">
            {processingStatus.success > 0 && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Successfully processed {processingStatus.success} file(s)
                </AlertDescription>
              </Alert>
            )}
            {processingStatus.errors.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to process {processingStatus.errors.length} file(s):
                  <ul className="mt-1 text-xs">
                    {processingStatus.errors.slice(0, 3).map((error, index) => (
                      <li key={index}>• {error.file}: {error.error}</li>
                    ))}
                    {processingStatus.errors.length > 3 && (
                      <li>• ... and {processingStatus.errors.length - 3} more</li>
                    )}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Main App component
function App() {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Email Received',
      timestamp: Date.now() - 86400000 * 5, // 5 days ago
      category: 'communication',
      description: 'Important email from client',
      metadata: { sender: 'client@example.com', subject: 'Project Update' }
    },
    {
      id: '2',
      title: 'Document Created',
      timestamp: Date.now() - 86400000 * 3, // 3 days ago
      category: 'document',
      description: 'Contract document created',
      metadata: { filename: 'contract.pdf', size: '2.5MB' }
    },
    {
      id: '3',
      title: 'System Log Entry',
      timestamp: Date.now() - 86400000 * 1, // 1 day ago
      category: 'system',
      description: 'User login detected',
      metadata: { ip: '192.168.1.100', user: 'admin' }
    }
  ])
  
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [filter, setFilter] = useState('all')
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStatus, setProcessingStatus] = useState(null)
  const [abortController, setAbortController] = useState(null)
  const [showConnections, setShowConnections] = useState(false)
  const [timeRange, setTimeRange] = useState('all')

  const handleCancelUpload = useCallback(() => {
    if (abortController) {
      abortController.abort()
      setAbortController(null)
      setIsProcessing(false)
      setProcessingStatus({
        success: 0,
        errors: [{ file: 'Upload', error: 'Upload cancelled by user' }]
      })

      // Clear status after 3 seconds
      setTimeout(() => {
        setProcessingStatus(null)
      }, 3000)
    }
  }, [abortController])

  const handleFileUpload = useCallback(async (files) => {
    console.log('handleFileUpload called with files:', files)

    // Create new abort controller
    const controller = new AbortController()
    setAbortController(controller)
    setIsProcessing(true)
    setProcessingStatus(null)

    try {
      console.log('Starting file processing...')

      // Add timeout and cancellation support
      const timeoutPromise = new Promise((_, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('File processing timeout - operation took too long'))
        }, 60000) // 60 second timeout

        controller.signal.addEventListener('abort', () => {
          clearTimeout(timeout)
          reject(new Error('Upload cancelled'))
        })
      })

      const processingPromise = processFiles(files)

      const result = await Promise.race([processingPromise, timeoutPromise])

      // Check if operation was cancelled
      if (controller.signal.aborted) {
        return
      }

      console.log('File processing result:', result)

      // Add successfully processed events to timeline
      if (result.events.length > 0) {
        console.log('Adding events to timeline:', result.events.length)
        setEvents(prev => [...prev, ...result.events])
      }

      // Show processing status
      setProcessingStatus({
        success: result.events.length,
        errors: result.errors
      })

      // Clear status after 5 seconds
      setTimeout(() => {
        setProcessingStatus(null)
      }, 5000)

    } catch (error) {
      if (error.message === 'Upload cancelled') {
        console.log('Upload was cancelled')
        return
      }

      console.error('Error processing files:', error)
      setProcessingStatus({
        success: 0,
        errors: [{ file: 'Unknown', error: error.message }]
      })
    } finally {
      setAbortController(null)
      setIsProcessing(false)
    }
  }, [])

  const handleEventDrop = useCallback((eventId, newTimestamp) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, timestamp: newTimestamp }
        : event
    ))
    if (selectedEvent?.id === eventId) {
      setSelectedEvent(prev => prev ? { ...prev, timestamp: newTimestamp } : null)
    }
  }, [selectedEvent])

  const handleDeleteEvent = useCallback(() => {
    if (selectedEvent) {
      setEvents(prev => prev.filter(event => event.id !== selectedEvent.id))
      setSelectedEvent(null)
    }
  }, [selectedEvent])

  const handleResetView = useCallback(() => {
    setZoomLevel(1)
    setFilter('all')
    setTimeRange('all')
    setSelectedEvent(null)
    setShowConnections(false)
  }, [])

  const handleToggleConnections = useCallback(() => {
    setShowConnections(prev => !prev)
  }, [])

  const handleClearData = useCallback(() => {
    setEvents([])
    setSelectedEvent(null)
    setFilter('all')
    setTimeRange('all')
    setZoomLevel(1)
    setShowConnections(false)
  }, [])

  const filteredEvents = events.filter(event =>
    filter === 'all' || event.category === filter
  )

  return (
    <div className="timeline-container min-h-screen">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Evidence Timeline Builder</h1>
          <p className="text-muted-foreground">
            Create interactive timelines from evidence files with drag-and-drop functionality
          </p>
        </div>

        {/* Timeline Controls */}
        <TimelineControls
          zoomLevel={zoomLevel}
          onZoomChange={setZoomLevel}
          filter={filter}
          onFilterChange={setFilter}
          events={events}
          onResetView={handleResetView}
          showConnections={showConnections}
          onToggleConnections={handleToggleConnections}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onClearData={handleClearData}
        />

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-3">
            <EnhancedTimeline
              events={filteredEvents}
              zoomLevel={zoomLevel}
              onEventSelect={setSelectedEvent}
              selectedEvent={selectedEvent}
              onEventDrop={handleEventDrop}
              showConnections={showConnections}
              timeRange={timeRange}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <FileUpload
              onFileUpload={handleFileUpload}
              isProcessing={isProcessing}
              processingStatus={processingStatus}
              onCancelUpload={handleCancelUpload}
            />
            
            {selectedEvent && (
              <EventDetails
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
                onDelete={handleDeleteEvent}
              />
            )}

            {/* Statistics */}
            <Card className="timeline-panel">
              <CardHeader>
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Events:</span>
                    <span className="font-medium">{events.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Communication:</span>
                    <span className="font-medium">
                      {events.filter(e => e.category === 'communication').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Documents:</span>
                    <span className="font-medium">
                      {events.filter(e => e.category === 'document').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>System Events:</span>
                    <span className="font-medium">
                      {events.filter(e => e.category === 'system').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Panel */}
            <ExportPanel
              events={events}
              selectedEvent={selectedEvent}
              filter={filter}
              timeRange={timeRange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

