"use client"

import React, { useEffect, useState } from "react"
import { 
  ImageIcon, 
  Trash2Icon, 
  CopyIcon, 
  ExternalLinkIcon,
  SearchIcon,
  Loader2Icon,
  CheckIcon,
  UploadIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import Image from "next/image"

interface MediaItem {
  filename: string
  url: string
  size: number
  createdAt: string
}

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/admin/media")
      const result = await res.json()
      if (result.success) {
        setMedia(result.images)
      }
    } catch {
      toast.error("Failed to load media")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const result = await res.json()
      if (result.success) {
        toast.success("Image uploaded successfully")
        fetchMedia() // Refresh the list
      } else {
        toast.error(result.message || "Upload failed")
      }
    } catch {
      toast.error("An error occurred during upload")
    } finally {
      setUploading(false)
      // Reset input
      e.target.value = ""
    }
  }

  const handleDelete = async (filename: string) => {
    if (!confirm("Are you sure you want to delete this image? This cannot be undone.")) return
    
    setDeleting(filename)
    try {
      const res = await fetch(`/api/admin/media/${filename}`, { method: "DELETE" })
      const result = await res.json()
      if (result.success) {
        toast.success("Image deleted")
        setMedia(media.filter(m => m.filename !== filename))
      } else {
        toast.error(result.message || "Delete failed")
      }
    } catch {
      toast.error("An error occurred")
    } finally {
      setDeleting(null)
    }
  }

  const copyToClipboard = async (url: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url)
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement("textarea")
        textArea.value = url
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        try {
          document.execCommand('copy')
        } catch (err) {
          console.error('Fallback copy failed', err)
        }
        document.body.removeChild(textArea)
      }
      setCopied(url)
      toast.success("Link copied to clipboard")
      setTimeout(() => setCopied(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
      toast.error("Failed to copy link")
    }
  }

  const filteredMedia = media.filter(item => 
    item.filename.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-primary/5 p-10 rounded-[3rem] border border-primary/10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20">
              <ImageIcon className="text-primary size-5" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight italic uppercase">Media Library</h1>
          </div>
          <p className="text-white/30 font-bold uppercase text-[10px] tracking-[0.4em] ml-1">Manage and access all your uploaded visual assets</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full md:w-80 group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/20 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="SEARCH BY FILENAME..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-white/5 border-white/10 text-white rounded-2xl h-14 text-[10px] font-black tracking-widest uppercase focus:border-primary/50 transition-all"
            />
          </div>

          <Input 
            type="file" 
            id="media-upload" 
            className="hidden" 
            accept="image/*" 
            onChange={handleUpload}
            disabled={uploading}
          />
          <Button 
            onClick={() => document.getElementById("media-upload")?.click()}
            disabled={uploading}
            className="w-full md:w-auto h-14 px-8 rounded-2xl bg-primary text-background font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20"
          >
            {uploading ? <Loader2Icon className="mr-2 size-4 animate-spin" /> : <UploadIcon className="mr-2 size-4" />}
            Upload New Asset
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Loader2Icon className="size-10 text-primary animate-spin" />
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Loading assets...</p>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] glass-premium rounded-[3rem] border-dashed border-white/10 gap-6">
          <div className="size-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
            <ImageIcon className="size-10 text-white/10" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-black text-white uppercase tracking-wider">No media found</h3>
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Upload some images in the page editors to see them here</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMedia.map((item) => (
            <div 
              key={item.filename} 
              className="group glass-premium rounded-[2.5rem] overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-500 shadow-2xl flex flex-col"
            >
              {/* Preview Area */}
              <div className="relative aspect-video bg-black overflow-hidden border-b border-white/5">
                <Image 
                  src={item.url} 
                  alt={item.filename} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700 unoptimized"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 px-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="rounded-xl h-10 px-4 bg-white text-black border-none font-black text-[9px] uppercase tracking-widest hover:bg-white/90"
                    onClick={() => copyToClipboard(item.url)}
                  >
                    {copied === item.url ? <CheckIcon className="mr-2 size-3" /> : <CopyIcon className="mr-2 size-3" />}
                    {copied === item.url ? "Copied" : "Copy Link"}
                  </Button>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="rounded-xl size-10 bg-white/10 border-white/20 text-white hover:bg-primary hover:text-black transition-all"
                    >
                      <ExternalLinkIcon className="size-4" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-black text-white truncate mb-1 uppercase tracking-wider" title={item.filename}>
                    {item.filename}
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Size</span>
                      <span className="text-[10px] font-bold text-white/50">{formatSize(item.size)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Added</span>
                      <span className="text-[10px] font-bold text-white/50">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  disabled={deleting === item.filename}
                  variant="ghost"
                  className="w-full h-10 rounded-xl bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/10 transition-all font-black text-[9px] uppercase tracking-[0.2em]"
                  onClick={() => handleDelete(item.filename)}
                >
                  {deleting === item.filename ? <Loader2Icon className="size-3 animate-spin mr-2" /> : <Trash2Icon className="size-3 mr-2" />}
                  Delete Asset
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
