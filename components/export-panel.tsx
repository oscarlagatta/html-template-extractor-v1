"use client"

import { useState } from "react"
import { useNewsletterStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Copy, Download, Share } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ExportPanel() {
  const { newsletter, generateHTML, generateXML } = useNewsletterStore()
  const [htmlOutput, setHtmlOutput] = useState("")
  const [xmlOutput, setXmlOutput] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [copied, setCopied] = useState("")

  const handleGenerateHTML = () => {
    const html = generateHTML()
    setHtmlOutput(html)
  }

  const handleGenerateXML = () => {
    const xml = generateXML()
    setXmlOutput(xml)
  }

  const handleCopy = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(type)
      setTimeout(() => setCopied(""), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const generateShareLink = () => {
    // In a real app, this would upload to a service and return a shareable URL
    const data = encodeURIComponent(JSON.stringify(newsletter))
    return `${window.location.origin}/preview?data=${data}`
  }

  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Export Newsletter</h3>

        {/* HTML Export */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Button onClick={handleGenerateHTML} size="sm">
              Generate HTML
            </Button>
            {htmlOutput && (
              <>
                <Button size="sm" variant="outline" onClick={() => handleCopy(htmlOutput, "html")}>
                  <Copy className="w-3 h-3 mr-1" />
                  {copied === "html" ? "Copied!" : "Copy"}
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDownload(htmlOutput, "newsletter.html")}>
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </>
            )}
          </div>

          {htmlOutput && (
            <Textarea
              value={htmlOutput}
              readOnly
              className="h-32 text-xs font-mono"
              placeholder="HTML output will appear here..."
            />
          )}
        </div>

        <Separator className="my-4" />

        {/* XML Export */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Button onClick={handleGenerateXML} size="sm">
              Generate XML
            </Button>
            {xmlOutput && (
              <>
                <Button size="sm" variant="outline" onClick={() => handleCopy(xmlOutput, "xml")}>
                  <Copy className="w-3 h-3 mr-1" />
                  {copied === "xml" ? "Copied!" : "Copy"}
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDownload(xmlOutput, "newsletter.xml")}>
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </>
            )}
          </div>

          {xmlOutput && (
            <Textarea
              value={xmlOutput}
              readOnly
              className="h-32 text-xs font-mono"
              placeholder="XML output will appear here..."
            />
          )}
        </div>

        <Separator className="my-4" />

        {/* Share Preview */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Share Preview</Label>
          <Button
            onClick={() => {
              const shareUrl = generateShareLink()
              handleCopy(shareUrl, "share")
            }}
            size="sm"
            className="w-full"
          >
            <Share className="w-3 h-3 mr-1" />
            {copied === "share" ? "Link Copied!" : "Copy Preview Link"}
          </Button>

          <Alert>
            <AlertDescription className="text-xs">
              Generate a shareable preview link that others can view without editing access.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
