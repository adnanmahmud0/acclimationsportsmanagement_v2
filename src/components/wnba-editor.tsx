"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, Trash2Icon, ListIcon, LayoutIcon, PlusIcon } from "lucide-react"
import { PageData } from "@/types/cms"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"
import { GradientHeader } from "@/components/gradient-header"
import { CtaButton } from "@/components/cta-button"
import Image from "next/image"

export function WnbaEditor() {
  const slug = "wnba"
  const title = "WNBA"
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
            mainTitle: "WNBA",
            subDescription: "Capitalize on the Historic New CBA | Maximize Your Earnings Now",
            description: "The new 7-year WNBA CBA (2026–2032) explodes salaries: salary cap jumps to $7M in 2026, average pay rises to $583K, and max contracts reach $1.4M+.",
            ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
            backgroundImage: "/wnba_player.png",
            points: [
              { title: "Expert negotiation under the new CBA", items: [] },
              { title: "High-value endorsement & brand deals", items: [] },
              { title: "Podcast appearances and media opportunities", items: [] },
              { title: "Personal brand development", items: [] },
              { title: "Full holistic concierge support", items: [] },
            ]
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

  const updateContent = (field: string, value: unknown) => {
    setData(prev => prev ? ({ ...prev, content: { ...prev.content, [field]: value } }) : null)
  }

  const updatePoint = (idx: number, val: string) => {
    setData(prev => {
      if (!prev) return null
      const newPoints = [...(prev.content.points || [])]
      newPoints[idx] = { ...newPoints[idx], title: val }
      return { ...prev, content: { ...prev.content, points: newPoints } }
    })
  }

  const addPoint = () => {
    setData(prev => {
      if (!prev) return null
      const currentPoints = prev.content.points || []
      return { ...prev, content: { ...prev.content, points: [...currentPoints, { title: "New Service Point", items: [] }] } }
    })
  }

  const removePoint = (idx: number) => {
    setData(prev => {
      if (!prev) return null
      const newPoints = prev.content.points?.filter((_, i) => i !== idx) || []
      return { ...prev, content: { ...prev.content, points: newPoints } }
    })
  }

  if (loading || !data) return <div className="flex items-center justify-center h-[60vh]"><Loader2Icon className="size-10 animate-spin text-blue-500" /></div>

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
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Full Page Live Preview & WNBA Controls</p>
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
            
            <div className="relative pb-24 bg-[#05070a] overflow-hidden origin-top scale-[0.85] lg:scale-100">
              {/* Preview Content */}
              <div className="relative pt-32 pb-16 flex flex-col items-center text-center">
                <div className="absolute inset-0 z-0">
                  <Image src={data?.content?.backgroundImage || "/wnba_player.png"} alt="Bg" fill className="object-cover opacity-80" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/90 via-transparent to-[#05070a]" />
                </div>
                <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                  <GradientHeader tag="h1" size="lg" className="mb-4">{data.content.mainTitle}</GradientHeader>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-8 leading-relaxed">
                    {data.content.subDescription?.includes('|') ? (
                      <>
                        {data.content.subDescription.split('|')[0]} <br />
                        <span className="text-primary">{data.content.subDescription.split('|')[1]}</span>
                      </>
                    ) : (
                      data.content.subDescription
                    )}
                  </h2>
                  <p className="text-sm text-white/80 max-w-4xl mx-auto leading-relaxed">{data.content.description}</p>
                </div>
              </div>

              {/* Preview Main Card */}
              <div className="container mx-auto px-6 relative z-10 pb-24">
                <div className="relative group max-w-2xl mx-auto">
                   <div className="absolute -inset-[1px] bg-gradient-to-r from-[#00d2ff] via-purple-500 to-primary rounded-[2rem] opacity-70" />
                   <div className="relative bg-[#0a0d12]/90 p-8 rounded-[2rem] space-y-6">
                      <h3 className="text-lg font-black text-white uppercase">What We Provide:</h3>
                      <ul className="space-y-3">
                         {data.content.points?.map((p, i) => (
                           <li key={i} className="flex items-center gap-3 text-white/90 text-left">
                              <div className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,210,255,0.5)] flex-shrink-0" />
                              <span className="text-xs font-medium tracking-tight leading-snug">{p.title}</span>
                           </li>
                         ))}
                      </ul>
                   </div>
                </div>
                <div className="flex justify-center mt-12">
                   <CtaButton href="#">{data.content.ctaText}</CtaButton>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-12">
            {/* Hero & Basics */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Section 1: Hero & Background</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Main Heading</label>
                    <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl font-bold" value={data.content.mainTitle} onChange={(e) => updateContent("mainTitle", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Sub-Heading (Use | for blue text)</label>
                    <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl font-medium" value={data.content.subDescription} onChange={(e) => updateContent("subDescription", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Description Paragraph</label>
                    <textarea className="w-full h-32 bg-white/5 border border-white/10 text-white rounded-2xl p-4 text-sm resize-none" value={data.content.description} onChange={(e) => updateContent("description", e.target.value)} />
                  </div>
                </div>
                <ImageUpload label="Hero Background" value={data.content.backgroundImage || ""} onChange={(v) => updateContent("backgroundImage", v)} />
              </div>
            </div>

            {/* Service Points Editor */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-blue-500">
                     <ListIcon className="size-5" />
                     <h2 className="text-lg font-black uppercase italic text-white">What We Provide (Service Points)</h2>
                  </div>
                  <Button onClick={addPoint} size="sm" className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg"><PlusIcon className="size-3 mr-2" /> Add Point</Button>
               </div>
               <div className="grid grid-cols-1 gap-4">
                  {data.content.points?.map((p, i) => (
                    <div key={i} className="flex gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 group">
                       <div className="size-10 shrink-0 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center font-black text-blue-500">•</div>
                       <Input className="flex-1 bg-transparent border-none text-white text-xs font-bold uppercase tracking-widest focus:ring-0" value={p.title} onChange={(e) => updatePoint(i, e.target.value)} />
                       <Button onClick={() => removePoint(i)} variant="ghost" size="icon" className="text-red-500/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2Icon /></Button>
                    </div>
                  ))}
               </div>
            </div>

            {/* CTA */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-4">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">CTA Button Text</label>
              <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm font-bold uppercase tracking-widest" value={data.content.ctaText} onChange={(e) => updateContent("ctaText", e.target.value)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
