"use client"

import { useState, useEffect } from "react"
import { useNewsletterStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, RefreshCw, Smartphone, Monitor, Tablet } from "lucide-react"

interface PreviewControlsProps {
  showPreview: boolean
  onTogglePreview: (show: boolean) => void
}

export function PreviewControls({ showPreview, onTogglePreview }: PreviewControlsProps) {
  const { newsletter } = useNewsletterStore()
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")

  // Update timestamp when newsletter content changes
  useEffect(() => {
    setLastUpdated(new Date())
  }, [newsletter])

  const getViewModeIcon = () => {
    switch (viewMode) {
      case "mobile":
        return <Smartphone className="w-4 h-4" />
      case "tablet":
        return <Tablet className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  const getViewModeClass = () => {
    switch (viewMode) {
      case "mobile":
        return "max-w-sm"
      case "tablet":
        return "max-w-2xl"
      default:
        return "max-w-6xl"
    }
  }

  return (
    <div className="flex items-center gap-4">
      {/* Preview Toggle */}
      <div className="flex items-center gap-2">
        <Button variant={showPreview ? "default" : "outline"} size="sm" onClick={() => onTogglePreview(!showPreview)}>
          {showPreview ? (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Edit Mode
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Preview Mode
            </>
          )}
        </Button>

        {showPreview && (
          <Badge variant="secondary" className="text-xs">
            <RefreshCw className="w-3 h-3 mr-1" />
            Updated {lastUpdated.toLocaleTimeString()}
          </Badge>
        )}
      </div>

      {/* Responsive Preview Controls */}
      {showPreview && (
        <div className="flex items-center gap-1 border rounded-md p-1">
          {(["desktop", "tablet", "mobile"] as const).map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode(mode)}
              className="h-8 w-8 p-0"
            >
              {mode === "desktop" && <Monitor className="w-4 h-4" />}
              {mode === "tablet" && <Tablet className="w-4 h-4" />}
              {mode === "mobile" && <Smartphone className="w-4 h-4" />}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
