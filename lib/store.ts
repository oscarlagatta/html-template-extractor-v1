import { create } from "zustand"
import type { NewsletterData, ContentBlockType } from "./types"

interface NewsletterStore {
  newsletter: NewsletterData
  history: NewsletterData[]
  historyIndex: number
  isDarkMode: boolean

  // Actions
  updateContent: (id: string, content: string) => void
  addContentBlock: (block: Omit<ContentBlockType, "id">) => void
  removeContentBlock: (id: string) => void
  moveContentBlock: (fromIndex: number, toIndex: number) => void
  addResource: () => void
  removeResource: (id: string) => void
  addToHistory: () => void
  undo: () => void
  redo: () => void
  toggleDarkMode: () => void
  generateHTML: () => string
  generateXML: () => string

  // Computed
  canUndo: boolean
  canRedo: boolean
}

const initialNewsletter: NewsletterData = {
  header: {
    title: "Banking Production Services & Engineering",
    logoUrl: "/placeholder.svg?height=69&width=263&text=Company+Logo",
  },
  title: "MONTHLY SERVICE NEWSLETTER - June 2024",
  hero: {
    title: "Main Article Title",
    content: "Enter your main article content here. This is the hero section that will grab readers' attention.",
    iconUrl: "/placeholder.svg?height=81&width=84&text=Icon",
  },
  contentBlocks: [
    {
      id: "1",
      title: "Incident Management",
      content: "Add your incident management content here...",
      imageUrl: "/placeholder.svg?height=400&width=600&text=Chart+or+Graph",
    },
  ],
  resources: [
    {
      id: "1",
      title: "24x7 SharePoint",
      description: "View 24x7 shift rotas, documentation and information related to 24x7.",
      url: "https://example.com",
    },
    {
      id: "2",
      title: "myITSM",
      description: "Service management for Service Request, Incident and Problem.",
      url: "https://example.com",
    },
  ],
  footer: {
    text: "June 2024 | Banking Production Services & Engineering",
  },
}

export const useNewsletterStore = create<NewsletterStore>((set, get) => ({
  newsletter: initialNewsletter,
  history: [initialNewsletter],
  historyIndex: 0,
  isDarkMode: false,

  updateContent: (id, content) => {
    set((state) => {
      const newNewsletter = { ...state.newsletter }

      // Update content based on ID pattern
      if (id.startsWith("header-")) {
        const field = id.replace("header-", "")
        newNewsletter.header = { ...newNewsletter.header, [field]: content }
      } else if (id === "newsletter-title") {
        newNewsletter.title = content
      } else if (id.startsWith("hero-")) {
        const field = id.replace("hero-", "")
        newNewsletter.hero = { ...newNewsletter.hero, [field]: content }
      } else if (id.startsWith("block-")) {
        const parts = id.split("-")
        const blockId = parts[1]
        const field = parts[2]
        newNewsletter.contentBlocks = newNewsletter.contentBlocks.map((block) =>
          block.id === blockId ? { ...block, [field]: content } : block,
        )
      } else if (id.startsWith("resource-")) {
        const parts = id.split("-")
        const resourceId = parts[1]
        const field = parts[2]
        newNewsletter.resources = newNewsletter.resources.map((resource) =>
          resource.id === resourceId ? { ...resource, [field]: content } : resource,
        )
      } else if (id === "footer-text") {
        newNewsletter.footer.text = content
      }

      return { newsletter: newNewsletter }
    })
  },

  addContentBlock: (block) => {
    set((state) => ({
      newsletter: {
        ...state.newsletter,
        contentBlocks: [...state.newsletter.contentBlocks, { ...block, id: Date.now().toString() }],
      },
    }))
  },

  removeContentBlock: (id) => {
    set((state) => ({
      newsletter: {
        ...state.newsletter,
        contentBlocks: state.newsletter.contentBlocks.filter((block) => block.id !== id),
      },
    }))
  },

  moveContentBlock: (fromIndex, toIndex) => {
    set((state) => {
      const blocks = [...state.newsletter.contentBlocks]
      const [movedBlock] = blocks.splice(fromIndex, 1)
      blocks.splice(toIndex, 0, movedBlock)

      return {
        newsletter: {
          ...state.newsletter,
          contentBlocks: blocks,
        },
      }
    })
  },

  addResource: () => {
    set((state) => ({
      newsletter: {
        ...state.newsletter,
        resources: [
          ...state.newsletter.resources,
          {
            id: Date.now().toString(),
            title: "New Resource",
            description: "Resource description...",
            url: "https://example.com",
          },
        ],
      },
    }))
  },

  removeResource: (id) => {
    set((state) => ({
      newsletter: {
        ...state.newsletter,
        resources: state.newsletter.resources.filter((resource) => resource.id !== id),
      },
    }))
  },

  addToHistory: () => {
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1)
      newHistory.push(state.newsletter)

      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    })
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1
        return {
          newsletter: state.history[newIndex],
          historyIndex: newIndex,
        }
      }
      return state
    })
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1
        return {
          newsletter: state.history[newIndex],
          historyIndex: newIndex,
        }
      }
      return state
    })
  },

  toggleDarkMode: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }))
  },

  generateHTML: () => {
    const { newsletter } = get()

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${newsletter.title}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
        .header { background-color: #002060; color: white; padding: 20px; }
        .title-bar { background-color: #f2f2f2; padding: 15px; }
        .content { display: flex; max-width: 1200px; margin: 0 auto; }
        .main { flex: 1; padding: 20px; }
        .sidebar { width: 300px; background-color: #f2f2f2; padding: 20px; }
        .section { margin-bottom: 30px; border: 1px solid #ddd; border-radius: 5px; }
        .section-header { background-color: #002060; color: white; padding: 10px; }
        .section-content { padding: 20px; }
        .footer { background-color: #f2f2f2; text-align: center; padding: 15px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${newsletter.header.title}</h1>
    </div>
    
    <div class="title-bar">
        <h2>${newsletter.title}</h2>
    </div>
    
    <div class="content">
        <div class="main">
            <div class="hero">
                <h3>${newsletter.hero.title}</h3>
                <p>${newsletter.hero.content}</p>
            </div>
            
            ${newsletter.contentBlocks
              .map(
                (block) => `
                <div class="section">
                    <div class="section-header">
                        <h4>${block.title}</h4>
                    </div>
                    <div class="section-content">
                        <p>${block.content}</p>
                        ${block.imageUrl ? `<img src="${block.imageUrl}" alt="${block.title}" style="max-width: 100%;">` : ""}
                    </div>
                </div>
            `,
              )
              .join("")}
        </div>
        
        <div class="sidebar">
            <h4>Useful Resources</h4>
            ${newsletter.resources
              .map(
                (resource) => `
                <div style="margin-bottom: 15px;">
                    <h5><a href="${resource.url}">${resource.title}</a></h5>
                    <p style="font-size: 12px; color: #666;">${resource.description}</p>
                </div>
            `,
              )
              .join("")}
        </div>
    </div>
    
    <div class="footer">
        <p>${newsletter.footer.text}</p>
    </div>
</body>
</html>`
  },

  generateXML: () => {
    const { newsletter } = get()

    return `<?xml version="1.0" encoding="UTF-8"?>
<newsletter>
    <header>
        <title>${newsletter.header.title}</title>
        <logo>${newsletter.header.logoUrl}</logo>
    </header>
    
    <title>${newsletter.title}</title>
    
    <hero>
        <title>${newsletter.hero.title}</title>
        <content>${newsletter.hero.content}</content>
        <icon>${newsletter.hero.iconUrl}</icon>
    </hero>
    
    <content-blocks>
        ${newsletter.contentBlocks
          .map(
            (block) => `
        <block id="${block.id}">
            <title>${block.title}</title>
            <content>${block.content}</content>
            ${block.imageUrl ? `<image>${block.imageUrl}</image>` : ""}
        </block>
        `,
          )
          .join("")}
    </content-blocks>
    
    <resources>
        ${newsletter.resources
          .map(
            (resource) => `
        <resource id="${resource.id}">
            <title>${resource.title}</title>
            <description>${resource.description}</description>
            <url>${resource.url}</url>
        </resource>
        `,
          )
          .join("")}
    </resources>
    
    <footer>
        <text>${newsletter.footer.text}</text>
    </footer>
</newsletter>`
  },

  get canUndo() {
    return get().historyIndex > 0
  },

  get canRedo() {
    const state = get()
    return state.historyIndex < state.history.length - 1
  },
}))
