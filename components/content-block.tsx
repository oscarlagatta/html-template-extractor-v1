"use client"

import type { ContentBlockType } from "@/lib/types"
import { EditableText } from "./editable-text"
import { EditableImage } from "./editable-image"
import { useNewsletterStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Trash2, MoveUp, MoveDown } from "lucide-react"

interface ContentBlockProps {
  block: ContentBlockType
  index: number
}

export function ContentBlock({ block, index }: ContentBlockProps) {
  const { removeContentBlock, moveContentBlock, newsletter } = useNewsletterStore()

  return (
    <div className="mb-8 p-6 border rounded-lg relative group">
      {/* Block Controls */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <Button size="sm" variant="outline" onClick={() => moveContentBlock(index, index - 1)} disabled={index === 0}>
          <MoveUp className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => moveContentBlock(index, index + 1)}
          disabled={index === newsletter.contentBlocks.length - 1}
        >
          <MoveDown className="w-3 h-3" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => removeContentBlock(block.id)} >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      {/* Block Header */}
      <div className="bg-[#002060] text-muted-foreground p-3 mb-4 rounded">
        <EditableText
          id={`block-${block.id}-title`}
          defaultValue={block.title}
          className="text-lg font-semibold text-white uppercase tracking-wide"
          placeholder="SECTION TITLE"

        />
      </div>

      {/* Block Content */}
      <div className="flex gap-6">
        <div className="flex-1">
          <EditableText
            id={`block-${block.id}-content`}
            defaultValue={block.content}
            className="text-sm leading-relaxed"
            placeholder="Section content goes here..."
            multiline
            maxLength={2000}
          />
        </div>

        {block.imageUrl && (
          <div className="w-64 flex-shrink-0">
            <EditableImage
              id={`block-${block.id}-image`}
              defaultSrc={block.imageUrl}
              className="w-full"
              aspectRatio="16:9"
            />
          </div>
        )}
      </div>
    </div>
  )
}
