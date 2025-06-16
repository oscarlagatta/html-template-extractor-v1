"use client"

import { useNewsletterStore } from "@/lib/store"
import { EditableText } from "./editable-text"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

export function UsefulResourcesSidebar() {
  const { newsletter, addResource, removeResource } = useNewsletterStore()

  return (
    <div className="w-80 bg-gray-100 p-6 border-l">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">Useful Resources</h3>
        <Button size="sm" onClick={addResource} variant="outline">
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      <div className="space-y-4">
        {newsletter.resources.map((resource, index) => (
          <div key={resource.id} className="group relative">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100"
              onClick={() => removeResource(resource.id)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>

            <EditableText
              id={`resource-${resource.id}-title`}
              defaultValue={resource.title}
              className="font-bold text-blue-600 mb-1"
              placeholder="Resource Title"
            />

            <EditableText
              id={`resource-${resource.id}-description`}
              defaultValue={resource.description}
              className="text-sm text-gray-600 mb-2"
              placeholder="Resource description..."
              multiline
              maxLength={200}
            />

            <EditableText
              id={`resource-${resource.id}-url`}
              defaultValue={resource.url}
              className="text-xs text-blue-500 underline"
              placeholder="https://example.com"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
