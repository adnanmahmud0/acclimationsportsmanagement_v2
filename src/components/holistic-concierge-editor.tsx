"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, Settings2Icon, PlusIcon, Trash2Icon, Dumbbell, Plane, Utensils, Tv, PiggyBank, Headphones } from "lucide-react"
import { PageData, FAQ, HolisticConciergeData } from "@/types/cms"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"
import { GradientHeader } from "@/components/gradient-header"
import { CtaButton } from "@/components/cta-button"
import Image from "next/image"

interface HolisticConciergeEditorProps {
  slug: string
}

export function HolisticConciergeEditor({ slug }: HolisticConciergeEditorProps) {
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
          title: "Holistic Concierge",
          content: {
            holisticConcierge: {
              title: "Elite Lifestyle Support for the Global Athlete",
              tagline: "Off-the-court excellence so you can focus 100% on your game.",
              backgroundImage: "/foodsearvice.png",
              ctaText: "SCHEDULE YOUR CONFIDENTIAL CONCIERGE CONSULTATION",
              services: [
                { iconType: "dumbbell", title: "Elite Personal Training", desc: "Private access to world-class strength and conditioning coaches." },
                { iconType: "utensils", title: "Private Nutritionists", desc: "Customized performance-based meal plans and private chefs." },
              ]
            }
          },
          seo: {
            title: "Holistic Concierge | Acclimation Sports",
            description: "World-class concierge support for NBA and professional athletes.",
            keywords: "NBA, Concierge, Athlete Support, Private Chefs"
          }
        })
      }
    } catch {
      toast.error("Failed to fetch page data")
    } finally {
      setLoading(false)
    }
  }, [slug])

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
      if (result.success) toast.success("Holistic Concierge Published!")
      else toast.error(result.message)
    } catch {
      toast.error("An error occurred while saving")
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (field: keyof HolisticConciergeData, value: unknown) => {
    setData((prev) => {
      if (!prev) return null
      return {
        ...prev,
        content: {
          ...prev.content,
          holisticConcierge: {
            ...(prev.content.holisticConcierge || {
              title: "",
              tagline: "",
              services: [],
              ctaText: "",
              backgroundImage: ""
            }),
            [field]: value
          }
        }
      }
    })
  }

  const updateSeo = (field: keyof PageData["seo"], value: string | FAQ[] | boolean) => {
    setData((prev: PageData | null) => {
      if (!prev) return null
      return { ...prev, seo: { ...prev.seo, [field]: value } }
    })
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "dumbbell": return <Dumbbell className="size-6" />
      case "plane": return <Plane className="size-6" />
      case "utensils": return <Utensils className="size-6" />
      case "tv": return <Tv className="size-6" />
      case "piggybank": return <PiggyBank className="size-6" />
      case "headphones": return <Headphones className="size-6" />
      default: return <Headphones className="size-6" />
    }
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2Icon className="size-10 animate-spin text-blue-500" />
      </div>
    )
  }

  const content = data.content.holisticConcierge || {
    title: "",
    tagline: "",
    services: [],
    ctaText: "",
    backgroundImage: ""
  }

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700 w-full">
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
              <div className="absolute inset-x-0 top-0 z-0 h-[85vh]">
                <Image src={content.backgroundImage || "/foodsearvice.png"} alt="Bg" fill className="object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/90 via-[#05070a]/40 to-[#05070a]" />
              </div>
              
              <div className="container mx-auto px-6 pt-32 pb-12 relative z-10 flex flex-col items-center">
                <div className="space-y-12 max-w-6xl mx-auto text-center">
                  <div className="space-y-6">
                    <GradientHeader tag="h1" size="lg" className="mb-4 text-center">
                      {(content.title || "").split('\n').map((line: string, i: number) => (
                        <React.Fragment key={i}>{line}{i < (content.title || "").split('\n').length - 1 && <br />}</React.Fragment>
                      ))}
                    </GradientHeader>
                    <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 whitespace-pre-line max-w-4xl mx-auto">
                      {content.tagline}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 w-full max-w-5xl mx-auto text-left">
                    {(content.services || []).map((service: { iconType: string; title: string; desc: string }, idx: number) => (
                      <div key={idx} className="flex gap-6 group p-6 rounded-2xl bg-[#0a0d12]/40 border border-white/5 backdrop-blur-md">
                        <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                          {getIcon(service.iconType)}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-base md:text-lg font-black text-white tracking-tight leading-tight uppercase">
                            {service.title}
                          </h4>
                          <p className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed">
                            {service.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-8">
                    <CtaButton href="#">{content.ctaText}</CtaButton>
                  </div>
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
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Tagline / Subheading</label>
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
                   <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Concierge Services</h2>
                   <Button 
                     onClick={() => updateContent("services", [...content.services, { iconType: "headphones", title: "New Service", desc: "Service description" }])}
                     className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg"
                   >
                     <PlusIcon className="size-3 mr-2" /> Add Service
                   </Button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {(content.services || []).map((service: { iconType: string; title: string; desc: string }, idx: number) => (
                     <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 relative group">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newServices = content.services.filter((_: unknown, i: number) => i !== idx)
                            updateContent("services", newServices)
                          }}
                          className="absolute top-4 right-4 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2Icon className="size-4" />
                        </Button>

                        <div className="space-y-4">
                          <div className="space-y-1">
                             <label className="text-[8px] font-black text-white/10 uppercase tracking-widest">Icon</label>
                             <select 
                               value={service.iconType} 
                               onChange={(e) => {
                                 const newServices = [...content.services]
                                 newServices[idx].iconType = e.target.value
                                 updateContent("services", newServices)
                               }}
                               className="w-full bg-black/40 border border-white/10 rounded-xl h-10 px-3 text-[10px] text-white uppercase font-black"
                             >
                               <option value="dumbbell">Dumbbell</option>
                               <option value="plane">Plane</option>
                               <option value="utensils">Utensils</option>
                               <option value="tv">TV</option>
                               <option value="piggybank">Piggy Bank</option>
                               <option value="headphones">Headphones</option>
                             </select>
                          </div>
                          <div className="space-y-1">
                             <label className="text-[8px] font-black text-white/10 uppercase tracking-widest">Title</label>
                             <Input
                               className="bg-black/40 border-white/10 text-white h-10 rounded-xl text-xs font-black uppercase"
                               value={service.title}
                               onChange={(e) => {
                                 const newServices = [...content.services]
                                 newServices[idx].title = e.target.value
                                 updateContent("services", newServices)
                               }}
                             />
                          </div>
                          <div className="space-y-1">
                             <label className="text-[8px] font-black text-white/10 uppercase tracking-widest">Description</label>
                             <textarea
                               className="w-full h-20 bg-black/40 border border-white/10 text-white rounded-xl p-3 text-xs focus:border-blue-500/50 outline-none transition-all resize-none"
                               value={service.desc}
                               onChange={(e) => {
                                 const newServices = [...content.services]
                                 newServices[idx].desc = e.target.value
                                 updateContent("services", newServices)
                               }}
                             />
                          </div>
                        </div>
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
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">CTA Button Text</label>
                  <Input
                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm font-bold uppercase tracking-widest"
                    value={content.ctaText}
                    onChange={(e) => updateContent("ctaText", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
