"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2Icon, UploadIcon, ImageIcon } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface ImageUploadProps {
  label: string
  value: string
  onChange: (url: string) => void
}

export function ImageUpload({ label, value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

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
        onChange(result.url)
        toast.success("Image uploaded successfully")
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

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">{label}</label>
      
      <div className="flex flex-col gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-blue-500/30 transition-all">
        {value ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/5">
            <Image src={value} alt="Preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
               <Button 
                variant="outline" 
                size="sm" 
                className="bg-blue-600 border-none text-white font-black text-[9px] uppercase tracking-widest h-8"
                onClick={() => document.getElementById(`upload-${label}`)?.click()}
               >
                 Change Image
               </Button>
               <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-400 font-black text-[9px] uppercase tracking-widest h-8 hover:text-red-500"
                onClick={() => onChange("")}
               >
                 Remove
               </Button>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => document.getElementById(`upload-${label}`)?.click()}
            className="w-full aspect-video rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/5 hover:border-blue-500/20 transition-all"
          >
            <div className="size-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <ImageIcon className="text-white/20 size-6" />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">No Background Image</p>
              <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1">Click to upload (JPG, PNG, WebP)</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Input 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder="or paste image URL here..."
            className="bg-white/5 border-white/10 text-white rounded-xl h-10 text-[10px] flex-1"
          />
          <Input 
            type="file" 
            id={`upload-${label}`}
            className="hidden" 
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
          />
          <Button 
            disabled={uploading}
            onClick={() => document.getElementById(`upload-${label}`)?.click()}
            className="bg-white/5 hover:bg-white/10 text-white border-white/10 h-10 rounded-xl px-4"
          >
            {uploading ? <Loader2Icon className="size-4 animate-spin" /> : <UploadIcon className="size-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
