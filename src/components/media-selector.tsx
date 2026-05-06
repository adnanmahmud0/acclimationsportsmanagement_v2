"use client"

import React, { useEffect, useState } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog"
import { 
  ImageIcon, 
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

interface MediaSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string) => void
}

export function MediaSelector({ isOpen, onClose, onSelect }: MediaSelectorProps) {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [uploading, setUploading] = useState(false)

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/admin/media")
      const result = await res.json()
      if (result.success) {
        setMedia(result.images)
      }
    } catch {
      console.error("Failed to load media")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchMedia()
    }
  }, [isOpen])

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
        onSelect(result.url)
        onClose()
      } else {
        toast.error(result.message || "Upload failed")
      }
    } catch (err) {
      console.error(err)
      toast.error("An error occurred during upload")
    } finally {
      setUploading(false)
    }
  }

  const filteredMedia = media.filter(item => 
    item.filename.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] lg:max-w-7xl h-[90vh] flex flex-col bg-[#05070a]/95 backdrop-blur-2xl border-white/5 p-0 overflow-hidden rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.6)]">
        <DialogHeader className="p-10 border-b border-white/5 bg-white/[0.02]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20">
                  <ImageIcon className="text-primary size-5" />
                </div>
                <DialogTitle className="text-3xl font-black text-white uppercase tracking-tight italic">Media Library</DialogTitle>
              </div>
              <DialogDescription className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em] ml-1">
                Visual Assets & Intelligence Repository
              </DialogDescription>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="relative w-full md:w-80 group">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/20 group-focus-within:text-primary transition-all duration-300" />
                <Input 
                  placeholder="FILTER ASSETS..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-white/5 border-white/10 text-white rounded-2xl h-14 text-[11px] font-black tracking-[0.2em] uppercase focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
              
              <Input 
                type="file" 
                id="modal-upload" 
                className="hidden" 
                accept="image/*" 
                onChange={handleUpload}
                disabled={uploading}
              />
              <Button 
                onClick={() => document.getElementById("modal-upload")?.click()}
                disabled={uploading}
                className="relative group bg-primary hover:bg-primary/90 text-background font-black text-[11px] uppercase tracking-widest rounded-2xl h-14 px-10 shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_30px_rgba(0,210,255,0.5)] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative flex items-center gap-3">
                  {uploading ? <Loader2Icon className="size-5 animate-spin" /> : <UploadIcon className="size-5" />}
                  Upload Asset
                </span>
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-black/20">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <div className="relative">
                <div className="size-20 rounded-full border-t-2 border-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="size-8 text-primary/40 animate-pulse" />
                </div>
              </div>
              <p className="text-[11px] font-black text-white/20 uppercase tracking-[0.6em] animate-pulse ml-2">Syncing Library...</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <div className="size-32 bg-white/[0.02] rounded-[3rem] flex items-center justify-center border border-white/5 shadow-inner">
                <ImageIcon className="size-12 text-white/10" />
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-black text-white/40 uppercase tracking-widest italic">No assets found</h3>
                <p className="text-[11px] font-bold text-white/10 uppercase tracking-[0.4em]">Try a different search term or upload a new asset</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {filteredMedia.map((item) => (
                <div 
                  key={item.filename}
                  onClick={() => onSelect(item.url)}
                  className="group relative aspect-[16/10] bg-white/5 border border-white/5 cursor-pointer hover:border-primary/50 hover:shadow-[0_0_40px_rgba(0,210,255,0.15)] transition-all duration-700"
                >
                  <Image 
                    src={item.url} 
                    alt={item.filename} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 unoptimized opacity-100"
                    unoptimized
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Selection Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="bg-primary text-background size-16 rounded-full flex items-center justify-center scale-50 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_30px_rgba(0,210,255,0.6)]">
                      <CheckIcon className="size-8 stroke-[4px]" />
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="absolute bottom-0 inset-x-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-white truncate uppercase tracking-[0.2em] italic" title={item.filename}>
                        {item.filename.split('-').slice(1).join('-') || item.filename}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="size-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#00d2ff]" />
                        <p className="text-[9px] font-black text-primary uppercase tracking-widest">Select Image</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-8 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
           <div className="flex items-center gap-3 ml-6">
             <div className="size-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#00d2ff]" />
             <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em]">
               Library Capacity: {filteredMedia.length} Objects Synced
             </p>
           </div>
           <Button variant="ghost" onClick={onClose} className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em] hover:text-white transition-all mr-6">
             Terminate Session
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
