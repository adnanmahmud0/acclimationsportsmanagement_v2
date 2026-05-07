"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, Trash2Icon, ListIcon, GitMergeIcon, LayoutIcon } from "lucide-react"
import { PageData } from "@/types/cms"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"
import { GradientHeader } from "@/components/gradient-header"
import { CtaButton } from "@/components/cta-button"
import Image from "next/image"

export function NbaPlayersEditor() {
  const slug = "nba-players"
  const title = "Active NBA Players"
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
            mainTitle: "Active NBA Players",
            subDescription: "Maximize Your Off-Court Value | and Build Real Wealth",
            description: "Your on-court talent opens doors. We turn that into serious money through world-class endorsements, smart branding, and strategic opportunities.",
            ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
            backgroundImage: "/ground.png",
            points: [
              { title: "Comprehensive audit of current contract & market standing.", items: [] },
              { title: "Proprietary salary cap modeling & leverage mapping.", items: [] },
              { title: "Aggressive negotiation and brand development.", items: [] },
              { title: "Full holistic concierge & wealth architecture.", items: [] },
            ],
            stats: [
              { label: "Direct connections to world-class brands and sponsors.", value: "1" },
              { label: "Proprietary tools to accurately value and maximize your endorsement deals.", value: "2" },
              { label: "Booking high-profile podcast appearances and media opportunities.", value: "3" },
              { label: "Professional publishing and promotion of your advanced statistics online.", value: "4" },
              { label: "Expert negotiation for your next contract extension.", value: "5" },
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

  const updateStat = (idx: number, val: string) => {
    setData(prev => {
      if (!prev) return null
      const newStats = [...(prev.content.stats || [])]
      newStats[idx] = { ...newStats[idx], label: val }
      return { ...prev, content: { ...prev.content, stats: newStats } }
    })
  }

  const addStat = () => {
    setData(prev => {
      if (!prev) return null
      const currentStats = prev.content.stats || []
      return { ...prev, content: { ...prev.content, stats: [...currentStats, { label: "New Connection", value: (currentStats.length + 1).toString() }] } }
    })
  }

  const removeStat = (idx: number) => {
    setData(prev => {
      if (!prev) return null
      const newStats = prev.content.stats?.filter((_, i) => i !== idx).map((s, i) => ({ ...s, value: (i + 1).toString() })) || []
      return { ...prev, content: { ...prev.content, stats: newStats } }
    })
  }

  const updatePoint = (idx: number, val: string) => {
    setData(prev => {
      if (!prev) return null
      const newPoints = [...(prev.content.points || [])]
      newPoints[idx] = { ...newPoints[idx], title: val }
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
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Full Page Live Preview & Timeline Control</p>
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
              {/* Preview Hero */}
              <div className="relative pt-32 pb-16 flex flex-col items-center text-center">
                <div className="absolute inset-0 z-0">
                  <Image src={data?.content?.backgroundImage || "/ground.png"} alt="Bg" fill className="object-cover opacity-80" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-[#05070a]/40 to-[#05070a]" />
                </div>
                <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                  <GradientHeader tag="h1" size="lg" className="mb-4">{data.content.mainTitle}</GradientHeader>
                  <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-8 leading-relaxed">
                    {data.content.subDescription?.includes('|') ? (
                      <>
                        {data.content.subDescription.split('|')[0]} <br />
                        <span className="text-primary">{data.content.subDescription.split('|')[1]}</span>
                      </>
                    ) : (
                      data.content.subDescription
                    )}
                  </h2>
                  <p className="text-sm text-white/60 max-w-3xl mx-auto leading-relaxed">{data.content.description}</p>
                </div>
              </div>

              {/* Preview Timeline */}
              <div className="container mx-auto px-6 relative z-10 pt-12 pb-24">
                <div className="flex items-center justify-center gap-4 text-primary mb-16">
                  <div className="h-[1px] w-8 bg-primary/30" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">What We Provide</span>
                  <div className="h-[1px] w-8 bg-primary/30" />
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {(data.content.stats || []).map((s, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 text-center">
                       <div className="size-10 rounded-full border border-primary/40 bg-black flex items-center justify-center text-xs font-black text-white">{s.value}</div>
                       <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest leading-relaxed">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-12">
                   <CtaButton href="#">{data.content.ctaText}</CtaButton>
                </div>

                {/* Transition Copy Preview */}
                <div className="container mx-auto px-6 relative z-10 pt-24 pb-12 text-center space-y-8">
                  <h2 className="text-xl md:text-3xl font-black text-white leading-tight uppercase tracking-tight">
                    {(data.content.transitionTitle || "Advanced Contract Architecture & \n Strategic Career Management").split('\n').map((line, i) => (
                      <React.Fragment key={i}>{line}{i < (data.content.transitionTitle || "").split('\n').length - 1 && <br />}</React.Fragment>
                    ))}
                  </h2>
                  <p className="text-sm md:text-lg text-white/50 font-medium leading-relaxed max-w-3xl mx-auto">
                    {data.content.transitionDescription || "For the veteran or rising star, we provide litigation-grade representation, proprietary market analysis, and a holistic concierge system that handles everything off the court so you can dominate on it."}
                  </p>
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

            {/* Timeline Editor */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-blue-500">
                     <ListIcon className="size-5" />
                     <h2 className="text-lg font-black uppercase italic text-white">What We Provide Timeline</h2>
                  </div>
                  <Button onClick={addStat} size="sm" className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg">Add Connection</Button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(data.content.stats || []).map((s, i) => (
                    <div key={i} className="flex gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 group">
                       <div className="size-10 shrink-0 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center font-black text-blue-500">{s.value}</div>
                       <textarea className="flex-1 bg-transparent border-none text-white text-xs font-bold uppercase tracking-widest resize-none focus:ring-0" value={s.label} onChange={(e) => updateStat(i, e.target.value)} />
                       <Button onClick={() => removeStat(i)} variant="ghost" size="icon" className="text-red-500/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2Icon /></Button>
                    </div>
                  ))}
               </div>
            </div>

            {/* Steps Editor */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
               <div className="flex items-center gap-3 text-blue-500">
                  <GitMergeIcon className="size-5" />
                  <h2 className="text-lg font-black uppercase italic text-white">Advanced Architecture Steps</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(data.content.points || []).map((p, i) => (
                    <div key={i} className="space-y-2">
                       <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Step 0{i+1}</label>
                       <textarea className="w-full h-20 bg-white/5 border border-white/10 text-white rounded-xl p-4 text-xs font-black uppercase tracking-widest" value={p.title} onChange={(e) => updatePoint(i, e.target.value)} />
                    </div>
                  ))}
               </div>
            </div>

            {/* Transition Copy Section */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
               <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Section 4: Transition Content</h2>
               <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Transition Title (Use \n for line breaks)</label>
                    <textarea 
                      className="w-full h-24 bg-white/5 border border-white/10 text-white rounded-xl p-4 text-sm font-bold resize-none" 
                      value={data.content.transitionTitle || "Advanced Contract Architecture & \n Strategic Career Management"} 
                      onChange={(e) => updateContent("transitionTitle", e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Transition Description</label>
                    <textarea 
                      className="w-full h-32 bg-white/5 border border-white/10 text-white rounded-xl p-4 text-sm font-medium resize-none" 
                      value={data.content.transitionDescription || "For the veteran or rising star, we provide litigation-grade representation, proprietary market analysis, and a holistic concierge system that handles everything off the court so you can dominate on it."} 
                      onChange={(e) => updateContent("transitionDescription", e.target.value)} 
                    />
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
