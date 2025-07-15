import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Input } from '@/components/ui/input.jsx'
import { 
  Download, 
  FileText, 
  Image, 
  Globe,
  Settings,
  Calendar,
  Clock,
  Filter,
  Loader2
} from 'lucide-react'

const ExportPanel = ({ events, selectedEvent, filter, timeRange }) => {
  const [isExporting, setIsExporting] = useState(false)
  const [exportOptions, setExportOptions] = useState({
    includeMetadata: true,
    includeDescriptions: true,
    includeTimestamps: true,
    includeCategories: true,
    dateFormat: 'iso',
    reportTitle: 'Evidence Timeline Report',
    reportDescription: 'Generated timeline analysis of evidence events'
  })

  const filteredEvents = events.filter(event => 
    filter === 'all' || event.category === filter
  )

  const exportData = async (format) => {
    setIsExporting(true)
    
    try {
      let content, mimeType, filename
      
      switch (format) {
        case 'json':
          content = JSON.stringify({
            metadata: {
              title: exportOptions.reportTitle,
              description: exportOptions.reportDescription,
              exportDate: new Date().toISOString(),
              totalEvents: filteredEvents.length,
              filter: filter,
              timeRange: timeRange
            },
            events: filteredEvents.map(event => ({
              id: event.id,
              title: event.title,
              timestamp: event.timestamp,
              category: event.category,
              ...(exportOptions.includeDescriptions && { description: event.description }),
              ...(exportOptions.includeMetadata && { metadata: event.metadata })
            }))
          }, null, 2)
          mimeType = 'application/json'
          filename = 'timeline-export.json'
          break
          
        case 'csv':
          const headers = [
            'ID',
            'Title',
            ...(exportOptions.includeTimestamps ? ['Timestamp', 'Date', 'Time'] : []),
            ...(exportOptions.includeCategories ? ['Category'] : []),
            ...(exportOptions.includeDescriptions ? ['Description'] : []),
            ...(exportOptions.includeMetadata ? ['Metadata'] : [])
          ]
          
          const rows = filteredEvents.map(event => [
            event.id,
            event.title,
            ...(exportOptions.includeTimestamps ? [
              event.timestamp,
              new Date(event.timestamp).toLocaleDateString(),
              new Date(event.timestamp).toLocaleTimeString()
            ] : []),
            ...(exportOptions.includeCategories ? [event.category] : []),
            ...(exportOptions.includeDescriptions ? [event.description || ''] : []),
            ...(exportOptions.includeMetadata ? [JSON.stringify(event.metadata || {})] : [])
          ])
          
          content = [headers, ...rows].map(row => 
            row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
          ).join('\n')
          mimeType = 'text/csv'
          filename = 'timeline-export.csv'
          break
          
        case 'html':
          content = generateHTMLReport(filteredEvents)
          mimeType = 'text/html'
          filename = 'timeline-report.html'
          break
          
        case 'pdf':
          // For PDF, we'll generate HTML and let the user print to PDF
          const htmlContent = generateHTMLReport(filteredEvents)
          const printWindow = window.open('', '_blank')
          printWindow.document.write(htmlContent)
          printWindow.document.close()
          printWindow.print()
          setIsExporting(false)
          return
          
        default:
          throw new Error('Unsupported export format')
      }
      
      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed: ' + error.message)
    } finally {
      setIsExporting(false)
    }
  }

  const generateHTMLReport = (events) => {
    const sortedEvents = [...events].sort((a, b) => a.timestamp - b.timestamp)
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${exportOptions.reportTitle}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f8f9fa;
        }
        .header {
            background: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        .header h1 {
            color: #1e40af;
            margin: 0 0 10px 0;
            font-size: 2.5em;
        }
        .header p {
            color: #6b7280;
            margin: 0;
            font-size: 1.1em;
        }
        .metadata {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 30px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .metadata-item {
            display: flex;
            flex-direction: column;
        }
        .metadata-label {
            font-weight: 600;
            color: #374151;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .metadata-value {
            color: #1f2937;
            font-size: 1.1em;
            margin-top: 5px;
        }
        .timeline {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .timeline-header {
            background: #1e40af;
            color: white;
            padding: 20px;
            font-size: 1.3em;
            font-weight: 600;
        }
        .event {
            border-bottom: 1px solid #e5e7eb;
            padding: 25px;
            position: relative;
        }
        .event:last-child {
            border-bottom: none;
        }
        .event-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
        }
        .event-title {
            font-size: 1.3em;
            font-weight: 600;
            color: #1f2937;
            margin: 0;
        }
        .event-category {
            background: #3b82f6;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8em;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .event-category.communication { background: #ec4899; }
        .event-category.document { background: #10b981; }
        .event-category.system { background: #f59e0b; }
        .event-category.media { background: #8b5cf6; }
        .event-timestamp {
            color: #6b7280;
            font-size: 1em;
            margin-bottom: 10px;
            font-family: 'Courier New', monospace;
        }
        .event-description {
            color: #4b5563;
            margin-bottom: 15px;
            line-height: 1.6;
        }
        .event-metadata {
            background: #f9fafb;
            border-radius: 6px;
            padding: 15px;
            font-size: 0.9em;
        }
        .metadata-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
        }
        .metadata-pair {
            display: flex;
            flex-direction: column;
        }
        .metadata-key {
            font-weight: 600;
            color: #374151;
            text-transform: capitalize;
        }
        .metadata-val {
            color: #6b7280;
            font-family: 'Courier New', monospace;
            word-break: break-all;
        }
        @media print {
            body { background: white; }
            .header, .metadata, .timeline { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${exportOptions.reportTitle}</h1>
        <p>${exportOptions.reportDescription}</p>
    </div>
    
    <div class="metadata">
        <div class="metadata-item">
            <span class="metadata-label">Total Events</span>
            <span class="metadata-value">${events.length}</span>
        </div>
        <div class="metadata-item">
            <span class="metadata-label">Export Date</span>
            <span class="metadata-value">${new Date().toLocaleString()}</span>
        </div>
        <div class="metadata-item">
            <span class="metadata-label">Filter Applied</span>
            <span class="metadata-value">${filter === 'all' ? 'All Categories' : filter}</span>
        </div>
        <div class="metadata-item">
            <span class="metadata-label">Time Range</span>
            <span class="metadata-value">${timeRange === 'all' ? 'All Time' : timeRange}</span>
        </div>
    </div>
    
    <div class="timeline">
        <div class="timeline-header">
            Timeline Events
        </div>
        ${sortedEvents.map(event => `
            <div class="event">
                <div class="event-header">
                    <h3 class="event-title">${event.title}</h3>
                    <span class="event-category ${event.category}">${event.category}</span>
                </div>
                <div class="event-timestamp">
                    📅 ${new Date(event.timestamp).toLocaleString()}
                </div>
                ${exportOptions.includeDescriptions && event.description ? `
                    <div class="event-description">${event.description}</div>
                ` : ''}
                ${exportOptions.includeMetadata && event.metadata && Object.keys(event.metadata).length > 0 ? `
                    <div class="event-metadata">
                        <div class="metadata-grid">
                            ${Object.entries(event.metadata).map(([key, value]) => `
                                <div class="metadata-pair">
                                    <span class="metadata-key">${key}</span>
                                    <span class="metadata-val">${value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `).join('')}
    </div>
</body>
</html>`
  }

  return (
    <Card className="timeline-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="quick" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quick">Quick Export</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quick" className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportData('json')}
                disabled={isExporting}
                className="gap-2"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                JSON
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportData('csv')}
                disabled={isExporting}
                className="gap-2"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                CSV
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportData('html')}
                disabled={isExporting}
                className="gap-2"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                HTML
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportData('pdf')}
                disabled={isExporting}
                className="gap-2"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                PDF
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center gap-2 mb-1">
                <Filter className="w-4 h-4" />
                <span>Exporting {filteredEvents.length} events</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Filter: {filter === 'all' ? 'All Categories' : filter}</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="reportTitle">Report Title</Label>
                <Input
                  id="reportTitle"
                  value={exportOptions.reportTitle}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, reportTitle: e.target.value }))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="reportDescription">Description</Label>
                <Textarea
                  id="reportDescription"
                  value={exportOptions.reportDescription}
                  onChange={(e) => setExportOptions(prev => ({ ...prev, reportDescription: e.target.value }))}
                  className="mt-1"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Include in Export</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeMetadata"
                      checked={exportOptions.includeMetadata}
                      onCheckedChange={(checked) => setExportOptions(prev => ({ ...prev, includeMetadata: checked }))}
                    />
                    <Label htmlFor="includeMetadata">Metadata</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeDescriptions"
                      checked={exportOptions.includeDescriptions}
                      onCheckedChange={(checked) => setExportOptions(prev => ({ ...prev, includeDescriptions: checked }))}
                    />
                    <Label htmlFor="includeDescriptions">Descriptions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeTimestamps"
                      checked={exportOptions.includeTimestamps}
                      onCheckedChange={(checked) => setExportOptions(prev => ({ ...prev, includeTimestamps: checked }))}
                    />
                    <Label htmlFor="includeTimestamps">Timestamps</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includeCategories"
                      checked={exportOptions.includeCategories}
                      onCheckedChange={(checked) => setExportOptions(prev => ({ ...prev, includeCategories: checked }))}
                    />
                    <Label htmlFor="includeCategories">Categories</Label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportData('json')}
                disabled={isExporting}
                className="gap-2"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                JSON
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportData('csv')}
                disabled={isExporting}
                className="gap-2"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                CSV
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportData('html')}
                disabled={isExporting}
                className="gap-2"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                HTML
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportData('pdf')}
                disabled={isExporting}
                className="gap-2"
              >
                {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                PDF
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default ExportPanel

