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

### Core Functionality
- **Interactive Timeline Creation**: Drag-and-drop interface for positioning evidence chronologically
- **Multi-format Support**: Import timestamps from various file formats (CSV, JSON, images, logs, emails)
- **Event Categorization**: Color-coded categories (communication, document, system, media, other)
- **Advanced Filtering**: Filter by category, time range, and custom criteria
- **Zoom & Navigation**: Timeline zoom levels with smooth navigation controls
- **Evidence Linking**: Connect multiple pieces of evidence to single events

### Enhanced Timeline Features
- **Professional Timeline Controls**: Zoom slider, category filters, time range selection
- **Event Connection Visualization**: Show relationships between events
- **Fullscreen Timeline Mode**: Immersive timeline viewing experience
- **Responsive Design**: Works seamlessly on desktop and tablet devices
- **Real-time Statistics**: Live event counts and category breakdowns

### Export Options
- **Quick Export**: One-click export to JSON, CSV, HTML, or PDF
- **Advanced Export**: Customizable reports with configurable options
- **Professional HTML Reports**: Styled timeline reports with metadata
- **PDF Generation**: Print-ready timeline reports
- **Granular Control**: Choose what to include (metadata, descriptions, timestamps, categories)

### Privacy & Security
- **Client-side Processing**: All timeline data processed locally in browser
- **No Server Communication**: Complete privacy with browser-only storage
- **Local Storage**: Optional browser storage with user consent
- **Data Encryption**: Sensitive data encrypted in local storage
- **Clear Data Policies**: Transparent data handling and deletion options

## 🛠️ Technology Stack

- **Frontend**: React 18.3.1 with Vite 6.3.5
- **Styling**: Tailwind CSS 3.4.16 with custom dark theme
- **UI Components**: Shadcn/ui component library
- **Icons**: Lucide React icons
- **File Processing**: Native File API for client-side processing
- **Build Tool**: Vite for fast development and optimized production builds

## 🎨 Design System

### Color Palette
- **Background**: `#111827` (Dark theme)
- **Content Panels**: `#1f2937` (Gray-800)
- **Text**: `#f3f4f6` (Light gray)
- **Primary**: `#1e40af` (Blue-700)
- **Accent**: `#3b82f6` (Blue-500)
- **Borders**: `#374151` (Gray-700)

### Typography
- **Font Family**: Sans-serif stack with Inter preference
- **Monospace**: For technical data and timestamps
- **Responsive**: Scales appropriately across devices

## 📁 Project Structure

```
evidence-timeline-builder/
├── src/
│   ├── components/
│   │   ├── ui/                 # Shadcn/ui components
│   │   ├── TimelineControls.jsx # Enhanced timeline controls
│   │   ├── EnhancedTimeline.jsx # Professional timeline component
│   │   └── ExportPanel.jsx     # Advanced export functionality
│   ├── lib/
│   │   └── fileProcessors.js   # File processing utilities
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Custom styles and theme
│   └── main.jsx               # Application entry point
├── public/                     # Static assets
├── dist/                      # Production build output
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd evidence-timeline-builder
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
# Build the application
pnpm run build

# Preview the production build
pnpm run preview
```

### Deployment to GitHub Pages

```bash
# Deploy to GitHub Pages
pnpm run deploy
```

## 📖 Usage Guide

### Importing Evidence Files

1. **Supported Formats**:
   - CSV files with timestamp columns
   - JSON files with event arrays
   - Image files (EXIF timestamp extraction)
   - Log files with timestamp patterns
   - Email files (PST format support planned)

2. **File Upload**:
   - Drag and drop files onto the upload area
   - Click to browse and select files
   - Multiple files can be processed simultaneously

### Timeline Navigation

1. **Zoom Controls**: Use the zoom slider to adjust timeline scale
2. **Category Filtering**: Filter events by category with live counts
3. **Time Range**: Select specific time periods (Today, This Week, etc.)
4. **Event Selection**: Click events to view detailed information
5. **Drag & Drop**: Reposition events by dragging them on the timeline

### Export Options

1. **Quick Export**: 
   - JSON: Raw data export
   - CSV: Spreadsheet-compatible format
   - HTML: Professional timeline report
   - PDF: Print-ready document

2. **Advanced Export**:
   - Custom report titles and descriptions
   - Granular control over included data
   - Professional styling options

## 🔧 Configuration

### Environment Variables
No environment variables required - the application runs entirely client-side.

### Customization
- Modify `src/App.css` for theme customization
- Update color palette in CSS custom properties
- Extend file processors in `src/lib/fileProcessors.js`

## 🛡️ Privacy & Security

### Data Handling
- **No External Servers**: All processing happens in your browser
- **Local Storage Only**: Data never leaves your device
- **Optional Persistence**: Choose whether to save data locally
- **Clear Deletion**: Easy data removal options

### Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **ES6+ Features**: Modern JavaScript with appropriate polyfills
- **File API**: Extensive use of File API for local file processing
- **Canvas API**: For image and visualization processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/ui**: For the excellent component library
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon set
- **Vite**: For the fast build tool
- **React**: For the powerful UI framework

## 📞 Support

For support, questions, or feature requests:
- Open an issue on GitHub
- Check the documentation
- Review existing issues for solutions

---

**Built with ❤️ for digital forensics and evidence analysis professionals**

