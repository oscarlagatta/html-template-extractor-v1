export interface ContentBlockType {
  id: string
  title: string
  content: string
  imageUrl?: string
}

export interface ResourceType {
  id: string
  title: string
  description: string
  url: string
}

export interface NewsletterData {
  header: {
    title: string
    logoUrl: string
  }
  title: string
  hero: {
    title: string
    content: string
    iconUrl: string
  }
  contentBlocks: ContentBlockType[]
  resources: ResourceType[]
  footer: {
    text: string
  }
}
