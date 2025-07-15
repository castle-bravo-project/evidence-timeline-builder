import { useState, useRef, useCallback, useEffect } from 'react'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { 
  Mail, 
  FileText, 
  Image, 
  Settings, 
  Clock,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react'

const EnhancedTimeline = ({ 
  events, 
  zoomLevel, 
  onEventSelect, 
  selectedEvent, 
  onEventDrop,
  showConnections = false,
  timeRange = 'all'
}) => {
  const timelineRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedEvent, setDraggedEvent] = useState(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Filter events based on time range
  const filteredEvents = events.filter(event => {
    if (timeRange === 'all') return true
    
    const eventDate = new Date(event.timestamp)
    const now = new Date()
    
    switch (timeRange) {
      case 'today':
        return eventDate.toDateString() === now.toDateString()
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return eventDate >= weekAgo
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        return eventDate >= monthAgo
      case 'year':
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        return eventDate >= yearAgo
      default:
        return true
    }
  })

  const getTimelineWidth = () => {
    if (filteredEvents.length === 0) return 1000
    const minDate = Math.min(...filteredEvents.map(e => e.timestamp))
    const maxDate = Math.max(...filteredEvents.map(e => e.timestamp))
    const timeSpan = maxDate - minDate
    return Math.max(1000, (timeSpan / (1000 * 60 * 60 * 24)) * zoomLevel * 100)
  }

  const getEventPosition = (timestamp) => {
    if (filteredEvents.length === 0) return 0
    const minDate = Math.min(...filteredEvents.map(e => e.timestamp))
    const maxDate = Math.max(...filteredEvents.map(e => e.timestamp))
    const timeSpan = maxDate - minDate
    if (timeSpan === 0) return 0
    const position = ((timestamp - minDate) / timeSpan) * getTimelineWidth()
    return Math.max(0, position)
  }

  const getEventIcon = (category) => {
    switch (category) {
      case 'communication': return <Mail className="w-4 h-4" />
      case 'document': return <FileText className="w-4 h-4" />
      case 'system': return <Settings className="w-4 h-4" />
      case 'media': return <Image className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const handleDragStart = (e, event) => {
    setIsDragging(true)
    setDraggedEvent(event)
    e.dataTransfer.setData('text/plain', event.id)
    e.currentTarget.style.opacity = '0.5'
  }

  const handleDragEnd = (e) => {
    setIsDragging(false)
    setDraggedEvent(null)
    e.currentTarget.style.opacity = '1'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    if (timelineRef.current) {
      timelineRef.current.classList.add('drag-over')
    }
  }

  const handleDragLeave = (e) => {
    if (timelineRef.current && !timelineRef.current.contains(e.relatedTarget)) {
      timelineRef.current.classList.remove('drag-over')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (timelineRef.current) {
      timelineRef.current.classList.remove('drag-over')
    }
    
    if (draggedEvent) {
      const rect = timelineRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - scrollPosition
      const timelineWidth = getTimelineWidth()
      const minDate = Math.min(...filteredEvents.map(e => e.timestamp))
      const maxDate = Math.max(...filteredEvents.map(e => e.timestamp))
      const timeSpan = maxDate - minDate
      const newTimestamp = (x / timelineWidth) * timeSpan + minDate
      
      onEventDrop && onEventDrop(draggedEvent.id, newTimestamp)
    }
  }

  const scrollTimeline = (direction) => {
    const container = timelineRef.current?.parentElement
    if (container) {
      const scrollAmount = 200
      const newScrollLeft = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
    }
  }

  const generateTimeScale = () => {
    if (filteredEvents.length === 0) return []
    
    const minDate = Math.min(...filteredEvents.map(e => e.timestamp))
    const maxDate = Math.max(...filteredEvents.map(e => e.timestamp))
    const timeSpan = maxDate - minDate
    const timelineWidth = getTimelineWidth()
    
    const scales = []
    const numTicks = Math.min(10, Math.max(3, Math.floor(timelineWidth / 150)))
    
    for (let i = 0; i <= numTicks; i++) {
      const timestamp = minDate + (timeSpan * i / numTicks)
      const position = (i / numTicks) * timelineWidth
      scales.push({
        position,
        timestamp,
        label: new Date(timestamp).toLocaleDateString()
      })
    }
    
    return scales
  }

  const findConnectedEvents = (event) => {
    // Simple connection logic based on similar metadata or time proximity
    return filteredEvents.filter(e => {
      if (e.id === event.id) return false
      
      // Check for similar metadata
      if (event.metadata && e.metadata) {
        const eventKeys = Object.keys(event.metadata)
        const eKeys = Object.keys(e.metadata)
        const commonKeys = eventKeys.filter(key => eKeys.includes(key))
        
        if (commonKeys.length > 0) {
          return commonKeys.some(key => event.metadata[key] === e.metadata[key])
        }
      }
      
      // Check for time proximity (within 1 hour)
      const timeDiff = Math.abs(event.timestamp - e.timestamp)
      return timeDiff < 60 * 60 * 1000
    })
  }

  return (
    <div className={`timeline-container ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      {/* Timeline Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scrollTimeline('left')}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scrollTimeline('right')}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </Button>
      </div>

      {/* Timeline Container */}
      <div className="timeline-grid relative bg-card border border-border rounded-lg overflow-hidden">
        {/* Time Scale */}
        <div className="timeline-scale border-b border-border p-4 bg-muted/50">
          <div className="relative" style={{ width: `${getTimelineWidth()}px`, height: '40px' }}>
            {generateTimeScale().map((tick, index) => (
              <div
                key={index}
                className="absolute flex flex-col items-center"
                style={{ left: `${tick.position}px` }}
              >
                <div className="w-px h-4 bg-border"></div>
                <span className="text-xs text-muted-foreground mt-1">
                  {tick.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Events */}
        <div 
          ref={timelineRef}
          className="relative p-4 overflow-x-auto"
          style={{ minHeight: '400px' }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
        >
          <div className="relative" style={{ width: `${getTimelineWidth()}px`, minHeight: '350px' }}>
            {/* Connection Lines */}
            {showConnections && selectedEvent && (
              <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                {findConnectedEvents(selectedEvent).map((connectedEvent, index) => {
                  const startX = getEventPosition(selectedEvent.timestamp) + 64
                  const startY = 100
                  const endX = getEventPosition(connectedEvent.timestamp) + 64
                  const endY = 100
                  
                  return (
                    <line
                      key={index}
                      x1={startX}
                      y1={startY}
                      x2={endX}
                      y2={endY}
                      stroke="rgb(59 130 246)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      opacity="0.6"
                    />
                  )
                })}
              </svg>
            )}

            {/* Events */}
            {filteredEvents.map((event, index) => {
              const isSelected = selectedEvent?.id === event.id
              const isConnected = showConnections && selectedEvent && 
                findConnectedEvents(selectedEvent).some(e => e.id === event.id)
              
              return (
                <div
                  key={event.id}
                  className={`timeline-event absolute p-3 min-w-40 max-w-56 cursor-pointer 
                    category-${event.category} transition-all duration-300 transform hover:scale-105
                    ${isSelected ? 'selected ring-2 ring-accent shadow-lg' : ''}
                    ${isConnected ? 'ring-2 ring-blue-400 shadow-md' : ''}
                    ${isDragging && draggedEvent?.id === event.id ? 'opacity-50 scale-95' : ''}
                  `}
                  style={{
                    left: `${getEventPosition(event.timestamp)}px`,
                    top: `${60 + (index % 4) * 80}px`,
                    zIndex: isSelected ? 10 : 2
                  }}
                  onClick={() => onEventSelect(event)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, event)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {getEventIcon(event.category)}
                    <Badge variant="outline" className="text-xs">
                      {event.category}
                    </Badge>
                  </div>
                  
                  <div className="text-sm font-medium mb-1 line-clamp-2">
                    {event.title}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {new Date(event.timestamp).toLocaleString()}
                  </div>
                  
                  {event.metadata?.priority && (
                    <Badge 
                      variant={event.metadata.priority === 'high' ? 'destructive' : 'secondary'}
                      className="mt-1 text-xs"
                    >
                      {event.metadata.priority}
                    </Badge>
                  )}
                </div>
              )
            })}

            {/* Empty State */}
            {filteredEvents.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No events to display</p>
                  <p className="text-sm">Try adjusting your filters or import some evidence files</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedTimeline

