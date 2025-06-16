"use client"

import { useNewsletterStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Plus, Undo, Redo, FileText, ImageIcon, BarChart3 } from "lucide-react"
import { useState } from "react"
import { ContentValidation } from "./content-validation"

export function EditorSidebar() {
  const { addContentBlock, undo, redo, canUndo, canRedo, newsletter } = useNewsletterStore()

  const [newBlockTitle, setNewBlockTitle] = useState("")

  const handleAddBlock = () => {
    if (newBlockTitle.trim()) {
      addContentBlock({
        title: newBlockTitle,
        content: "Enter your content here...",
        imageUrl: "/placeholder.svg?height=200&width=400&text=Section+Image",
      })
      setNewBlockTitle("")
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* History Controls */}
      <div>
        <Label className="text-sm font-medium mb-2 block">History</Label>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={undo} disabled={!canUndo} className="text-muted-foreground">
            <Undo className="w-3 h-3 mr-1" />
            Undo
          </Button>
          <Button size="sm" variant="outline" onClick={redo} disabled={!canRedo} className="text-muted-foreground">
            <Redo className="w-3 h-3 mr-1" />
            Redo
          </Button>
        </div>
      </div>

      <Separator />

      {/* Add Content Block */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Add Content Block</Label>
        <div className="space-y-2">
          <Input
            placeholder="Section title..."
            value={newBlockTitle}
            onChange={(e) => setNewBlockTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddBlock()}
            className="text-muted-foreground"
          />
          <Button onClick={handleAddBlock} disabled={!newBlockTitle.trim()} className="w-full" size="sm">
            <Plus className="w-3 h-3 mr-1" />
            Add Section
          </Button>
        </div>
      </div>

      <Separator />

      {/* Quick Templates */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Quick Add</Label>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() =>
              addContentBlock({
                title: "Text Section",
                content: "Add your text content here...",
                imageUrl: "",
              })
            }
          >
            <FileText className="w-3 h-3 mr-2" />
            Text Only
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() =>
              addContentBlock({
                title: "Image Section",
                content: "Add your content with an image...",
                imageUrl: "/placeholder.svg?height=200&width=400&text=Section+Image",
              })
            }
          >
            <ImageIcon className="w-3 h-3 mr-2" />
            Text + Image
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() =>
              addContentBlock({
                title: "Metrics Section",
                content: "Add metrics and data visualization content...",
                imageUrl: "/placeholder.svg?height=300&width=500&text=Chart+or+Graph",
              })
            }
          >
            <BarChart3 className="w-3 h-3 mr-2" />
            Metrics
          </Button>
        </div>
      </div>

      <Separator />

      {/* Newsletter Stats */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Newsletter Stats</Label>
        <div className="text-xs text-gray-600 space-y-1">
          <div>Sections: {newsletter.contentBlocks.length}</div>
          <div>Resources: {newsletter.resources.length}</div>
          <div>
            Word Count:{" "}
            {(newsletter.hero.content + newsletter.contentBlocks.map((b) => b.content).join(" ")).split(" ").length}
          </div>
        </div>
      </div>

      <Separator />

      {/* Content Validation */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Content Validation</Label>
        <ContentValidation />
      </div>
    </div>
  )
}
