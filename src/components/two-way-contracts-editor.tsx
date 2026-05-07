"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, Settings2Icon, Trash2Icon, ImageIcon, ListIcon, BarChartIcon, GitMergeIcon } from "lucide-react"
import { PageData } from "@/types/cms"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"
import { GradientHeader } from "@/components/gradient-header"
import { CtaButton } from "@/components/cta-button"
import Image from "next/image"

interface TwoWayContractsEditorProps {
  slug?: string
  title?: string
}

export function TwoWayContractsEditor({ slug = "two-way-contracts", title = "Two-Way Contracts" }: TwoWayContractsEditorProps) {
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
            mainTitle: "NBA Two-Way Contracts \n 2025-26 / 2026-27: \n Rules, Salaries, and Fast Track",
            subDescription: "Two-Way Contract Rules, Salary & Strategy",
            backgroundImage: "/auraplayer.png",
            ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
            points: [
              { title: "What Is a Two-Way Contract?", items: ["Hybrid deal..."], image: "/baskatecoart.png" },
              { title: "2025-26 / 2026-27 Key Rules", items: ["Rule 1", "Rule 2", "Rule 3"] },
              { title: "Salary Breakdown 2025-26", items: ["$636,435", "2025-26 value"], stats: [{ label: "Higher NBA Days", value: "70" }, { label: "Daily Rate G League", value: "30" }] },
              { title: "How Conversions Work", items: ["Step 1", "Step 2", "Step 3"] },
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

  const updateCardTitle = (idx: number, val: string) => {
    setData(prev => {
        if(!prev) return null;
        const newPoints = [...(prev.content.points || [])];
        newPoints[idx] = { ...newPoints[idx], title: val };
        return { ...prev, content: { ...prev.content, points: newPoints } };
    })
  }

  const updateCardImage = (idx: number, val: string) => {
    setData(prev => {
        if(!prev) return null;
        const newPoints = [...(prev.content.points || [])];
        newPoints[idx] = { ...newPoints[idx], image: val };
        return { ...prev, content: { ...prev.content, points: newPoints } };
    })
  }

  const updateItem = (cardIdx: number, itemIdx: number, val: string) => {
    setData(prev => {
        if(!prev) return null;
        const newPoints = [...(prev.content.points || [])];
        const newItems = [...(newPoints[cardIdx].items || [])];
        newItems[itemIdx] = val;
        newPoints[cardIdx] = { ...newPoints[cardIdx], items: newItems };
        return { ...prev, content: { ...prev.content, points: newPoints } };
    })
  }

  const addItem = (cardIdx: number) => {
    setData(prev => {
        if(!prev) return null;
        const newPoints = [...(prev.content.points || [])];
        newPoints[cardIdx] = { ...newPoints[cardIdx], items: [...(newPoints[cardIdx].items || []), ""] };
        return { ...prev, content: { ...prev.content, points: newPoints } };
    })
  }

  const removeItem = (cardIdx: number, itemIdx: number) => {
    setData(prev => {
        if(!prev) return null;
        const newPoints = [...(prev.content.points || [])];
        newPoints[cardIdx].items = newPoints[cardIdx].items.filter((_, i) => i !== itemIdx);
        return { ...prev, content: { ...prev.content, points: newPoints } };
    })
  }

  const updateStat = (cardIdx: number, statIdx: number, field: 'label' | 'value', val: string) => {
    setData(prev => {
        if(!prev) return null;
        const newPoints = [...(prev.content.points || [])];
        const newStats = [...(newPoints[cardIdx].stats || [])];
        newStats[statIdx] = { ...newStats[statIdx], [field]: val };
        newPoints[cardIdx] = { ...newPoints[cardIdx], stats: newStats };
        return { ...prev, content: { ...prev.content, points: newPoints } };
    })
  }

  if (loading || !data) return <div className="flex items-center justify-center h-[60vh]"><Loader2Icon className="size-10 animate-spin text-blue-500" /></div>

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700 w-full max-w-full overflow-x-hidden">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-[#0a0d12]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-xl sticky top-4 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-inner">
            <Settings2Icon className="text-blue-500 size-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight italic">{data.title} <span className="text-blue-500 text-[10px] not-italic align-top ml-1">EDITOR</span></h1>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Full Page Live Preview & Control</p>
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
          {/* FULL PAGE VISUAL PREVIEW */}
          <div className="w-full rounded-[3rem] overflow-hidden border border-white/5 bg-black shadow-3xl">
            <div className="bg-white/5 px-8 py-3 flex items-center justify-center gap-3 border-b border-white/5">
              <div className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Full Page Preview</span>
            </div>
            
            <div className="relative pb-24 bg-[#05070a] overflow-hidden origin-top scale-[0.85] lg:scale-100">
              {/* Preview Hero */}
              <div className="relative pt-24 pb-16">
                <div className="absolute inset-0 z-0 h-[85vh]">
                  <Image src={data?.content?.backgroundImage || "/auraplayer.png"} alt="Bg" fill className="object-cover opacity-90 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-[#05070a]/40 to-[#05070a]" />
                </div>
                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                  <div className="space-y-8 max-w-5xl mx-auto text-center">
                    <GradientHeader tag="h1" size="lg" className="mb-4 text-center leading-tight">
                      {(data?.content?.mainTitle || "").split('\n').map((line: string, i: number) => (
                        <React.Fragment key={i}>{line}{i < (data?.content?.mainTitle || "").split('\n').length - 1 && <br />}</React.Fragment>
                      ))}
                    </GradientHeader>
                  </div>
                </div>
              </div>

              {/* Preview Grid */}
              <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary text-center mb-8">{data?.content?.subDescription}</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* P1 */}
                  <div className="glass-premium p-4 rounded-2xl border-primary/20 space-y-3">
                    <h3 className="text-xs font-black text-white uppercase tracking-wider">{data.content.points?.[0]?.title}</h3>
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                      <Image src={data.content.points?.[0]?.image || "/baskatecoart.png"} alt="Court" fill className="object-cover opacity-60" unoptimized />
                    </div>
                    <p className="text-[10px] text-white/70 leading-relaxed font-medium">{data.content.points?.[0]?.items?.[0]}</p>
                  </div>
                  {/* P2 */}
                  <div className="glass-premium p-4 rounded-2xl border-primary/20 space-y-4">
                    <h3 className="text-xs font-black text-white uppercase tracking-wider">{data.content.points?.[1]?.title}</h3>
                    <div className="space-y-2">
                      {data.content.points?.[1]?.items?.map((item: string, i: number) => (
                        <div key={i} className="flex gap-2 items-center">
                          <div className="size-5 rounded bg-primary/20 flex items-center justify-center text-primary text-[8px] font-black">{i+1}</div>
                          <span className="text-[9px] text-white/90 truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* P3 */}
                  <div className="glass-premium p-4 rounded-2xl border-primary/20 space-y-4">
                    <h3 className="text-xs font-black text-white uppercase tracking-wider">{data.content.points?.[2]?.title}</h3>
                    <div className="text-2xl font-black text-primary">{data.content.points?.[2]?.items?.[0]}</div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex border border-white/5">
                      <div className="h-full bg-primary" style={{ width: `${data.content.points?.[2]?.stats?.[0]?.value}%` }} />
                      <div className="h-full bg-blue-600" style={{ width: `${data.content.points?.[2]?.stats?.[1]?.value}%` }} />
                    </div>
                  </div>
                  {/* P4 */}
                  <div className="glass-premium p-4 rounded-2xl border-primary/20 space-y-4">
                    <h3 className="text-xs font-black text-white uppercase tracking-wider">{data.content.points?.[3]?.title}</h3>
                    <div className="space-y-2">
                      {data.content.points?.[3]?.items?.slice(0, 3).map((item: string, i: number) => (
                        <div key={i} className="bg-white/5 p-2 rounded-lg text-[8px] font-bold text-white/90 border border-white/10">{item}</div>
                      ))}
                    </div>
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
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
              <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Hero Content</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Main Heading (use \n for line breaks)</label>
                    <textarea
                      className="w-full h-32 bg-white/5 border border-white/10 text-white rounded-2xl p-4 text-sm focus:border-blue-500/50 outline-none transition-all resize-none font-bold"
                      value={data?.content?.mainTitle || ""}
                      onChange={(e) => updateContent("mainTitle", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Sub-Description / Tagline</label>
                    <Input
                      className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm"
                      value={data?.content?.subDescription || ""}
                      onChange={(e) => updateContent("subDescription", e.target.value)}
                    />
                  </div>
                </div>
                <ImageUpload
                  label="Hero Background Image"
                  value={data?.content?.backgroundImage || ""}
                  onChange={(v) => updateContent("backgroundImage", v)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                  <div className="flex items-center gap-3 text-blue-500">
                     <ImageIcon className="size-5" />
                     <h2 className="text-lg font-black uppercase italic text-white">Card 1: Definition</h2>
                  </div>
                  <div className="space-y-4">
                     <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl font-bold uppercase" value={data.content.points?.[0]?.title} onChange={(e) => updateCardTitle(0, e.target.value)} placeholder="Title" />
                     <ImageUpload label="Card Visual" value={data.content.points?.[0]?.image || ""} onChange={(v) => updateCardImage(0, v)} />
                     <textarea className="w-full h-24 bg-white/5 border border-white/10 text-white rounded-xl p-4 text-sm" value={data.content.points?.[0]?.items?.[0]} onChange={(e) => updateItem(0, 0, e.target.value)} placeholder="Description text..." />
                  </div>
               </div>

               <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3 text-blue-500">
                        <ListIcon className="size-5" />
                        <h2 className="text-lg font-black uppercase italic text-white">Card 2: Rules</h2>
                     </div>
                     <Button onClick={() => addItem(1)} size="sm" className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg">Add Rule</Button>
                  </div>
                  <div className="space-y-4">
                     <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl font-bold uppercase" value={data.content.points?.[1]?.title} onChange={(e) => updateCardTitle(1, e.target.value)} placeholder="Title" />
                     <div className="space-y-3">
                        {data.content.points?.[1]?.items?.map((item: string, i: number) => (
                          <div key={i} className="flex gap-2 group">
                             <div className="size-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-black text-blue-500 text-xs">{i+1}</div>
                             <textarea className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl p-3 text-sm h-20" value={item} onChange={(e) => updateItem(1, i, e.target.value)} />
                             <Button onClick={() => removeItem(1, i)} variant="ghost" size="icon" className="text-red-500/40 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2Icon className="size-4" /></Button>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                  <div className="flex items-center gap-3 text-blue-500">
                     <BarChartIcon className="size-5" />
                     <h2 className="text-lg font-black uppercase italic text-white">Card 3: Salary & Stats</h2>
                  </div>
                  <div className="space-y-4">
                     <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl font-bold uppercase" value={data.content.points?.[2]?.title} onChange={(e) => updateCardTitle(2, e.target.value)} placeholder="Title" />
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-white/20 uppercase">Salary Amount</label>
                          <Input className="bg-white/5 border-white/10 text-white h-12" value={data.content.points?.[2]?.items?.[0]} onChange={(e) => updateItem(2, 0, e.target.value)} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-white/20 uppercase">Sub-text Label</label>
                          <Input className="bg-white/5 border-white/10 text-white h-12" value={data.content.points?.[2]?.items?.[1]} onChange={(e) => updateItem(2, 1, e.target.value)} />
                        </div>
                     </div>
                     <div className="pt-4 grid grid-cols-2 gap-4 border-t border-white/5 mt-4">
                        <div className="space-y-2">
                           <Input className="bg-white/5 border-white/10 text-white" value={data.content.points?.[2]?.stats?.[0]?.label} onChange={(e) => updateStat(2, 0, 'label', e.target.value)} placeholder="NBA Label" />
                           <Input type="number" className="bg-white/5 border-white/10 text-white" value={data.content.points?.[2]?.stats?.[0]?.value} onChange={(e) => updateStat(2, 0, 'value', e.target.value)} placeholder="Value %" />
                        </div>
                        <div className="space-y-2">
                           <Input className="bg-white/5 border-white/10 text-white" value={data.content.points?.[2]?.stats?.[1]?.label} onChange={(e) => updateStat(2, 1, 'label', e.target.value)} placeholder="G League Label" />
                           <Input type="number" className="bg-white/5 border-white/10 text-white" value={data.content.points?.[2]?.stats?.[1]?.value} onChange={(e) => updateStat(2, 1, 'value', e.target.value)} placeholder="Value %" />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3 text-blue-500">
                        <GitMergeIcon className="size-5" />
                        <h2 className="text-lg font-black uppercase italic text-white">Card 4: Steps</h2>
                     </div>
                     <Button onClick={() => addItem(3)} size="sm" className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg">Add Step</Button>
                  </div>
                  <div className="space-y-4">
                     <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl font-bold uppercase" value={data.content.points?.[3]?.title} onChange={(e) => updateCardTitle(3, e.target.value)} placeholder="Title" />
                     <div className="space-y-3">
                        {data.content.points?.[3]?.items?.map((item: string, i: number) => (
                          <div key={i} className="flex gap-2 group">
                             <div className="size-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center font-black text-blue-500 text-xs">↓</div>
                             <textarea className="flex-1 bg-white/5 border border-white/10 text-white rounded-xl p-3 text-sm h-16" value={item} onChange={(e) => updateItem(3, i, e.target.value)} />
                             <Button onClick={() => removeItem(3, i)} variant="ghost" size="icon" className="text-red-500/40 hover:text-red-500 opacity-0 group-hover:opacity-100"><Trash2Icon className="size-4" /></Button>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
              <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">CTA Section</h2>
              <Input
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm font-bold uppercase tracking-widest"
                value={data?.content?.ctaText || ""}
                onChange={(e) => updateContent("ctaText", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
