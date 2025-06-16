"use client"

import { useEffect, useState } from "react"
import { useNewsletterStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle } from "lucide-react"

export function LivePreviewIndicator() {
  const { newsletter } = useNewsletterStore()
  const [hasChanges, setHasChanges] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date>(new Date())

  useEffect(() => {
    setHasChanges(true)

    // Simulate auto-save after 1 second of no changes
    const timer = setTimeout(() => {
      setHasChanges(false)
      setLastSaved(new Date())
    }, 1000)

    return () => clearTimeout(timer)
  }, [newsletter])

  return (
    <div className="flex items-center gap-2">
      {hasChanges ? (
        <Badge variant="secondary" className="text-xs">
          <AlertCircle className="w-3 h-3 mr-1" />
          Updating...
        </Badge>
      ) : (
        <Badge variant="outline" className="text-xs">
          <CheckCircle className="w-3 h-3 mr-1" />
          Saved {lastSaved.toLocaleTimeString()}
        </Badge>
      )}
    </div>
  )
}
