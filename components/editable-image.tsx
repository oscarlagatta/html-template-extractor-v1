"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useNewsletterStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, LinkIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface EditableImageProps {
  id: string
  defaultSrc: string
  className?: string
  aspectRatio?: string
}

export function EditableImage({ id, defaultSrc, className, aspectRatio = "16:9" }: EditableImageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [imageSrc, setImageSrc] = useState(defaultSrc)
  const [urlInput, setUrlInput] = useState("")
  const [error, setError] = useState("")
  const { updateContent, addToHistory } = useNewsletterStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setImageSrc(result)
      updateContent(id, result)
      addToHistory()
      setIsEditing(false)
      setError("")
    }
    reader.readAsDataURL(file)
  }

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      setError("Please enter a valid URL")
      return
    }

    // Basic URL validation
    try {
      new URL(urlInput)
      setImageSrc(urlInput)
      updateContent(id, urlInput)
      addToHistory()
      setIsEditing(false)
      setUrlInput("")
      setError("")
    } catch {
      setError("Please enter a valid URL")
    }
  }

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "1:1":
        return "aspect-square"
      case "4:3":
        return "aspect-[4/3]"
      case "16:9":
        return "aspect-video"
      default:
        return "aspect-video"
    }
  }

  if (isEditing) {
    return (
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
        <div className="space-y-2">
          <Button onClick={() => fileInputRef.current?.click()} className="w-full text-muted-foreground" variant="outline"  >
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
        </div>

        <div className="text-center text-sm text-gray-500">or</div>

        <div className="space-y-2">
          <Input placeholder="Enter image URL" value={urlInput} onChange={(e) => setUrlInput(e.target.value)}  className="text-muted-foreground" />
          <Button onClick={handleUrlSubmit} className="w-full text-muted-foreground" variant="outline">
            <LinkIcon className="w-4 h-4 mr-2" />
            Use URL
          </Button>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={() => {
            setIsEditing(false)
            setError("")
            setUrlInput("")
          }}
          variant="ghost"
          className="w-full text-muted-foreground"
        >
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "cursor-pointer hover:opacity-80 transition-opacity border-2 border-transparent hover:border-blue-200 rounded",
        getAspectRatioClass(),
        className,
      )}
      onClick={() => setIsEditing(true)}
      title="Click to change image"
    >
      {imageSrc ? (
        <img
          src={imageSrc || "/placeholder.svg"}
          alt="Newsletter image"
          className="w-full h-full object-cover rounded"
          crossOrigin="anonymous"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
          <Upload className="w-8 h-8 text-gray-400" />
        </div>
      )}
    </div>
  )
}
