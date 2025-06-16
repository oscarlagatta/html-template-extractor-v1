import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatMarkdown(text: string): string {
  if (!text) return ""

  // Convert markdown-style formatting to HTML
  const formatted = text
    // Bold: **text** -> <strong>text</strong>
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Italic: *text* -> <em>text</em>
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Links: [text](url) -> <a href="url">text</a>
    .replace(
      /\[([^\]]+)\]$$([^)]+)$$/g,
      '<a href="$2" class="text-blue-600 underline" target="_blank" rel="noopener noreferrer">$1</a>',
    )
    // Lists: • item -> <li>item</li>
    .replace(/^• (.+)$/gm, "<li>$1</li>")
    // Wrap consecutive list items in <ul>
    .replace(/(<li>.*<\/li>)/gs, '<ul class="list-disc list-inside space-y-1">$1</ul>')
    // Line breaks
    .replace(/\n/g, "<br>")

  return formatted
}

export function stripFormatting(text: string): string {
  // Remove HTML tags and markdown formatting
  return text
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.*?)\*/g, "$1") // Remove italic
    .replace(/\[([^\]]+)\]$$[^)]+$$/g, "$1") // Remove links, keep text
    .replace(/^• /gm, "") // Remove bullet points
    .trim()
}
