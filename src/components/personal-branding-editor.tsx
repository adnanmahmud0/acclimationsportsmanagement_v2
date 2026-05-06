"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, Settings2Icon } from "lucide-react"
import { PageData, FAQ } from "@/types/cms"
import Image from "next/image"
import { GradientHeader } from "@/components/gradient-header"
import { CtaButton } from "@/components/cta-button"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"
import { mergePageData } from "@/lib/data-utils"
import { DEFAULT_PERSONAL_BRANDING_DATA } from "@/lib/defaults"
import { PlusIcon, Trash2Icon } from "lucide-react"

export function PersonalBrandingEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<PageData | null>(null)
  const [activeTab, setActiveTab] = useState<"live" | "seo">("live")

  useEffect(() => {
    fetchPageData()
  }, [])

  const fetchPageData = async () => {
    try {
      const response = await fetch("/api/pages/personal-branding")
      const result = await response.json()
      if (result.success && result.data) {
        setData(mergePageData(result.data, DEFAULT_PERSONAL_BRANDING_DATA))
      } else {
        setData(DEFAULT_PERSONAL_BRANDING_DATA)
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to fetch page data")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("/api/pages/personal-branding", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        toast.success("Personal Branding Published Successfully!")
      } else {
        toast.error(result.message || "Failed to save")
      }
    } catch (error) {
      console.error(error)
      toast.error("An error occurred while saving")
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (field: string, value: unknown) => {
    setData((prev) => {
      if (!prev) return null
      const currentPB = prev.content.personalBranding || DEFAULT_PERSONAL_BRANDING_DATA.content.personalBranding!
      return {
        ...prev,
        content: {
          ...prev.content,
          personalBranding: {
            ...currentPB,
            [field]: value
          }
        }
      }
    })
  }

  const updateSeo = (field: keyof PageData["seo"], value: string | FAQ[] | boolean) => {
    setData((prev) => {
      if (!prev) return null
      return {
        ...prev,
        seo: { ...prev.seo, [field]: value }
      }
    })
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2Icon className="size-10 animate-spin text-blue-500" />
      </div>
    )
  }

  const content = data?.content?.personalBranding || {
    title: "",
    tagline: "",
    metrics: [],
    services: [],
    resultsTitle: "",
    highlights: [],
    ctaText: "",
    backgroundImage: ""
  }

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700 w-full max-w-full overflow-x-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-[#0a0d12]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-xl sticky top-4 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-inner">
            <Settings2Icon className="text-blue-500 size-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight italic">{data.title} <span className="text-blue-500 text-[10px] not-italic align-top ml-1">EDITOR</span></h1>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Manage content, SEO, and FAQs for this page live</p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center gap-2">
          <div className="flex bg-white/5 p-1.5 rounded-[1.25rem] border border-white/10 backdrop-blur-md shadow-inner">
            <button
              onClick={() => setActiveTab("seo")}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === "seo" ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" : "text-white/40 hover:text-white hover:bg-white/5"}`}
            >
              SEO & Metadata
            </button>
            <button
              onClick={() => setActiveTab("live")}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === "live" ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" : "text-white/40 hover:text-white hover:bg-white/5"}`}
            >
              Edit Page
            </button>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-500 text-white border-none shadow-2xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 px-10 font-black text-xs h-12 tracking-widest uppercase rounded-2xl shrink-0"
        >
          {saving ? <Loader2Icon className="size-4 animate-spin" /> : <SaveIcon className="size-4 mr-2" />}
          Publish Changes
        </Button>
      </div>

      {activeTab === "seo" ? (
        <SeoEditor data={data} updateSeo={updateSeo} />
      ) : (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Visual Preview Area */}
          <div className="w-full rounded-[3rem] overflow-hidden border border-white/5 bg-black shadow-3xl">
            <div className="bg-white/5 px-8 py-3 flex items-center justify-center gap-3 border-b border-white/5">
              <div className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Visual Preview</span>
            </div>
            
            <div className="relative pt-12 pb-24 bg-[#05070a]">
              <div className="absolute inset-0 z-0">
                <Image src={content.backgroundImage || "/glove.png"} alt="Bg" fill className="object-cover opacity-50" unoptimized />
              </div>
              
              <div className="container mx-auto px-6 pt-24 pb-12 relative z-10 flex flex-col items-center">
                <div className="text-center space-y-4 mb-12">
                  <GradientHeader tag="h1" size="lg" className="mb-4 text-center">
                    {(content.title || "").split('\n').map((line: string, i: number) => (
                      <React.Fragment key={i}>{line}{i < (content.title || "").split('\n').length - 1 && <br />}</React.Fragment>
                    ))}
                  </GradientHeader>
                  <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 whitespace-pre-line leading-relaxed">
                    {content.tagline}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
                  {content.metrics.map((m: { title: string; value: string }, i: number) => (
                    <div key={i} className="bg-[#0a0d12]/95 border border-primary/30 p-6 rounded-3xl backdrop-blur-xl shadow-2xl text-center">
                      <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{m.title}</div>
                      <div className="text-3xl font-black text-white">{m.value}</div>
                    </div>
                  ))}
                </div>

                <div className="w-full max-w-7xl space-y-12 bg-gradient-to-t from-[#05070a] via-[#05070a]/80 to-transparent p-8 md:p-12 rounded-[3rem] border border-white/5 backdrop-blur-sm mt-12">
                  <div className="flex flex-col lg:flex-row gap-12 items-end">
                    <div className="flex-1 space-y-8">
                      <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                        {(content.resultsTitle || "Personal Brand Strategy | Negotiation:").split('|')[0]} | <span className="text-primary">{(content.resultsTitle || "").split('|')[1] || ""}</span>
                      </h2>
                      <div className="grid md:grid-cols-3 gap-6">
                        {content.services.map((s: { title: string; desc: string }, i: number) => (
                          <div key={i} className="bg-[#0a0d12]/95 border border-white/10 p-6 rounded-2xl space-y-4">
                            <div className="flex gap-3 items-center">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              <h4 className="text-white font-black uppercase text-sm tracking-widest">{s.title}</h4>
                            </div>
                            <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">{s.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:w-1/3 space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        {content.highlights.map((h: { value: string; label: string }, i: number) => (
                          <div key={i} className="bg-[#0a0d12]/95 border border-primary/20 p-8 rounded-2xl shadow-2xl text-center">
                            <div className="text-4xl font-black text-white mb-2">{h.value}</div>
                            <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest leading-relaxed whitespace-pre-line">{h.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <CtaButton href="#">SCHEDULE YOUR CALL</CtaButton>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Hero Content</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Main Heading (use \n for line breaks)</label>
                    <textarea
                      className="w-full h-32 bg-white/5 border border-white/10 text-white rounded-2xl p-4 text-sm focus:border-blue-500/50 outline-none transition-all resize-none font-bold"
                      value={content.title}
                      onChange={(e) => updateContent("title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Hero Tagline</label>
                    <textarea
                      className="w-full h-32 bg-white/5 border border-white/10 text-white rounded-2xl p-4 text-sm focus:border-blue-500/50 outline-none transition-all resize-none"
                      value={content.tagline}
                      onChange={(e) => updateContent("tagline", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                 <div className="flex items-center justify-between">
                   <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Brand Metrics</h2>
                   <Button 
                    onClick={() => updateContent("metrics", [...content.metrics, { title: "New Metric", value: "0" }])}
                    className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg"
                   >
                     <PlusIcon className="size-3 mr-2" /> Add Metric
                   </Button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {content.metrics.map((m: { title: string; value: string }, idx: number) => (
                      <div key={idx} className="bg-white/5 p-4 rounded-xl space-y-3 relative group/item">
                         <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newMetrics = content.metrics.filter((_, i) => i !== idx)
                            updateContent("metrics", newMetrics)
                          }}
                          className="absolute -top-2 -right-2 text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity bg-[#0a0d12] border border-white/10 size-6 rounded-full"
                         >
                           <Trash2Icon className="size-3" />
                         </Button>
                         <div className="space-y-1">
                           <label className="text-[8px] font-black text-white/10 uppercase tracking-widest ml-1">Metric Title</label>
                           <Input 
                             value={m.title} 
                             onChange={(e) => {
                               const newMetrics = [...content.metrics]
                               newMetrics[idx].title = e.target.value
                               updateContent("metrics", newMetrics)
                             }}
                             className="bg-black/40 border-white/10 text-white h-10 text-xs font-black uppercase"
                           />
                         </div>
                         <div className="space-y-1">
                           <label className="text-[8px] font-black text-white/10 uppercase tracking-widest ml-1">Value</label>
                           <Input 
                             value={m.value} 
                             onChange={(e) => {
                               const newMetrics = [...content.metrics]
                               newMetrics[idx].value = e.target.value
                               updateContent("metrics", newMetrics)
                             }}
                             className="bg-black/40 border-white/10 text-white h-10 text-xs font-black uppercase"
                           />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                 <div className="flex items-center justify-between">
                   <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Strategy Boxes</h2>
                   <Button 
                    onClick={() => updateContent("services", [...content.services, { title: "New Service", desc: "" }])}
                    className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg"
                   >
                     <PlusIcon className="size-3 mr-2" /> Add Box
                   </Button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {content.services.map((s: { title: string; desc: string }, idx: number) => (
                      <div key={idx} className="bg-white/5 p-4 rounded-xl space-y-3 border border-white/5 relative group/item">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newServices = content.services.filter((_, i) => i !== idx)
                            updateContent("services", newServices)
                          }}
                          className="absolute -top-2 -right-2 text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity bg-[#0a0d12] border border-white/10 size-6 rounded-full z-10"
                        >
                          <Trash2Icon className="size-3" />
                        </Button>
                        <Input value={s.title} onChange={(e) => {
                          const newServices = [...content.services]
                          newServices[idx].title = e.target.value
                          updateContent("services", newServices)
                        }} className="bg-black/40 border-white/10 text-white text-xs font-black uppercase" />
                        <Textarea value={s.desc} onChange={(e) => {
                          const newServices = [...content.services]
                          newServices[idx].desc = e.target.value
                          updateContent("services", newServices)
                        }} className="bg-black/40 border-white/10 text-white text-[10px] resize-none h-20" />
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Visuals & CTA</h2>
                <ImageUpload
                  label="Background Image"
                  value={content.backgroundImage || ""}
                  onChange={(v) => updateContent("backgroundImage", v)}
                />
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Results Section Title (use | for color split)</label>
                  <Input
                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm font-bold uppercase tracking-widest"
                    value={content.resultsTitle}
                    onChange={(e) => updateContent("resultsTitle", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">CTA Button Text</label>
                  <Input
                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm font-bold uppercase tracking-widest"
                    value={content.ctaText}
                    onChange={(e) => updateContent("ctaText", e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Results Highlights</h2>
                  <Button 
                    onClick={() => updateContent("highlights", [...content.highlights, { value: "0%", label: "" }])}
                    className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg"
                  >
                    <PlusIcon className="size-3 mr-2" /> Add Result
                  </Button>
                </div>
                <div className="space-y-4">
                   {content.highlights.map((h: { value: string; label: string }, idx: number) => (
                      <div key={idx} className="bg-white/5 p-4 rounded-xl space-y-3 relative group/item">
                         <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newHighlights = content.highlights.filter((_, i) => i !== idx)
                            updateContent("highlights", newHighlights)
                          }}
                          className="absolute -top-2 -right-2 text-red-500 opacity-0 group-hover/item:opacity-100 transition-opacity bg-[#0a0d12] border border-white/10 size-6 rounded-full z-10"
                         >
                           <Trash2Icon className="size-3" />
                         </Button>
                         <Input value={h.value} onChange={(e) => {
                           const newHighlights = [...content.highlights]
                           newHighlights[idx].value = e.target.value
                           updateContent("highlights", newHighlights)
                         }} className="bg-black/40 border-white/10 text-white text-xl font-black" />
                         <Textarea value={h.label} onChange={(e) => {
                           const newHighlights = [...content.highlights]
                           newHighlights[idx].label = e.target.value
                           updateContent("highlights", newHighlights)
                         }} className="bg-black/40 border-white/10 text-white text-[10px] h-16 resize-none" />
                      </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
