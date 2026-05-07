"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, Trash2Icon, LayoutIcon, BarChartIcon } from "lucide-react"
import { PageData } from "@/types/cms"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"
import { GradientHeader } from "@/components/gradient-header"
import { CtaButton } from "@/components/cta-button"
import Image from "next/image"

export function GLeagueEliteEditor() {
  const slug = "g-league-elite"
  const title = "G League Elite"
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
            mainTitle: "NBA G League 2025-26: \n Rules, Salaries, and the Fast Track",
            ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
            backgroundImage: "/analitic.png",
            stats: [
              { label: "Teams", value: "31" },
              { label: "Games", value: "50+" },
              { label: "Tip-Off", value: "Tournament" },
              { label: "Active Roster", value: "12-13" },
              { label: "Standard Salary", value: "$45,000" },
            ],
            points: [
              { title: "What Is the NBA G League?", items: ["The official developmental league of the NBA."] },
              { title: "2025-26 Key Rules & Roster", items: ["31 Teams", "50+ Game Season", "Active Roster: 12-13"] },
              { title: "Salaries Breakdown 2025-26", items: ["$45,000", "+ Standard Player Salary: $45,000"] },
              { title: "Lead to the NBA", items: ["Strong performance", "Call-ups", "Two-Way conversions"] }
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

  const updateStat = (idx: number, field: 'label' | 'value', val: string) => {
    setData(prev => {
      if (!prev) return null
      const newStats = [...(prev.content.stats || [])]
      newStats[idx] = { ...newStats[idx], [field]: val }
      return { ...prev, content: { ...prev.content, stats: newStats } }
    })
  }

  const addStat = () => {
    setData(prev => {
      if (!prev) return null
      const newStats = [...(prev.content.stats || []), { label: "New Stat", value: "0" }]
      return { ...prev, content: { ...prev.content, stats: newStats } }
    })
  }

  const removeStat = (idx: number) => {
    setData(prev => {
      if (!prev) return null
      const newStats = (prev.content.stats || []).filter((_, i) => i !== idx)
      return { ...prev, content: { ...prev.content, stats: newStats } }
    })
  }

  const updatePointTitle = (idx: number, val: string) => {
    setData(prev => {
      if (!prev) return null
      const newPoints = [...(prev.content.points || [])]
      newPoints[idx] = { ...newPoints[idx], title: val }
      return { ...prev, content: { ...prev.content, points: newPoints } }
    })
  }

  const updatePointItem = (cardIdx: number, itemIdx: number, val: string) => {
    setData(prev => {
      if (!prev) return null
      const newPoints = [...(prev.content.points || [])]
      const newItems = [...(newPoints[cardIdx].items || [])]
      newItems[itemIdx] = val
      newPoints[cardIdx] = { ...newPoints[cardIdx], items: newItems }
      return { ...prev, content: { ...prev.content, points: newPoints } }
    })
  }

  const addPointItem = (cardIdx: number) => {
    setData(prev => {
      if (!prev) return null
      const newPoints = [...(prev.content.points || [])]
      newPoints[cardIdx].items = [...(newPoints[cardIdx].items || []), ""]
      return { ...prev, content: { ...prev.content, points: newPoints } }
    })
  }

  const removePointItem = (cardIdx: number, itemIdx: number) => {
    setData(prev => {
      if (!prev) return null
      const newPoints = [...(prev.content.points || [])]
      newPoints[cardIdx].items = newPoints[cardIdx].items.filter((_, i) => i !== itemIdx)
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
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Full Page Live Preview & G-League Controls</p>
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
              {/* Preview Hero */}
              <div className="relative pt-32 pb-16 flex flex-col items-center text-center">
                <div className="absolute inset-0 z-0">
                  <Image src={data?.content?.backgroundImage || "/analitic.png"} alt="Bg" fill className="object-cover opacity-90" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-[#05070a]/40 to-[#05070a]" />
                </div>
                <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                  <GradientHeader tag="h1" size="lg">
                    {(data.content.mainTitle || "").split('\n').map((line, i) => (
                      <React.Fragment key={i}>{line}{i < (data.content.mainTitle || "").split('\n').length - 1 && <br />}</React.Fragment>
                    ))}
                  </GradientHeader>
                </div>
              </div>

              {/* Preview Stats Bar */}
              <div className="container mx-auto px-6 relative z-10 -mt-12 mb-12">
                 <div className="glass-premium rounded-2xl md:rounded-full px-8 py-4 flex flex-wrap justify-between items-center gap-4 border-primary/20 bg-[#0a0d12]/60">
                    <div className="flex flex-col">
                       <span className="text-[8px] font-black text-primary uppercase">2025-26</span>
                       <span className="text-xs font-bold text-white uppercase">Season At A Glance</span>
                    </div>
                    {data.content.stats?.map((s, i) => (
                      <div key={i} className="flex flex-col items-center">
                         <span className="text-sm font-black text-white">{s.value}</span>
                         <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{s.label}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Preview Grid */}
              <div className="container mx-auto px-6 relative z-10 grid grid-cols-4 gap-4 pb-12">
                 {/* Card 1 */}
                 <div className="glass-premium p-4 rounded-2xl border-primary/20 space-y-3">
                    <h3 className="text-[10px] font-black text-white uppercase">{data.content.points?.[0]?.title}</h3>
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center gap-3">
                       <div className="size-6 rounded bg-primary/20 text-primary text-[8px] font-black flex items-center justify-center">NBA</div>
                       <div className="size-6 rounded bg-purple-500/20 text-purple-500 text-[8px] font-black flex items-center justify-center">G</div>
                    </div>
                    <p className="text-[8px] text-white/60 leading-relaxed">{data.content.points?.[0]?.items?.[0]}</p>
                 </div>
                 {/* Card 2 */}
                 <div className="glass-premium p-4 rounded-2xl border-primary/20 space-y-3">
                    <h3 className="text-[10px] font-black text-white uppercase">{data.content.points?.[1]?.title}</h3>
                    <ul className="space-y-1">
                       {data.content.points?.[1]?.items?.slice(0, 3).map((item, i) => (
                         <li key={i} className="flex gap-2 items-center text-[8px] text-white/80"><div className="size-1 rounded-full bg-primary" />{item}</li>
                       ))}
                    </ul>
                 </div>
                 {/* Card 3 */}
                 <div className="glass-premium p-4 rounded-2xl border-primary/20 space-y-3">
                    <h3 className="text-[10px] font-black text-white uppercase">{data.content.points?.[2]?.title}</h3>
                    <div className="text-2xl font-black text-primary">{data.content.points?.[2]?.items?.[0]}</div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex border border-white/5">
                       <div className="h-full bg-primary w-[40%]" />
                    </div>
                 </div>
                 {/* Card 4 */}
                 <div className="glass-premium p-4 rounded-2xl border-primary/20 space-y-3">
                    <h3 className="text-[10px] font-black text-white uppercase">{data.content.points?.[3]?.title}</h3>
                    <div className="space-y-1">
                       {data.content.points?.[3]?.items?.slice(0, 3).map((item, i) => (
                         <div key={i} className="bg-white/5 p-1 rounded-md text-[7px] text-white/80 border border-white/5">{item}</div>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="flex justify-center mb-12">
                 <CtaButton href="#">{data.content.ctaText}</CtaButton>
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
                </div>
                <ImageUpload label="Hero Background" value={data.content.backgroundImage || ""} onChange={(v) => updateContent("backgroundImage", v)} />
              </div>
            </div>

            {/* Stats Bar Editor */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-blue-500">
                     <BarChartIcon className="size-5" />
                     <h2 className="text-lg font-black uppercase italic text-white">Season At A Glance (Stats Bar)</h2>
                  </div>
                  <Button onClick={addStat} size="sm" className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg">Add Stat</Button>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {data.content.stats?.map((s, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2 relative group/stat-item">
                       <Button onClick={() => removeStat(i)} variant="ghost" size="icon" className="absolute -top-2 -right-2 text-red-500 opacity-0 group-hover/stat-item:opacity-100 transition-opacity bg-[#0a0d12] border border-white/10 size-6 rounded-full z-10 scale-75">
                         <Trash2Icon className="size-3" />
                       </Button>
                       <Input className="bg-black/40 border-white/10 text-white h-10 rounded-lg text-sm font-black text-center" value={s.value} onChange={(e) => updateStat(i, 'value', e.target.value)} />
                       <Input className="bg-transparent border-none text-white text-[10px] font-bold uppercase tracking-widest text-center focus:ring-0" value={s.label} onChange={(e) => updateStat(i, 'label', e.target.value)} />
                    </div>
                  ))}
               </div>
            </div>

            {/* 4 Cards Editor */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {data.content.points?.map((p, i) => (
                 <div key={i} className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                    <div className="flex items-center justify-between">
                       <h3 className="text-lg font-black uppercase italic text-white">Card {i+1}</h3>
                       <Button onClick={() => addPointItem(i)} size="sm" className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg">Add Item</Button>
                    </div>
                    <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl font-bold uppercase" value={p.title} onChange={(e) => updatePointTitle(i, e.target.value)} placeholder="Title" />
                    <div className="space-y-3">
                       {p.items?.map((item, j) => (
                         <div key={j} className="flex gap-2 group">
                            <textarea className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl p-3 text-[10px] font-bold uppercase tracking-widest resize-none h-16" value={item} onChange={(e) => updatePointItem(i, j, e.target.value)} />
                            <Button onClick={() => removePointItem(i, j)} variant="ghost" size="icon" className="text-red-500/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2Icon /></Button>
                         </div>
                       ))}
                    </div>
                 </div>
               ))}
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
