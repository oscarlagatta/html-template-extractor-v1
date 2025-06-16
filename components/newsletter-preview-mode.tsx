"use client"

import { useNewsletterStore } from "@/lib/store"
import { formatMarkdown } from "@/lib/utils"

export function NewsletterPreviewMode() {
  const { newsletter } = useNewsletterStore()

  return (
    <div className="mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="bg-[#002060] text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-light text-white">{newsletter.header.title}</h1>
          </div>
          <div>
            {newsletter.header.logoUrl && (
              <img
                src={newsletter.header.logoUrl || "/placeholder.svg"}
                alt="Company Logo"
                className="h-16 w-auto"
                crossOrigin="anonymous"
              />
            )}
          </div>
        </div>
      </div>

      {/* Newsletter Title Bar */}
      <div className="bg-gray-100 p-4 border-b">
        <h2 className="text-lg font-bold text-[#002060]">{newsletter.title}</h2>
      </div>

      <div className="flex">
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {/* Hero Section */}
          <div className="mb-8 p-6 border rounded-lg">
            <div className="flex gap-6">
              <div className="w-20 h-20 flex-shrink-0">
                {newsletter.hero.iconUrl && (
                  <img
                    src={newsletter.hero.iconUrl || "/placeholder.svg"}
                    alt="Hero Icon"
                    className="w-full h-full object-cover rounded"
                    crossOrigin="anonymous"
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{newsletter.hero.title}</h3>
                <div
                  className="text-sm leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdown(newsletter.hero.content),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Content Blocks */}
          {newsletter.contentBlocks.map((block) => (
            <div key={block.id} className="mb-8 p-6 border rounded-lg">
              {/* Block Header */}
              <div className="bg-[#002060] text-white p-3 mb-4 rounded">
                <h4 className="text-lg font-semibold text-white uppercase tracking-wide">{block.title}</h4>
              </div>

              {/* Block Content */}
              <div className="flex gap-6">
                <div className="flex-1">
                  <div
                    className="text-sm leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: formatMarkdown(block.content),
                    }}
                  />
                </div>

                {block.imageUrl && (
                  <div className="w-64 flex-shrink-0">
                    <img
                      src={block.imageUrl || "/placeholder.svg"}
                      alt={block.title}
                      className="w-full aspect-video object-cover rounded"
                      crossOrigin="anonymous"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Useful Resources Sidebar */}
        <div className="w-80 bg-gray-100 p-6 border-l">
          <h3 className="text-lg font-bold mb-4">Useful Resources</h3>
          <div className="space-y-4">
            {newsletter.resources.map((resource) => (
              <div key={resource.id}>
                <h5 className="font-bold text-blue-600 mb-1">
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    {resource.title}
                  </a>
                </h5>
                <div
                  className="text-sm text-gray-600 mb-2 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdown(resource.description),
                  }}
                />
                <div className="text-xs text-blue-500 underline">{resource.url}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">{newsletter.footer.text}</div>
    </div>
  )
}
