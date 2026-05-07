"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, ListIcon, GitMergeIcon, LayoutIcon, CheckCircle2 } from "lucide-react"
import { PageData } from "@/types/cms"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"
import { GradientHeader } from "@/components/gradient-header"
import Image from "next/image"

export function HighSchoolTalentEditor() {
  const slug = "high-school-talent"
  const title = "Elite High School Talent"
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
            mainTitle: "From Elite High School to the NBA \n Start Building Your Professional Future Now",
            subDescription: "The Path to the Pros Begins Here",
            description: "Join the exclusive network of elite prospects who secured multi-million dollar NIL deals and direct NBA pathways before graduation. Our proprietary system turns high school talent into professional assets.",
            ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
            backgroundImage: "/player.png",
            tagline: "Acclimation Edge",
            points: [
              { title: "Early Representation Advantage", items: ["Secure multi-million dollar NIL deals before your peers even start their recruitment process."] },
              { title: "Direct NBA Pathway", items: ["Strategic connections to NBA scouts, front offices, and elite veteran agents."] },
              { title: "Proprietary Valuation", items: ["Maximize your market value with our exclusive NIL-to-NBA valuation algorithm."] },
              { title: "Family-Centric Strategy", items: ["Comprehensive guidance and concierge support for you and your entire family circle."] },
            ],
            stats: [
              { label: "Guaranteed Scout Introductions", value: "" },
              { label: "Exclusive NIL Contract Review", value: "" },
              { label: "24/7 Strategy & Concierge Support", value: "" },
              { label: "Elite Media & Interview Training", value: "" },
              { label: "College-to-Pro Multi-Year Transition", value: "" },
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

  const updatePoint = (idx: number, field: 'title' | 'desc', val: string) => {
    setData(prev => {
      if (!prev) return null
      const newPoints = [...(prev.content.points || [])]
      if (field === 'title') newPoints[idx] = { ...newPoints[idx], title: val }
      else newPoints[idx] = { ...newPoints[idx], items: [val] }
      return { ...prev, content: { ...prev.content, points: newPoints } }
    })
  }

  const updateBenefit = (idx: number, val: string) => {
    setData(prev => {
      if (!prev) return null
      const newStats = [...(prev.content.stats || [])]
      newStats[idx] = { ...newStats[idx], label: val }
      return { ...prev, content: { ...prev.content, stats: newStats } }
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
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Full Page Live Preview & Prospect Controls</p>
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
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Live Page Preview</span>
            </div>
            
            <div className="relative pb-24 bg-[#05070a] overflow-hidden origin-top scale-[0.85] lg:scale-100">
              {/* Preview Content */}
              <div className="relative pt-32 pb-16 flex flex-col items-center text-center">
                <div className="absolute inset-0 z-0">
                  <Image src={data?.content?.backgroundImage || "/player.png"} alt="Bg" fill className="object-cover opacity-80" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-[#05070a]/50 to-[#05070a]" />
                </div>
                <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                  <GradientHeader tag="h1" size="lg" className="mb-4">
                    {(data.content.mainTitle || "").split('\n').map((line: string, i: number) => (
                      <React.Fragment key={i}>{line}{i < (data.content.mainTitle || "").split('\n').length - 1 && <br />}</React.Fragment>
                    ))}
                  </GradientHeader>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">{data.content.subDescription}</p>
                  <p className="text-sm text-white/60 max-w-3xl mx-auto leading-relaxed">{data.content.description}</p>
                </div>
              </div>

              {/* Preview Grid Section */}
              <div className="container mx-auto px-6 relative z-10 grid grid-cols-2 gap-8 pt-12 pb-24">
                 <div className="space-y-8 text-left">
                    <div className="flex items-center gap-2 text-primary">
                       <div className="h-[1px] w-6 bg-primary/40" />
                       <span className="text-[8px] font-black uppercase tracking-[0.4em]">{data.content.tagline}</span>
                    </div>
                    <h2 className="text-sm font-black text-white uppercase italic leading-tight">
                        {(data.content.sectionTitle || "Why Elite Prospects \n Choose Acclimation").split('\n').map((line: string, i: number) => (
                          <React.Fragment key={i}>{line}{i < (data.content.sectionTitle || "").split('\n').length - 1 && <br />}</React.Fragment>
                        ))}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                       {data.content.points?.map((p, i) => (
                         <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-2">
                            <div className="flex items-center gap-2">
                               <CheckCircle2 className="size-3 text-primary" />
                               <span className="text-[10px] font-black text-white uppercase tracking-widest">{p.title}</span>
                            </div>
                            <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{p.items?.[0]}</p>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] space-y-6">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Key Benefits</h3>
                    <ul className="space-y-3">
                       {data.content.stats?.map((b, i) => (
                         <li key={i} className="flex items-center gap-3 text-[10px] font-bold text-white/60 uppercase tracking-widest border-b border-white/5 pb-3 last:border-0">{b.label}</li>
                       ))}
                    </ul>
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
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Main Heading (use \n for line breaks)</label>
                    <textarea className="w-full h-32 bg-white/5 border border-white/10 text-white rounded-2xl p-4 text-sm font-bold resize-none" value={data.content.mainTitle} onChange={(e) => updateContent("mainTitle", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Sub-Heading / Tagline</label>
                    <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm" value={data.content.subDescription} onChange={(e) => updateContent("subDescription", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Section Tagline (e.g. Acclimation Edge)</label>
                    <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm font-bold uppercase tracking-widest" value={data.content.tagline || ""} onChange={(e) => updateContent("tagline", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Section Title</label>
                    <textarea className="w-full h-24 bg-white/5 border border-white/10 text-white rounded-xl p-4 text-sm font-bold resize-none" value={data.content.sectionTitle || "Why Elite Prospects \n Choose Acclimation"} onChange={(e) => updateContent("sectionTitle", e.target.value)} />
                  </div>
                </div>
                <ImageUpload label="Hero Background" value={data.content.backgroundImage || ""} onChange={(v) => updateContent("backgroundImage", v)} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Points Editor */}
               <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                  <div className="flex items-center gap-3 text-blue-500">
                     <ListIcon className="size-5" />
                     <h2 className="text-lg font-black uppercase italic text-white">Why Choose Cards</h2>
                  </div>
                  <div className="space-y-6">
                     {data.content.points?.map((p, i) => (
                       <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                          <Input className="bg-black/40 border-white/10 text-white h-10 rounded-lg text-[10px] font-black uppercase tracking-widest" value={p.title} onChange={(e) => updatePoint(i, 'title', e.target.value)} />
                          <textarea className="w-full h-20 bg-black/40 border border-white/10 text-white rounded-lg p-3 text-[10px] font-bold uppercase tracking-widest resize-none" value={p.items?.[0]} onChange={(e) => updatePoint(i, 'desc', e.target.value)} />
                       </div>
                     ))}
                  </div>
               </div>

               {/* Benefits Editor */}
               <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                  <div className="flex items-center gap-3 text-blue-500">
                     <GitMergeIcon className="size-5" />
                     <h2 className="text-lg font-black uppercase italic text-white">Key Benefits List</h2>
                  </div>
                  <div className="space-y-3">
                     {data.content.stats?.map((b, i) => (
                       <div key={i} className="flex gap-2">
                          <div className="size-10 shrink-0 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500"><CheckCircle2 className="size-4" /></div>
                          <Input className="bg-white/5 border-white/10 text-white h-10 rounded-xl text-[10px] font-black uppercase tracking-widest" value={b.label} onChange={(e) => updateBenefit(i, e.target.value)} />
                       </div>
                     ))}
                  </div>
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
