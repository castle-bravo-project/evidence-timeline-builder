import { useState, useEffect } from 'react'
import { Button } from './button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from './card.jsx'

export const Dialog = ({ open, onOpenChange, children }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog content */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {children}
      </div>
    </div>
  )
}

export const DialogContent = ({ children, className = "" }) => {
  return (
    <Card className={`bg-background border shadow-lg ${className}`}>
      {children}
    </Card>
  )
}

export const DialogHeader = ({ children }) => {
  return <CardHeader>{children}</CardHeader>
}

export const DialogTitle = ({ children }) => {
  return <CardTitle>{children}</CardTitle>
}

export const DialogDescription = ({ children }) => {
  return <p className="text-sm text-muted-foreground">{children}</p>
}

export const DialogFooter = ({ children }) => {
  return (
    <CardContent className="flex justify-end gap-2 pt-0">
      {children}
    </CardContent>
  )
}

// Confirmation Dialog Component
export const ConfirmationDialog = ({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  onConfirm, 
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "destructive"
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </Button>
          <Button 
            variant={variant}
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
