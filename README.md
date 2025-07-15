# Evidence Timeline Builder

A comprehensive web application for creating interactive timelines from evidence files with advanced visualization, filtering, and export capabilities. Perfect for digital forensics, legal investigations, incident response, and any scenario requiring chronological analysis of evidence.

![Evidence Timeline Builder](https://img.shields.io/badge/React-19.1.0-blue) ![Vite](https://img.shields.io/badge/Vite-6.3.5-green) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

## 🌐 Live Demo

**Try it now:** [https://castle-bravo-project.github.io/evidence-timeline-builder/](https://castle-bravo-project.github.io/evidence-timeline-builder/)

## 📖 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage Guide](#-usage-guide)
- [File Format Support](#-file-format-support)
- [Export Options](#-export-options)
- [Advanced Features](#-advanced-features)
- [API Reference](#-api-reference)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

### 🎯 Core Timeline Functionality
- **Interactive Timeline Visualization**: Drag-and-drop timeline with smooth zooming and panning
- **Multi-format File Support**: CSV, JSON, Images (with EXIF), Email files, Log files, and more
- **Real-time Processing**: Client-side file processing with instant feedback and progress tracking
- **Advanced Filtering**: Filter by category, date range, keywords, and custom criteria
- **Event Management**: Add, edit, delete, and organize timeline events with full metadata support
- **Drag-and-Drop Reordering**: Easily adjust event timing and relationships with visual feedback

### 📊 Professional Export Options
- **Multiple Export Formats**: JSON, CSV, PDF reports, HTML timelines, and image exports
- **Customizable Reports**: Include/exclude metadata, descriptions, timestamps, and categories
- **Professional PDF Reports**: Formatted reports with charts, statistics, and event details
- **Interactive HTML Export**: Standalone HTML files with full timeline functionality
- **Data Preservation**: Export maintains all metadata and relationships between events

### 🎨 Advanced Visualization
- **Dark Theme Interface**: Professional dark theme optimized for long analysis sessions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Connection Visualization**: Show relationships and connections between events
- **Statistical Dashboard**: Real-time analytics and event distribution charts
- **Zoom and Navigation**: Precise timeline navigation with multiple zoom levels
- **Event Categories**: Color-coded categories for different types of evidence

### 🔒 Privacy and Security
- **Client-Side Processing**: All data processing happens in your browser - no external servers
- **No Data Transmission**: Files never leave your device unless you explicitly export them
- **Local Storage Options**: Choose whether to save data locally for future sessions
- **Secure by Design**: No cookies, tracking, or external dependencies for core functionality

## ⚡ Quick Start

### Option 1: Use the Live Application (Recommended)
1. Visit [https://castle-bravo-project.github.io/evidence-timeline-builder/](https://castle-bravo-project.github.io/evidence-timeline-builder/)
2. Upload your evidence files using the drag-and-drop interface
3. Explore the interactive timeline and use the controls to analyze your data
4. Export your timeline in your preferred format

### Option 2: Run Locally
```bash
# Clone the repository
git clone https://github.com/castle-bravo-project/evidence-timeline-builder.git
cd evidence-timeline-builder

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Open http://localhost:5173 in your browser
```

## 🛠️ Installation

### Prerequisites
- **Node.js 18+** (Download from [nodejs.org](https://nodejs.org/))
- **pnpm** (recommended) or npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step-by-Step Installation

#### 1. Install Node.js and pnpm
```bash
# Install Node.js (if not already installed)
# Download from https://nodejs.org/

# Install pnpm globally
npm install -g pnpm

# Verify installation
node --version  # Should be 18.0.0 or higher
pnpm --version  # Should be 8.0.0 or higher
```

#### 2. Clone and Setup Project
```bash
# Clone the repository
git clone https://github.com/castle-bravo-project/evidence-timeline-builder.git

# Navigate to project directory
cd evidence-timeline-builder

# Install dependencies
pnpm install

# Verify installation
pnpm run build  # Should complete without errors
```

#### 3. Development Setup
```bash
# Start development server
pnpm run dev

# The application will be available at:
# http://localhost:5173

# For network access (other devices on same network)
pnpm run dev --host
```

#### 4. Production Build
```bash
# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Deploy to GitHub Pages (if you have push access)
pnpm run deploy
```

### Alternative Installation Methods

#### Using npm (if pnpm is not available)
```bash
# Install dependencies with npm
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

#### Using Docker (Optional)
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm && pnpm install
COPY . .
EXPOSE 5173
CMD ["pnpm", "run", "dev", "--host"]
```

```bash
# Build and run with Docker
docker build -t evidence-timeline-builder .
docker run -p 5173:5173 evidence-timeline-builder
```

## 📚 Usage Guide

### Getting Started with Your First Timeline

#### 1. Upload Evidence Files
The application supports multiple file formats. Here's how to get started:

**Drag and Drop Method:**
1. Open the application
2. Locate the upload area in the right sidebar
3. Drag your evidence files directly onto the upload zone
4. Files will be processed automatically

**Browse and Select Method:**
1. Click the upload area
2. Select files from your computer
3. Multiple files can be selected at once
4. Processing begins immediately

#### 2. Understanding the Interface

**Main Timeline View:**
- **Timeline Grid**: Shows chronological events with time markers
- **Event Cards**: Individual evidence items displayed as interactive cards
- **Zoom Controls**: Located in the top toolbar for timeline navigation
- **Category Filters**: Filter events by type (communication, document, system, etc.)

**Sidebar Panels:**
- **Upload Panel**: For adding new evidence files
- **Event Details**: Shows detailed information when an event is selected
- **Statistics**: Real-time analytics about your timeline
- **Export Options**: Various export formats and settings

#### 3. Working with Events

**Selecting Events:**
- Click any event card to view detailed information
- Selected events are highlighted with a blue border
- Event details appear in the right sidebar

**Editing Events:**
- Select an event to view its details
- Click the edit button to modify title, description, or category
- Changes are saved automatically

**Moving Events:**
- Drag event cards to new positions on the timeline
- Time stamps are updated automatically
- Visual feedback shows valid drop zones

**Deleting Events:**
- Select the event you want to remove
- Click the delete button (trash icon) in the event details panel
- Confirm the deletion when prompted

### Advanced Timeline Navigation

#### Zoom and Pan Controls
```
Zoom In/Out: Use the zoom slider or mouse wheel
Pan: Click and drag on empty timeline areas
Reset View: Click the reset button to return to default view
Time Range: Select specific date ranges using the time controls
```

#### Filtering and Search
- **Category Filter**: Show only specific types of events
- **Date Range**: Focus on specific time periods
- **Text Search**: Find events containing specific keywords
- **Advanced Filters**: Combine multiple criteria for precise results

#### Connection Visualization
- Toggle connection view to see relationships between events
- Connections are drawn as lines between related events
- Useful for understanding event sequences and dependencies

### Working with Different File Types

The application automatically detects and processes various file formats:

#### CSV Files
Expected format:
```csv
timestamp,title,description,category,source
2025-01-15 10:30:00,Meeting with Client,Important project discussion,communication,calendar
2025-01-16 14:15:00,Contract Signed,Legal agreement finalized,document,legal_dept
```

**Supported CSV Columns:**
- `timestamp` (required): Date/time in various formats
- `title` (required): Event title/name
- `description` (optional): Detailed description
- `category` (optional): Event category
- `source` (optional): Source of the evidence
- Custom columns are preserved as metadata

#### JSON Files
Expected format:
```json
{
  "events": [
    {
      "timestamp": "2025-01-15T10:30:00Z",
      "title": "Security Alert",
      "description": "Unauthorized access attempt detected",
      "category": "system",
      "metadata": {
        "severity": "high",
        "ip_address": "192.168.1.50"
      }
    }
  ]
}
```

#### Image Files
- **EXIF Data Extraction**: Automatically extracts creation timestamps
- **Supported Formats**: JPEG, PNG, GIF, BMP, WebP
- **Metadata Preservation**: Camera settings, GPS coordinates (if available)
- **Thumbnail Generation**: Automatic thumbnail creation for timeline display

#### Log Files
- **Automatic Parsing**: Detects common log formats
- **Timestamp Recognition**: Supports various timestamp formats
- **Multi-line Events**: Handles stack traces and multi-line log entries
- **Custom Patterns**: Configurable parsing rules

#### Email Files
- **EML Support**: Standard email format processing
- **Header Extraction**: From, To, Subject, Date information
- **Attachment Handling**: Lists and processes email attachments
- **Thread Reconstruction**: Groups related emails together

## 📁 File Format Support

### Supported Input Formats

| Format | Extension | Description | Auto-Detection |
|--------|-----------|-------------|----------------|
| CSV | `.csv` | Comma-separated values with timeline data | ✅ |
| JSON | `.json` | Structured timeline data | ✅ |
| Images | `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.webp` | Photos with EXIF timestamps | ✅ |
| Email | `.eml`, `.msg` | Email files with metadata | ✅ |
| Logs | `.log`, `.txt` | System and application logs | ✅ |
| XML | `.xml` | Structured data files | ✅ |
| Plain Text | `.txt` | Text files with timestamps | ✅ |

### File Processing Details

#### CSV Processing
- **Flexible Headers**: Automatically detects column names
- **Date Parsing**: Supports multiple date/time formats
- **Encoding Support**: UTF-8, ASCII, and other common encodings
- **Large Files**: Efficient processing of files up to 100MB

#### JSON Processing
- **Schema Validation**: Validates JSON structure
- **Nested Objects**: Handles complex nested data structures
- **Array Processing**: Processes arrays of events
- **Metadata Preservation**: Maintains all original data

#### Image Processing
- **EXIF Extraction**: Reads camera metadata
- **Timestamp Sources**: Creation time, modification time, EXIF data
- **Thumbnail Generation**: Creates preview images
- **Batch Processing**: Handles multiple images efficiently

### Sample Files

The application includes sample files for testing:

#### sample_evidence.csv
```csv
timestamp,title,description,category,source
2025-07-10 10:30:00,Meeting with Client,Important project discussion,communication,calendar
2025-07-11 14:15:00,Contract Signed,Legal agreement finalized,document,legal_dept
2025-07-12 09:00:00,System Backup,Automated backup completed,system,server_logs
2025-07-13 16:45:00,Photo Evidence,Crime scene photograph,media,investigation
2025-07-14 11:20:00,Email Thread,Follow-up correspondence,communication,email_server
```

#### sample_evidence.json
```json
{
  "events": [
    {
      "timestamp": "2025-07-10T08:30:00Z",
      "title": "Security Alert",
      "description": "Unauthorized access attempt detected",
      "category": "system",
      "severity": "high",
      "ip_address": "192.168.1.50"
    },
    {
      "timestamp": "2025-07-11T14:22:00Z",
      "title": "Document Upload",
      "description": "Evidence file uploaded to case management system",
      "category": "document",
      "filename": "evidence_001.pdf",
      "user": "detective_smith"
    }
  ]
}
```

## 📤 Export Options

### Quick Export Formats

#### JSON Export
```json
{
  "timeline": {
    "title": "Evidence Timeline Report",
    "created": "2025-01-15T10:30:00Z",
    "events": [
      {
        "id": "evt_001",
        "timestamp": "2025-01-10T08:30:00Z",
        "title": "Security Alert",
        "description": "Unauthorized access attempt detected",
        "category": "system",
        "metadata": {
          "severity": "high",
          "ip_address": "192.168.1.50"
        }
      }
    ],
    "statistics": {
      "total_events": 15,
      "categories": {
        "system": 5,
        "communication": 4,
        "document": 3,
        "media": 2,
        "other": 1
      }
    }
  }
}
```

#### CSV Export
```csv
timestamp,title,description,category,metadata
2025-01-10T08:30:00Z,Security Alert,Unauthorized access attempt detected,system,"{""severity"":""high"",""ip_address"":""192.168.1.50""}"
2025-01-11T14:22:00Z,Document Upload,Evidence file uploaded to case management system,document,"{""filename"":""evidence_001.pdf"",""user"":""detective_smith""}"
```

### Advanced Export Options

#### PDF Reports
- **Professional Layout**: Formatted reports with headers, footers, and page numbers
- **Charts and Graphs**: Visual representations of timeline data
- **Event Details**: Full event information with metadata
- **Customizable Sections**: Choose which sections to include
- **Print-Ready**: Optimized for printing and archival

#### HTML Export
- **Standalone Files**: Self-contained HTML with embedded CSS and JavaScript
- **Interactive Features**: Clickable events, zoom controls, and filtering
- **Responsive Design**: Works on all devices and screen sizes
- **Offline Capable**: No internet connection required

#### Image Export
- **High Resolution**: Vector-based timeline images
- **Multiple Formats**: PNG, SVG, JPEG
- **Custom Dimensions**: Specify exact pixel dimensions
- **Timeline Snapshots**: Capture current view or entire timeline

### Export Configuration Examples

#### PDF Export Settings
```javascript
const pdfConfig = {
  includeMetadata: true,
  includeDescriptions: true,
  includeTimestamps: true,
  includeCategories: true,
  includeStatistics: true,
  dateFormat: 'iso', // 'iso', 'us', 'eu', 'relative'
  reportTitle: 'Evidence Timeline Report',
  pageSize: 'A4',
  orientation: 'portrait'
};
```

#### HTML Export Settings
```javascript
const htmlConfig = {
  includeInteractivity: true,
  embedAssets: true,
  customCSS: 'path/to/custom.css',
  title: 'Interactive Timeline Report',
  showControls: true
};
```

## 🔧 Advanced Features

### Timeline Customization

#### Visual Themes
- **Dark Theme** (default): Professional dark interface optimized for long sessions
- **Light Theme**: Traditional light interface for presentations
- **High Contrast**: Accessibility-optimized theme for better visibility
- **Custom Themes**: Create your own color schemes and layouts

#### Layout Options
- **Compact View**: Display more events in less space
- **Detailed View**: Larger event cards with expanded information
- **List View**: Traditional chronological list format
- **Grid View**: Card-based layout for better visual organization

### Data Analysis Tools

#### Statistical Analysis
```javascript
// Available statistics
const stats = {
  totalEvents: 150,
  dateRange: {
    start: '2025-01-01T00:00:00Z',
    end: '2025-01-31T23:59:59Z'
  },
  categories: {
    system: 45,
    communication: 38,
    document: 32,
    media: 20,
    other: 15
  },
  timeDistribution: {
    morning: 35,
    afternoon: 60,
    evening: 40,
    night: 15
  }
};
```

#### Advanced Search and Filtering
```javascript
// Complex search example
const searchQuery = {
  text: "security alert",
  categories: ["system", "security"],
  dateRange: {
    start: "2025-01-01",
    end: "2025-01-31"
  },
  metadata: {
    severity: ["high", "critical"],
    source: "firewall"
  },
  excludeCategories: ["test", "debug"]
};
```

### Performance Features

#### Large Dataset Handling
- **Virtual Scrolling**: Efficiently render thousands of events
- **Lazy Loading**: Load events on-demand as user scrolls
- **Data Chunking**: Process large files in manageable segments
- **Memory Management**: Automatic cleanup of unused resources

#### Browser Optimization
- **Service Workers**: Offline functionality and caching
- **Web Workers**: Background processing for large files
- **IndexedDB**: Client-side database for persistent storage
- **Compression**: Efficient data storage and transfer

## 🔌 API Reference

### Core Timeline API

#### Initialize Timeline
```javascript
import { EvidenceTimeline } from './src/components/EnhancedTimeline.jsx';

const timeline = new EvidenceTimeline({
  container: '#timeline-container',
  events: [],
  options: {
    theme: 'dark',
    zoomLevel: 1,
    showConnections: false,
    enableDragDrop: true
  }
});
```

#### Event Management
```javascript
// Add single event
timeline.addEvent({
  id: 'evt_001',
  timestamp: '2025-01-15T10:30:00Z',
  title: 'Security Alert',
  description: 'Unauthorized access detected',
  category: 'system',
  metadata: { severity: 'high' }
});

// Add multiple events
timeline.addEvents([event1, event2, event3]);

// Update event
timeline.updateEvent('evt_001', {
  title: 'Updated Security Alert',
  description: 'Updated description'
});

// Remove event
timeline.removeEvent('evt_001');

// Get all events
const events = timeline.getEvents();

// Get filtered events
const filteredEvents = timeline.getEvents({
  category: 'system',
  dateRange: {
    start: '2025-01-01',
    end: '2025-01-31'
  }
});
```

#### File Processing API
```javascript
import { processFiles } from './src/lib/fileProcessors.js';

// Process uploaded files
const result = await processFiles(fileList);

console.log('Processed events:', result.events);
console.log('Processing errors:', result.errors);

// Process single file
const singleResult = await processFiles([file]);
```

#### Export API
```javascript
// Export to JSON
const jsonData = timeline.exportJSON({
  includeMetadata: true,
  includeStatistics: true
});

// Export to CSV
const csvData = timeline.exportCSV({
  includeHeaders: true,
  dateFormat: 'iso'
});

// Export to PDF
await timeline.exportPDF({
  filename: 'timeline-report.pdf',
  includeCharts: true,
  pageSize: 'A4'
});

// Export to HTML
const htmlData = timeline.exportHTML({
  includeInteractivity: true,
  embedAssets: true
});
```

### Event Listeners
```javascript
// Listen for timeline events
timeline.on('eventAdded', (event) => {
  console.log('Event added:', event);
});

timeline.on('eventUpdated', (event) => {
  console.log('Event updated:', event);
});

timeline.on('eventDeleted', (eventId) => {
  console.log('Event deleted:', eventId);
});

timeline.on('zoomChanged', (zoomLevel) => {
  console.log('Zoom level changed:', zoomLevel);
});

timeline.on('filterChanged', (filters) => {
  console.log('Filters changed:', filters);
});
```

### Configuration Options
```javascript
const config = {
  // Visual options
  theme: 'dark', // 'dark', 'light', 'high-contrast'
  layout: 'timeline', // 'timeline', 'list', 'grid'

  // Timeline options
  zoomLevel: 1, // 0.1 to 10
  showConnections: false,
  enableDragDrop: true,
  autoSave: true,

  // Performance options
  virtualScrolling: true,
  lazyLoading: true,
  maxEvents: 10000,

  // Export options
  defaultExportFormat: 'json',
  exportOptions: {
    includeMetadata: true,
    includeDescriptions: true,
    dateFormat: 'iso'
  }
};
```

## 🐛 Troubleshooting

### Common Issues and Solutions

#### File Upload Issues

**Problem**: Files not uploading or processing
```
Solution:
1. Check file format is supported
2. Ensure file size is under 100MB
3. Verify file is not corrupted
4. Try uploading one file at a time
```

**Problem**: CSV files not parsing correctly
```
Solution:
1. Ensure CSV has proper headers
2. Check timestamp format is recognized
3. Verify encoding is UTF-8
4. Remove special characters from headers
```

**Problem**: Images not showing timestamps
```
Solution:
1. Verify images have EXIF data
2. Check if camera recorded timestamp
3. Try different image formats
4. Use image metadata tools to verify
```

#### Timeline Display Issues

**Problem**: Timeline appears blank or empty
```
Solution:
1. Check browser console for errors
2. Verify events have valid timestamps
3. Try refreshing the page
4. Clear browser cache and reload
```

**Problem**: Events not displaying in correct order
```
Solution:
1. Check timestamp formats are consistent
2. Verify timezone information
3. Use ISO 8601 format for best results
4. Check for duplicate timestamps
```

**Problem**: Drag and drop not working
```
Solution:
1. Ensure modern browser is being used
2. Check if JavaScript is enabled
3. Try disabling browser extensions
4. Verify mouse/touch input is working
```

#### Export Issues

**Problem**: PDF export fails or produces blank pages
```
Solution:
1. Reduce number of events in export
2. Check browser popup blocker settings
3. Try different export options
4. Use Chrome or Firefox for best results
```

**Problem**: CSV export missing data
```
Solution:
1. Check export configuration settings
2. Verify all required fields are included
3. Try exporting smaller date ranges
4. Check for special characters in data
```

### Browser Compatibility

#### Supported Browsers
- **Chrome 90+**: Full feature support
- **Firefox 88+**: Full feature support
- **Safari 14+**: Full feature support
- **Edge 90+**: Full feature support

#### Known Limitations
- **Internet Explorer**: Not supported
- **Safari < 14**: Limited file processing
- **Mobile browsers**: Reduced drag-and-drop functionality

#### Performance Recommendations
- **RAM**: Minimum 4GB for large datasets
- **Storage**: 1GB free space for caching
- **Network**: Broadband for initial load
- **Display**: 1920x1080 minimum resolution

### Error Messages

#### Common Error Codes
```
ETB-001: File format not supported
ETB-002: File size exceeds limit
ETB-003: Invalid timestamp format
ETB-004: Memory limit exceeded
ETB-005: Export generation failed
```

#### Debug Mode
```javascript
// Enable debug mode
localStorage.setItem('etb-debug', 'true');

// View debug logs
console.log(timeline.getDebugInfo());

// Clear debug data
timeline.clearDebugData();
```

### Getting Help

#### Support Channels
- **GitHub Issues**: [Report bugs and request features](https://github.com/castle-bravo-project/evidence-timeline-builder/issues)
- **Documentation**: Check this README and inline help
- **Community**: Join discussions in GitHub Discussions

#### Before Reporting Issues
1. Check this troubleshooting section
2. Search existing GitHub issues
3. Try reproducing in different browser
4. Gather error messages and console logs
5. Prepare sample files if relevant

## 🤝 Contributing

We welcome contributions to the Evidence Timeline Builder! Here's how you can help:

### Development Setup
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/evidence-timeline-builder.git
cd evidence-timeline-builder

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Run tests
pnpm run test

# Build for production
pnpm run build
```

### Contribution Guidelines

#### Code Style
- Use ESLint configuration provided
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

#### Testing
- Write unit tests for new features
- Test across multiple browsers
- Include sample files for testing
- Document test procedures

#### Pull Request Process
1. Create feature branch from main
2. Make your changes with tests
3. Update documentation if needed
4. Submit pull request with description
5. Respond to review feedback

### Areas for Contribution
- **File Format Support**: Add new file type processors
- **Export Formats**: Implement additional export options
- **Visualization**: Enhance timeline display features
- **Performance**: Optimize for larger datasets
- **Accessibility**: Improve WCAG compliance
- **Documentation**: Expand guides and examples

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ No warranty provided
- ❌ No liability assumed

## 🙏 Acknowledgments

### Technologies Used
- **React**: UI framework for building the interface
- **Vite**: Build tool for fast development and production builds
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **date-fns**: Modern JavaScript date utility library

### Special Thanks
- **Shadcn/ui**: For the excellent component library foundation
- **Tailwind CSS Team**: For the utility-first CSS framework
- **React Team**: For the powerful UI framework
- **Vite Team**: For the lightning-fast build tool
- **Open Source Community**: For inspiration and contributions

### Inspiration
This project was inspired by the need for better digital forensics tools and timeline analysis capabilities in legal and security investigations.

---

**Built with ❤️ for digital forensics and evidence analysis professionals**

For more information, visit: [https://castle-bravo-project.github.io/evidence-timeline-builder/](https://castle-bravo-project.github.io/evidence-timeline-builder/)
