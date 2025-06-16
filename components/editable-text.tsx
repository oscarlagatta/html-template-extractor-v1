"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useNewsletterStore } from "@/lib/store"
import { cn, stripFormatting } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Bold, Italic, Link, List } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface EditableTextProps {
  id: string
  defaultValue: string
  className?: string
  placeholder?: string
  multiline?: boolean
  maxLength?: number
}

export function EditableText({
  id,
  defaultValue,
  className,
  placeholder,
  multiline = false,
  maxLength = 1000,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const [showWarning, setShowWarning] = useState(false)
  const { updateContent, addToHistory } = useNewsletterStore()
  const textRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null)

  useEffect(() => {
    if (value.length > maxLength * 0.9) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
    }
  }, [value, maxLength])

  const handleSave = () => {
    // Strip external formatting and apply theme tokens
    const cleanedValue = stripFormatting(value).trim()
    const truncatedValue = cleanedValue.slice(0, maxLength)

    setValue(truncatedValue)
    updateContent(id, truncatedValue)
    addToHistory()
    setIsEditing(false)
  }

  const handleCancel = () => {
    setValue(defaultValue)
    setIsEditing(false)
    setShowWarning(false)
  }

  const applyFormatting = (format: string) => {
    if (!textRef.current) return

    const start = textRef.current.selectionStart || 0
    const end = textRef.current.selectionEnd || 0
    const selectedText = value.substring(start, end)

    let formattedText = selectedText
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `*${selectedText}*`
        break
      case "link":
        formattedText = `[${selectedText}](url)`
        break
      case "list":
        formattedText = `• ${selectedText}`
        break
    }

    const newValue = value.substring(0, start) + formattedText + value.substring(end)
    setValue(newValue)
  }

  if (isEditing) {
    return (
      <div className="space-y-2">
        {multiline && (
          <div className="flex gap-1 mb-2">
            <Button size="sm" variant="outline" className="text-muted-foreground" onClick={() => applyFormatting("bold")} >
              <Bold className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" className="text-muted-foreground" onClick={() => applyFormatting("italic")}>
              <Italic className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" className="text-muted-foreground" onClick={() => applyFormatting("link")}>
              <Link className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" className="text-muted-foreground" onClick={() => applyFormatting("list")}>
              <List className="w-3 h-3" />
            </Button>
          </div>
        )}

        {multiline ? (
          <Textarea
            ref={textRef as React.RefObject<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={cn("min-h-[100px] resize-none", className)}
            placeholder={placeholder}
            maxLength={maxLength}
          />
        ) : (
          <Input
            ref={textRef as React.RefObject<HTMLInputElement>}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={className}
            placeholder={placeholder}
            maxLength={maxLength}
            style={{color: '#54618a'}}

          />
        )}

        {showWarning && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertDescription className="text-yellow-800">
              Warning: Text is approaching maximum length ({value.length}/{maxLength})
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button size="sm" onClick={handleSave}>
            Save
          </Button>
          <Button size="sm" variant="outline" className="text-muted-foreground" onClick={handleCancel}>
            Cancel
          </Button>
        </div>

        <div className="text-xs text-gray-500">
          {value.length}/{maxLength} characters
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "cursor-pointer p-1 rounded border-2 border-transparent hover:border-blue-200 transition-colors",
        className,
      )}
      onClick={() => setIsEditing(true)}
      title="Click to edit"
    >
      {value || <span className="text-gray-400">{placeholder}</span>}
    </div>
  )
}
