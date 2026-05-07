"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, LayoutIcon, PhoneIcon, MailIcon, MapPinIcon } from "lucide-react"
import { PageData, PageContent, ContactData } from "@/types/cms"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"
import { GradientHeader } from "@/components/gradient-header"
import Image from "next/image"

export function ContactEditor() {
  const slug = "contact"
  const title = "Contact Us"
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<PageData | null>(null)
  const [activeTab, setActiveTab] = useState<"live" | "seo">("seo")

  const fetchPageData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/pages/${slug}`)
      const result = await response.json()
      if (result.success && result.data) {
        setData(result.data)
      } else {
        setData({
          slug,
          title,
          content: {
            contact: {
              title: "Ready to Take the Next Step?",
              tagline: "Any questions or remarks? Just contact us!",
              phone: "512-518-6547",
              phoneTitle: "Joe's Direct Line",
              phoneDesc: "Call or text Joe anytime —\n24/7 for serious inquiries",
              email: "Joseph.Grekoski@AcclimationGroup.com",
              emailTitle: "Email",
              emailDesc: "Fast responses for NBA,\ncollege & high school athletes",
              location: "Acclimation Sports Agency\nFort Lauderdale, Florida 33308",
              locationTitle: "Office Location",
              backgroundImage: "/bascatecoart_v6.png"
            }
          },
          seo: { title: `${title} | Acclimation Sports`, description: "", keywords: "" }
        })
      }
    } catch {
      toast.error("Failed to fetch page data")
    } finally {
      setLoading(false)
    }
  }, [slug, title])

  useEffect(() => {
    fetchPageData()
  }, [fetchPageData])

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch(`/api/pages/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) toast.success(`${title} Published Successfully!`)
      else toast.error(result.message)
    } catch {
      toast.error("An error occurred while saving")
    } finally {
      setSaving(false)
    }
  }

  const updateContact = (field: string, value: unknown) => {
    setData(prev => {
      if (!prev) return null
      const contact = prev.content.contact || {}
      return { ...prev, content: { ...prev.content, contact: { ...contact, [field]: value } as PageContent["contact"] } }
    })
  }

  if (loading || !data) return <div className="flex items-center justify-center h-[60vh]"><Loader2Icon className="size-10 animate-spin text-blue-500" /></div>

  const contact = (data.content.contact || {}) as ContactData

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700 w-full max-w-full overflow-x-hidden">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-[#0a0d12]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-xl sticky top-4 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-inner">
            <LayoutIcon className="text-blue-500 size-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight italic">{data.title} <span className="text-blue-500 text-[10px] not-italic align-top ml-1">EDITOR</span></h1>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Full Page Live Preview & Contact Controls</p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center gap-2">
          <div className="flex bg-white/5 p-1.5 rounded-[1.25rem] border border-white/10 backdrop-blur-md shadow-inner">
            <button onClick={() => setActiveTab("seo")} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === "seo" ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" : "text-white/40 hover:text-white hover:bg-white/5"}`}>SEO & Metadata</button>
            <button onClick={() => setActiveTab("live")} className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === "live" ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" : "text-white/40 hover:text-white hover:bg-white/5"}`}>Edit Page</button>
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-500 text-white px-10 font-black text-xs h-12 uppercase rounded-2xl">
          {saving ? <Loader2Icon className="animate-spin" /> : <SaveIcon className="size-4 mr-2" />}
          Publish Changes
        </Button>
      </div>

      {activeTab === "seo" ? (
        <SeoEditor data={data} updateSeo={(f, v) => setData({ ...data, seo: { ...data.seo, [f]: v } })} />
      ) : (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* VISUAL PREVIEW */}
          <div className="w-full rounded-[3rem] overflow-hidden border border-white/5 bg-black shadow-3xl">
            <div className="bg-white/5 px-8 py-3 flex items-center justify-center gap-3 border-b border-white/5">
              <div className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Full Page Preview</span>
            </div>
            
            <div className="relative pt-32 pb-24 bg-[#05070a] overflow-hidden origin-top scale-[0.85] lg:scale-100">
                {/* Preview Content */}
                <div className="absolute inset-0 z-0">
                  <Image src={contact.backgroundImage || "/bascatecoart_v6.png"} alt="Bg" fill className="object-cover opacity-80" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/95 via-[#05070a]/60 to-[#05070a]" />
                </div>
                
                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                   <div className="text-center space-y-4 mb-16">
                      <GradientHeader tag="h2" size="lg">{contact.title}</GradientHeader>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">{contact.tagline}</h3>
                   </div>
                   
                   <div className="grid grid-cols-3 gap-6 w-full max-w-5xl">
                      <div className="glass-premium p-8 rounded-[2rem] flex flex-col items-center text-center space-y-4 border-white/5">
                         <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><PhoneIcon size={24} /></div>
                         <h4 className="text-white font-black text-xs uppercase tracking-widest">{contact.phoneTitle}</h4>
                         <p className="text-sm font-black text-white">{contact.phone}</p>
                      </div>
                      <div className="glass-premium p-8 rounded-[2rem] flex flex-col items-center text-center space-y-4 border-white/5">
                         <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><MailIcon size={24} /></div>
                         <h4 className="text-white font-black text-xs uppercase tracking-widest">{contact.emailTitle}</h4>
                         <p className="text-[10px] font-bold text-white break-all">{contact.email}</p>
                      </div>
                      <div className="glass-premium p-8 rounded-[2rem] flex flex-col items-center text-center space-y-4 border-white/5">
                         <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary"><MapPinIcon size={24} /></div>
                         <h4 className="text-white font-black text-xs uppercase tracking-widest">{contact.locationTitle}</h4>
                         <p className="text-[10px] font-bold text-white/60 leading-relaxed uppercase">{contact.location}</p>
                      </div>
                   </div>
                </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-12">
            {/* Hero & Basics */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Section 1: Header & Background</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Main Heading</label>
                    <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl font-bold" value={contact.title} onChange={(e) => updateContact("title", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Sub-Heading / Tagline</label>
                    <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl font-medium" value={contact.tagline} onChange={(e) => updateContact("tagline", e.target.value)} />
                  </div>
                </div>
                <ImageUpload label="Contact Background" value={contact.backgroundImage || ""} onChange={(v) => updateContact("backgroundImage", v)} />
              </div>
            </div>

            {/* Info Cards Editor */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Phone */}
               <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-4">
                  <div className="flex items-center gap-2 text-blue-500 mb-2"><PhoneIcon className="size-4" /><h3 className="text-[10px] font-black uppercase tracking-widest text-white">Phone Info</h3></div>
                  <Input className="bg-white/5 border-white/10 text-white h-10 rounded-xl text-xs font-black uppercase tracking-widest" value={contact.phoneTitle} onChange={(e) => updateContact("phoneTitle", e.target.value)} placeholder="Title" />
                  <Input className="bg-white/5 border-white/10 text-white h-10 rounded-xl text-xs" value={contact.phone} onChange={(e) => updateContact("phone", e.target.value)} placeholder="Number" />
                  <textarea className="w-full h-20 bg-white/5 border border-white/10 text-white rounded-xl p-3 text-[10px] font-bold uppercase tracking-widest resize-none" value={contact.phoneDesc} onChange={(e) => updateContact("phoneDesc", e.target.value)} placeholder="Description" />
               </div>
               {/* Email */}
               <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-4">
                  <div className="flex items-center gap-2 text-blue-500 mb-2"><MailIcon className="size-4" /><h3 className="text-[10px] font-black uppercase tracking-widest text-white">Email Info</h3></div>
                  <Input className="bg-white/5 border-white/10 text-white h-10 rounded-xl text-xs font-black uppercase tracking-widest" value={contact.emailTitle} onChange={(e) => updateContact("emailTitle", e.target.value)} placeholder="Title" />
                  <Input className="bg-white/5 border-white/10 text-white h-10 rounded-xl text-xs" value={contact.email} onChange={(e) => updateContact("email", e.target.value)} placeholder="Email" />
                  <textarea className="w-full h-20 bg-white/5 border border-white/10 text-white rounded-xl p-3 text-[10px] font-bold uppercase tracking-widest resize-none" value={contact.emailDesc} onChange={(e) => updateContact("emailDesc", e.target.value)} placeholder="Description" />
               </div>
               {/* Location */}
               <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-4">
                  <div className="flex items-center gap-2 text-blue-500 mb-2"><MapPinIcon className="size-4" /><h3 className="text-[10px] font-black uppercase tracking-widest text-white">Location Info</h3></div>
                  <Input className="bg-white/5 border-white/10 text-white h-10 rounded-xl text-xs font-black uppercase tracking-widest" value={contact.locationTitle} onChange={(e) => updateContact("locationTitle", e.target.value)} placeholder="Title" />
                  <textarea className="w-full h-32 bg-white/5 border border-white/10 text-white rounded-xl p-3 text-[10px] font-bold uppercase tracking-widest resize-none" value={contact.location} onChange={(e) => updateContact("location", e.target.value)} placeholder="Address" />
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
