"use client"

import { useState } from "react"
import { NewsletterPreview } from "./newsletter-preview"
import { EditorSidebar } from "./editor-sidebar"
import { ExportPanel } from "./export-panel"
import { useNewsletterStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Download } from "lucide-react"
import { NewsletterPreviewMode } from "./newsletter-preview-mode"
import { PreviewControls } from "./preview-controls"
import { LivePreviewIndicator } from "./live-preview-indicator"

export function NewsletterEditor() {
  const [showPreview, setShowPreview] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const { isDarkMode, toggleDarkMode } = useNewsletterStore()

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="flex h-screen bg-background">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Newsletter Template Generator</h1>
            <LivePreviewIndicator />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggleDarkMode} className='text-muted-foreground'>
              {isDarkMode ? "☀️" : "🌙"}
            </Button>
            <PreviewControls showPreview={showPreview} onTogglePreview={setShowPreview} />
            <Sheet open={showExport} onOpenChange={setShowExport}>
              <SheetTrigger asChild>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </SheetTrigger>
              <SheetContent>
                <ExportPanel />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 pt-16">
          {/* Editor Sidebar */}
          <div className="w-80 border-r bg-card overflow-y-auto">
            <EditorSidebar />
          </div>

          {/* Newsletter Preview/Edit Area */}
          <div className="flex-1 overflow-y-auto">
            {showPreview ? <NewsletterPreviewMode /> : <NewsletterPreview />}
          </div>
        </div>
      </div>
    </div>
  )
}
