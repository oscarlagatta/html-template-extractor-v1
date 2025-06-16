"use client"

import { useNewsletterStore } from "@/lib/store"
import { EditableText } from "./editable-text"
import { EditableImage } from "./editable-image"
import { ContentBlock } from "./content-block"
import { UsefulResourcesSidebar } from "./useful-resources-sidebar"

export function NewsletterPreview() {
  const { newsletter } = useNewsletterStore()

  return (
    <div className="mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="bg-[#002060] text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <EditableText
              id="header-title"
              defaultValue={newsletter.header.title}
              className="text-xl font-light text-white"
              placeholder="Department Name"
            />
          </div>
          <div>
            <EditableImage
              id="header-logo"
              defaultSrc={newsletter.header.logoUrl}
              className="h-16 w-auto"
              aspectRatio="16:9"
            />
          </div>
        </div>
      </div>

      {/* Newsletter Title Bar */}
      <div className="bg-gray-100 p-4 border-b">
        <EditableText
          id="newsletter-title"
          defaultValue={newsletter.title}
          className="text-lg font-bold text-[#002060]"
          placeholder="MONTHLY SERVICE NEWSLETTER - Month Year"
        />
      </div>

      <div className="flex">
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {/* Hero Section */}
          <div className="mb-8 p-6 border rounded-lg">
            <div className="flex gap-6">
              <div className="w-20 h-20 flex-shrink-0">
                <EditableImage
                  id="hero-icon"
                  defaultSrc={newsletter.hero.iconUrl}
                  className="w-full h-full object-cover rounded"
                  aspectRatio="1:1"
                />
              </div>
              <div className="flex-1">
                <EditableText
                  id="hero-title"
                  defaultValue={newsletter.hero.title}
                  className="text-2xl font-bold mb-2"
                  placeholder="Main Article Title"
                />
                <EditableText
                  id="hero-content"
                  defaultValue={newsletter.hero.content}
                  className="text-sm leading-relaxed"
                  placeholder="Main article content goes here..."
                  multiline
                />
              </div>
            </div>
          </div>

          {/* Content Blocks */}
          {newsletter.contentBlocks.map((block, index) => (
            <ContentBlock key={block.id} block={block} index={index} />
          ))}
        </div>

        {/* Useful Resources Sidebar */}
        <UsefulResourcesSidebar />
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
        <EditableText
          id="footer-text"
          defaultValue={newsletter.footer.text}
          className="text-sm text-gray-600"
          placeholder="Month Year | Department Name"
        />
      </div>
    </div>
  )
}
