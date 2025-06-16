"use client"

import { useNewsletterStore } from "@/lib/store"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"

export function ContentValidation() {
  const { newsletter } = useNewsletterStore()

  const validationIssues = []
  const warnings = []
  const info = []

  // Check for missing content
  if (!newsletter.header.title.trim()) {
    validationIssues.push("Header title is required")
  }

  if (!newsletter.title.trim()) {
    validationIssues.push("Newsletter title is required")
  }

  if (!newsletter.hero.title.trim()) {
    validationIssues.push("Hero title is required")
  }

  if (!newsletter.hero.content.trim()) {
    validationIssues.push("Hero content is required")
  }

  // Check for content length warnings
  if (newsletter.hero.content.length > 800) {
    warnings.push("Hero content is quite long - consider shortening for better readability")
  }

  newsletter.contentBlocks.forEach((block, index) => {
    if (!block.title.trim()) {
      validationIssues.push(`Content block ${index + 1} is missing a title`)
    }
    if (!block.content.trim()) {
      validationIssues.push(`Content block ${index + 1} is missing content`)
    }
    if (block.content.length > 1500) {
      warnings.push(`Content block "${block.title}" is quite long`)
    }
  })

  // Check for missing images
  const blocksWithoutImages = newsletter.contentBlocks.filter((block) => !block.imageUrl)
  if (blocksWithoutImages.length > 0) {
    info.push(`${blocksWithoutImages.length} content blocks don't have images`)
  }

  // Check resources
  if (newsletter.resources.length === 0) {
    warnings.push("No useful resources added")
  }

  newsletter.resources.forEach((resource, index) => {
    if (!resource.title.trim()) {
      validationIssues.push(`Resource ${index + 1} is missing a title`)
    }
    if (!resource.url.trim() || !resource.url.startsWith("http")) {
      validationIssues.push(`Resource "${resource.title}" has an invalid URL`)
    }
  })

  if (validationIssues.length === 0 && warnings.length === 0 && info.length === 0) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Newsletter content is valid and ready for export!
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-3">
      {validationIssues.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="font-medium mb-2">Issues found:</div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {validationIssues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {warnings.length > 0 && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <div className="font-medium mb-2">Warnings:</div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {info.length > 0 && (
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <div className="font-medium mb-2">Information:</div>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {info.map((infoItem, index) => (
                <li key={index}>{infoItem}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
