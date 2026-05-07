"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, LayoutIcon, ActivityIcon, BarChart3Icon, ZapIcon, Settings2Icon } from "lucide-react"
import { PageData, PageContent, SalaryCapData } from "@/types/cms"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"
import { GradientHeader } from "@/components/gradient-header"
import Image from "next/image"

export function SalaryCapEditor() {
  const slug = "salary-cap"
  const title = "Salary Cap Analytics"
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
            salaryCap: {
              title: "Proprietary Salary Cap & \n Strategic Analytics Engine",
              subtitle: "We leverage sophisticated modeling to maximize your next contract. \n Don't leave your earnings to chance.",
              engineTitle: "The Acclimation Engine",
              ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
              backgroundImage: "/graph.png",
              cardTitles: [
                "Live Salary Cap Forecasting",
                "Luxury Tax Stress Testing",
                "Endorsement & NIL Valuation",
                "Contract Optimization Simulator"
              ],
              points: [
                 "Proprietary Modeling & Real-Time Analytics",
                 "Strategic Leverage Mapping",
                 "Multi-Year Earnings Forecasting"
              ]
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

  const updateContent = (field: string, value: unknown) => {
    setData(prev => {
      if (!prev) return null
      const sc = prev.content.salaryCap || {}
      return { ...prev, content: { ...prev.content, salaryCap: { ...sc, [field]: value } as PageContent["salaryCap"] } }
    })
  }

  const updateCardTitle = (idx: number, val: string) => {
    setData(prev => {
      if (!prev) return null
      const sc = (prev.content.salaryCap || {}) as SalaryCapData
      const newTitles = [...(sc.cardTitles || [])]
      newTitles[idx] = val
      return { ...prev, content: { ...prev.content, salaryCap: { ...sc, cardTitles: newTitles } as PageContent["salaryCap"] } }
    })
  }

  const updatePoint = (idx: number, val: string) => {
    setData(prev => {
      if (!prev) return null
      const sc = (prev.content.salaryCap || {}) as SalaryCapData
      const newPoints = [...(sc.points || [])]
      newPoints[idx] = val
      return { ...prev, content: { ...prev.content, salaryCap: { ...sc, points: newPoints } as PageContent["salaryCap"] } }
    })
  }

  if (loading || !data) return <div className="flex items-center justify-center h-[60vh]"><Loader2Icon className="size-10 animate-spin text-blue-500" /></div>

  const sc = (data.content.salaryCap || {}) as SalaryCapData

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
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Full Page Live Preview & Analytics Controls</p>
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
                <div className="absolute inset-0 z-0">
                  <Image src={sc.backgroundImage || "/graph.png"} alt="Bg" fill className="object-cover opacity-80" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/60 via-[#05070a]/20 to-[#05070a]" />
                </div>
                
                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                   <div className="text-center space-y-6 max-w-5xl mx-auto mb-16">
                      <GradientHeader tag="h1" size="lg">
                        {(sc.title || "").split('\n').map((line: string, i: number) => (
                          <React.Fragment key={i}>{line}{i < (sc.title || "").split('\n').length - 1 && <br />}</React.Fragment>
                        ))}
                      </GradientHeader>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">{sc.subtitle}</p>
                   </div>
                   
                   <div className="w-full max-w-6xl space-y-12">
                      <div className="flex items-center justify-center gap-4 text-primary">
                        <div className="h-[1px] w-12 bg-primary/30" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">{sc.engineTitle}</span>
                        <div className="h-[1px] w-12 bg-primary/30" />
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4">
                         {sc.cardTitles?.map((t, i) => (
                           <div key={i} className="glass-premium p-4 rounded-xl border border-white/10 space-y-4">
                              <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{t}</h4>
                              <div className="h-12 bg-white/5 rounded-lg flex items-center justify-center text-primary/20">
                                 {i === 0 && <BarChart3Icon />}
                                 {i === 1 && <ActivityIcon />}
                                 {i === 2 && <ZapIcon />}
                                 {i === 3 && <Settings2Icon />}
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-12">
            {/* Hero & Basics */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Section 1: Hero & Analytics Header</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Main Heading (use \n for line breaks)</label>
                    <textarea className="w-full h-32 bg-white/5 border border-white/10 text-white rounded-2xl p-4 text-sm font-bold resize-none" value={sc.title} onChange={(e) => updateContent("title", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Sub-Heading / Tagline</label>
                    <textarea className="w-full h-24 bg-white/5 border border-white/10 text-white rounded-xl p-4 text-xs font-bold resize-none" value={sc.subtitle} onChange={(e) => updateContent("subtitle", e.target.value)} />
                  </div>
                </div>
                <ImageUpload label="Analytics Background" value={sc.backgroundImage || ""} onChange={(v) => updateContent("backgroundImage", v)} />
              </div>
            </div>

            {/* Cards Editor */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
               <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Section 2: The Acclimation Engine Cards</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sc.cardTitles?.map((t, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                       <label className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Card {i+1} Title</label>
                       <Input className="bg-black/40 border-white/10 text-white h-12 rounded-xl text-xs font-black uppercase tracking-widest" value={t} onChange={(e) => updateCardTitle(i, e.target.value)} />
                    </div>
                  ))}
               </div>
            </div>

            {/* Bullet Points */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
               <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Section 3: Feature Bullet Points</h2>
               <div className="space-y-3">
                  {sc.points?.map((p, i) => (
                    <div key={i} className="flex gap-2">
                       <div className="size-10 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500 shrink-0">•</div>
                       <Input className="bg-white/5 border-white/10 text-white h-10 rounded-xl text-xs font-bold" value={p} onChange={(e) => updatePoint(i, e.target.value)} />
                    </div>
                  ))}
               </div>
            </div>

            {/* CTA */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-4">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">CTA Button Text</label>
              <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm font-bold uppercase tracking-widest" value={sc.ctaText} onChange={(e) => updateContent("ctaText", e.target.value)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
