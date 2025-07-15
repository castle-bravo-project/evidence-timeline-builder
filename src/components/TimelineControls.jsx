import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Slider } from '@/components/ui/slider.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx'
import { ConfirmationDialog } from '@/components/ui/dialog.jsx'
import {
  ZoomIn,
  ZoomOut,
  Filter,
  Calendar,
  Clock,
  RotateCcw,
  Settings,
  Eye,
  EyeOff,
  Link,
  Unlink,
  Trash2
} from 'lucide-react'

const TimelineControls = ({
  zoomLevel,
  onZoomChange,
  filter,
  onFilterChange,
  events,
  onResetView,
  showConnections,
  onToggleConnections,
  timeRange,
  onTimeRangeChange,
  onClearData
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  
  const categoryStats = {
    all: events.length,
    communication: events.filter(e => e.category === 'communication').length,
    document: events.filter(e => e.category === 'document').length,
    system: events.filter(e => e.category === 'system').length,
    media: events.filter(e => e.category === 'media').length,
    other: events.filter(e => e.category === 'other').length
  }

  const timeRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ]

  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-card border border-border rounded-lg">
      {/* Zoom Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onZoomChange(Math.max(0.1, zoomLevel - 0.1))}
          disabled={zoomLevel <= 0.1}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center gap-2 min-w-32">
          <Slider
            value={[zoomLevel]}
            onValueChange={([value]) => onZoomChange(value)}
            min={0.1}
            max={5}
            step={0.1}
            className="flex-1"
          />
          <span className="text-sm font-mono min-w-12">
            {Math.round(zoomLevel * 100)}%
          </span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onZoomChange(Math.min(5, zoomLevel + 0.1))}
          disabled={zoomLevel >= 5}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>

      {/* Category Filter */}
      <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            {filter === 'all' ? 'All Categories' : filter}
            <Badge variant="secondary" className="ml-1">
              {categoryStats[filter]}
            </Badge>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Filter by Category</h4>
            {Object.entries(categoryStats).map(([category, count]) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "ghost"}
                size="sm"
                className="w-full justify-between"
                onClick={() => {
                  onFilterChange(category)
                  setIsFilterOpen(false)
                }}
              >
                <span className="capitalize">{category}</span>
                <Badge variant="outline">{count}</Badge>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Time Range Filter */}
      <select
        value={timeRange}
        onChange={(e) => onTimeRangeChange(e.target.value)}
        className="bg-background border border-border rounded px-3 py-1 text-sm"
      >
        {timeRangeOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* View Options */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleConnections}
          className="gap-2"
        >
          {showConnections ? <Unlink className="w-4 h-4" /> : <Link className="w-4 h-4" />}
          {showConnections ? 'Hide' : 'Show'} Links
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onResetView}
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset View
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowClearConfirm(true)}
          className="gap-2 text-destructive hover:text-destructive"
          disabled={events.length === 0}
        >
          <Trash2 className="w-4 h-4" />
          Clear Data
        </Button>
      </div>

      {/* Timeline Info */}
      <div className="flex items-center gap-4 ml-auto text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{events.length} events</span>
        </div>
        {events.length > 0 && (
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>
              {new Date(Math.min(...events.map(e => e.timestamp))).toLocaleDateString()} - 
              {new Date(Math.max(...events.map(e => e.timestamp))).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Clear Data Confirmation Dialog */}
      <ConfirmationDialog
        open={showClearConfirm}
        onOpenChange={setShowClearConfirm}
        title="Clear All Data"
        description={`Are you sure you want to clear all ${events.length} events from the timeline? This action cannot be undone.`}
        onConfirm={onClearData}
        confirmText="Clear All Data"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  )
}

export default TimelineControls

