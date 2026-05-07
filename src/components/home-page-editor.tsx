"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { 
  SaveIcon, 
  Loader2Icon, 
  Settings2Icon,
  EyeIcon,
  LayoutIcon,
  UsersIcon,
  PhoneIcon,
  PlusIcon,
  Trash2Icon,
  TrendingUpIcon,
  BarChart3Icon
} from "lucide-react"

import { Hero } from "@/components/hero"
import { OneStopShop } from "@/components/one-stop-shop"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { PageData, FAQ } from "@/types/cms"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"

import { mergePageData } from "@/lib/data-utils"

export function HomePageEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<PageData | null>(null)
  const [activeTab, setActiveTab] = useState<"live" | "seo">("seo")

  const fetchPageData = useCallback(async () => {
    try {
      const response = await fetch("/api/pages/home")
      const result = await response.json()
      if (result.success) {
        setData(mergePageData(result.data))
      } else {
        setData(mergePageData(null))
      }
    } catch {
      toast.error("Failed to fetch page data")
      setData(mergePageData(null))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPageData()
  }, [fetchPageData])

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("/api/pages/home", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) toast.success("All Changes Published!")
      else toast.error(result.message)
    } catch {
      toast.error("An error occurred while saving")
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (section: keyof PageData["content"], field: string, value: unknown) => {
    setData((prev: PageData | null) => {
      if (!prev) return null
      const sectionData = (prev.content?.[section] || {}) as Record<string, unknown>
      return {
        ...prev,
        content: { 
          ...prev.content, 
          [section]: { ...sectionData, [field]: value } 
        }
      }
    })
  }

  const updateSeo = (field: keyof PageData["seo"], value: string | FAQ[] | boolean) => {
    setData((prev: PageData | null) => {
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

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700 w-full max-w-full overflow-x-hidden">
      {/* 1. Header & Quick Publish */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-[#0a0d12]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-xl sticky top-4 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-inner">
            <Settings2Icon className="text-blue-500 size-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight italic">{data.title} <span className="text-blue-500 text-[10px] not-italic align-top ml-1">EDITOR</span></h1>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Directly manage and publish visual sections live</p>
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
          Publish to Site
        </Button>
      </div>

      {activeTab === "seo" ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <SeoEditor data={data} updateSeo={updateSeo} />
        </div>
      ) : (
        <div className="space-y-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* --- 1. HERO SECTION --- */}
          <section className="space-y-8">
            <PreviewBlock title="1. Hero Section Preview">
              <Hero data={data} />
            </PreviewBlock>
            
            <div className="bg-[#0a0d12]/40 p-10 rounded-[3rem] border border-white/5 space-y-12 shadow-2xl">
              <div className="flex items-center gap-3 border-b border-white/5 pb-6">
                <div className="size-10 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/20">
                  <LayoutIcon className="size-5 text-blue-500" />
                </div>
                <div>
                   <h2 className="text-sm font-black text-white uppercase tracking-tight italic">Hero Section Editor</h2>
                   <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Manage branding, cards, and economic charts</p>
                </div>
              </div>

              {/* A. HERO BRANDING & BUTTON */}
              <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 space-y-8">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="size-1.5 bg-blue-500 rounded-full animate-pulse" />
                    <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Main Branding & Call to Action</h3>
                 </div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <ImageUpload label="Hero Background" value={data?.content?.backgroundImage || ""} onChange={(v) => setData(prev => prev ? ({ ...prev, content: { ...(prev.content || {}), backgroundImage: v } }) : null)} />
                      <EditField label="Hero Title (use \n for line breaks)" type="textarea" value={data?.content?.hero?.title || ""} onChange={(v) => updateContent("hero", "title", v)} />
                    </div>
                    <div className="space-y-6">
                      <EditField label="Tagline" value={data?.content?.hero?.tagline || ""} onChange={(v) => updateContent("hero", "tagline", v)} />
                      <EditField label="Hero Button Text (CTA)" value={data?.content?.hero?.ctaText || ""} onChange={(v) => updateContent("hero", "ctaText", v)} />
                      
                      <div className="space-y-3 pt-4 border-t border-white/5">
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Scrolling Features Bar</label>
                        <div className="grid grid-cols-1 gap-2">
                          {(data?.content?.hero?.features || []).map((feature: string, idx: number) => (
                            <div key={idx} className="flex gap-2">
                              <Input value={feature} onChange={(e) => {
                                const newFeatures = [...(data?.content?.hero?.features || [])]
                                newFeatures[idx] = e.target.value
                                updateContent("hero", "features", newFeatures)
                              }} className="bg-white/5 border-white/10 text-white rounded-xl h-10 text-xs" />
                              <Button variant="ghost" size="icon" onClick={() => {
                                const newFeatures = (data?.content?.hero?.features || []).filter((_: string, i: number) => i !== idx)
                                updateContent("hero", "features", newFeatures)
                              }} className="text-red-500/40 hover:text-red-500 hover:bg-red-500/10 h-10 w-10 rounded-xl">
                                ×
                              </Button>
                            </div>
                          ))}
                          <Button variant="outline" onClick={() => updateContent("hero", "features", [...(data?.content?.hero?.features || []), "New Feature"])} className="border-dashed border-white/10 text-white/40 hover:text-white h-10 rounded-xl text-[10px] font-black uppercase tracking-widest">
                            + Add Feature
                          </Button>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>

              {/* B. SERVICE MASTERY CARDS */}
              <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 space-y-8">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="size-1.5 bg-purple-500 rounded-full animate-pulse" />
                    <h3 className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Service Mastery Cards</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data?.content?.hero?.cards?.map((card: { title: string, type: string, desc: string }, idx: number) => (
                      <div key={idx} className="bg-black/40 p-6 rounded-3xl border border-white/5 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <EditField label="Card Title" value={card.title} onChange={(v) => {
                            const newCards = [...(data?.content?.hero?.cards || [])]
                            newCards[idx].title = v
                            updateContent("hero", "cards", newCards)
                          }} />
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Icon Type</label>
                            <select value={card.type} onChange={(e) => {
                              const newCards = [...(data?.content?.hero?.cards || [])]
                              newCards[idx].type = e.target.value
                              updateContent("hero", "cards", newCards)
                            }} className="w-full bg-black border border-white/10 text-white rounded-xl h-11 text-[10px] px-3 focus:border-blue-500/50 outline-none">
                               <option value="shield">Shield (Negotiation)</option>
                               <option value="trending">Trending (Brand)</option>
                               <option value="handshake">Handshake (Endorsements)</option>
                               <option value="trophy">Trophy (Holistic)</option>
                            </select>
                          </div>
                        </div>
                        <EditField label="Description" type="textarea" height="h-20" value={card.desc} onChange={(v) => {
                           const newCards = [...(data?.content?.hero?.cards || [])]
                           newCards[idx].desc = v
                           updateContent("hero", "cards", newCards)
                        }} />
                      </div>
                    ))}
                 </div>
              </div>

              {/* C. ECONOMIC GROWTH CHART DATA (NOW HIGHLY VISIBLE) */}
              <div className="bg-blue-600/10 p-10 rounded-[2.5rem] border border-blue-500/30 space-y-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5">
                    <BarChart3Icon className="size-32 text-blue-500" />
                 </div>
                 
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-4">
                       <div className="size-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-2xl">
                          <TrendingUpIcon className="size-6 text-blue-500" />
                       </div>
                       <div>
                          <h3 className="text-sm font-black text-white uppercase tracking-tight italic">Economic Growth Chart Data</h3>
                          <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Add or modify career valuation points</p>
                       </div>
                    </div>
                    <Button onClick={() => {
                        const currentData = data?.content?.hero?.chart?.data || []
                        const nextYear = currentData.length > 0 ? Math.max(...currentData.map((d: { year: number }) => d.year)) + 1 : 1
                        const newData = [...currentData, { year: nextYear, value: 0, label: `Year ${nextYear}: $0M` }]
                        updateContent("hero", "chart", { ...(data?.content?.hero?.chart || { title: "", data: [] }), data: newData })
                      }} className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] h-12 px-8 rounded-xl shadow-2xl shadow-blue-500/20 transition-all active:scale-95">
                        <PlusIcon className="size-4 mr-2" /> Add Data Point
                    </Button>
                 </div>

                 <div className="space-y-6 relative z-10">
                    <div className="max-w-md">
                       <EditField label="Chart Heading" value={data?.content?.hero?.chart?.title || ""} onChange={(v) => {
                          const newChart = { ...(data?.content?.hero?.chart || { title: "", data: [] }), title: v }
                          updateContent("hero", "chart", newChart)
                       }} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                       {(data?.content?.hero?.chart?.data || []).map((point: { year: number, value: number, label?: string }, idx: number) => (
                         <div key={idx} className="bg-[#05070a]/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group/point relative">
                            <Button variant="ghost" size="icon" onClick={() => {
                               const newData = (data?.content?.hero?.chart?.data || []).filter((_: unknown, i: number) => i !== idx)
                               updateContent("hero", "chart", { ...(data?.content?.hero?.chart || { title: "", data: [] }), data: newData })
                            }} className="absolute top-2 right-2 size-8 text-red-500/30 hover:text-red-500 hover:bg-red-500/10 rounded-lg opacity-0 group-hover/point:opacity-100 transition-all">
                               <Trash2Icon className="size-4" />
                            </Button>
                            
                            <div className="space-y-4">
                               <div className="flex justify-between items-center mb-2">
                                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Point {idx + 1}</span>
                               </div>
                               <div className="grid grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[8px] font-black text-white/20 uppercase tracking-widest">Year</label>
                                    <Input type="number" value={point.year} onChange={(e) => {
                                      const newData = [...(data?.content?.hero?.chart?.data || [])]
                                      const val = parseInt(e.target.value)
                                      newData[idx] = { ...newData[idx], year: val, label: `Year ${val}: $${newData[idx].value}M` }
                                      updateContent("hero", "chart", { ...(data?.content?.hero?.chart || { title: "", data: [] }), data: newData })
                                    }} className="bg-white/5 border-white/10 text-white h-9 text-xs font-bold" />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[8px] font-black text-white/20 uppercase tracking-widest">Value ($M)</label>
                                    <Input type="number" step="0.1" value={point.value} onChange={(e) => {
                                      const newData = [...(data?.content?.hero?.chart?.data || [])]
                                      const val = parseFloat(e.target.value)
                                      newData[idx] = { ...newData[idx], value: val, label: `Year ${newData[idx].year}: $${val}M` }
                                      updateContent("hero", "chart", { ...(data?.content?.hero?.chart || { title: "", data: [] }), data: newData })
                                    }} className="bg-white/5 border-white/10 text-white h-9 text-xs font-bold" />
                                  </div>
                               </div>
                               <div className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5">
                                  <input type="checkbox" checked={!!point.label} id={`label-${idx}`} onChange={(e) => {
                                    const newData = [...(data?.content?.hero?.chart?.data || [])]
                                    newData[idx] = { ...newData[idx], label: e.target.checked ? `Year ${point.year}: $${point.value}M` : "" }
                                    updateContent("hero", "chart", { ...(data?.content?.hero?.chart || { title: "", data: [] }), data: newData })
                                  }} className="size-4 accent-blue-500 cursor-pointer" />
                                  <label htmlFor={`label-${idx}`} className="text-[9px] font-black text-white/40 uppercase tracking-widest cursor-pointer select-none">Show Floating Label</label>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </section>

          {/* --- 2. ONE STOP SHOP SECTION --- */}
          <section className="space-y-8">
            <PreviewBlock title="2. One-Stop Shop Preview">
              <OneStopShop data={data} />
            </PreviewBlock>
            
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-12">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="size-8 bg-emerald-600/20 rounded-lg flex items-center justify-center border border-emerald-500/20">
                  <EyeIcon className="size-4 text-emerald-500" />
                </div>
                <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Proprietary Service Mastery</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="space-y-6">
                  <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1">Section Branding</h3>
                  <ImageUpload label="Section BG" value={data?.content?.oneStopShop?.backgroundImage || ""} onChange={(v) => updateContent("oneStopShop", "backgroundImage", v)} />
                  <EditField label="Section Title" value={data?.content?.oneStopShop?.title || ""} onChange={(v) => updateContent("oneStopShop", "title", v)} />
                  <EditField label="Description" type="textarea" height="h-32" value={data?.content?.oneStopShop?.description || ""} onChange={(v) => updateContent("oneStopShop", "description", v)} />
                  <EditField label="CTA Button Text" value={data?.content?.oneStopShop?.ctaText || ""} onChange={(v) => updateContent("oneStopShop", "ctaText", v)} />
                </div>
                <div className="lg:col-span-2 space-y-6">
                   <div className="flex items-center justify-between">
                     <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-1">Service Categories & Details</h3>
                     <Button onClick={() => {
                       const currentPoints = data?.content?.oneStopShop?.points || []
                       const newPoints = [...currentPoints, { title: "New Service", items: ["New detail..."] }]
                       updateContent("oneStopShop", "points", newPoints)
                     }} className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] h-7 font-black uppercase">
                        <PlusIcon className="size-3 mr-1" /> Add Service
                     </Button>
                   </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto no-scrollbar pr-2">
                    {(data?.content?.oneStopShop?.points || []).map((point: { title: string, items: string[] }, idx: number) => (
                      <div key={idx} className="bg-white/5 p-6 rounded-[2rem] border border-white/5 space-y-4 group relative">
                        <Button variant="ghost" size="icon" onClick={() => {
                          const newPoints = (data?.content?.oneStopShop?.points || []).filter((_: unknown, i: number) => i !== idx)
                          updateContent("oneStopShop", "points", newPoints)
                        }} className="absolute top-4 right-4 size-8 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                           <Trash2Icon className="size-4" />
                        </Button>
                        <EditField label="Service Title" value={point.title} onChange={(v) => {
                          const newPoints = [...(data?.content?.oneStopShop?.points || [])]
                          newPoints[idx].title = v
                          updateContent("oneStopShop", "points", newPoints)
                        }} />
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <label className="text-[8px] font-black text-white/20 uppercase tracking-widest">Detail Bullets</label>
                            <Button onClick={() => {
                              const newPoints = [...(data?.content?.oneStopShop?.points || [])]
                              newPoints[idx].items = [...newPoints[idx].items, "New point..."]
                              updateContent("oneStopShop", "points", newPoints)
                            }} className="size-6 bg-white/5 text-white/30 hover:text-white rounded-lg p-0"><PlusIcon className="size-3" /></Button>
                          </div>
                          {point.items?.map((item: string, i: number) => (
                            <div key={i} className="flex gap-2">
                              <Input value={item} onChange={(e) => {
                                const newPoints = [...(data?.content?.oneStopShop?.points || [])]
                                newPoints[idx].items[i] = e.target.value
                                updateContent("oneStopShop", "points", newPoints)
                              }} className="bg-black/40 border-white/10 text-white h-8 text-[10px]" />
                              <Button variant="ghost" size="icon" onClick={() => {
                                const newPoints = [...(data?.content?.oneStopShop?.points || [])]
                                newPoints[idx].items = newPoints[idx].items.filter((_: string, index: number) => index !== i)
                                updateContent("oneStopShop", "points", newPoints)
                              }} className="size-8 text-red-500/30 hover:text-red-500"><Trash2Icon className="size-3" /></Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- 3. ABOUT SECTION --- */}
          <section className="space-y-8">
            <PreviewBlock title="3. About Section Preview">
              <AboutSection data={data} />
            </PreviewBlock>
            
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-12">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="size-8 bg-orange-600/20 rounded-lg flex items-center justify-center border border-orange-500/20">
                  <UsersIcon className="size-4 text-orange-500" />
                </div>
                <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Executive Bio & Achievements</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-widest ml-1">Profile Branding</h3>
                   <div className="grid grid-cols-2 gap-4">
                     <ImageUpload label="Joe's Profile" value={data?.content?.about?.profileImage || ""} onChange={(v) => updateContent("about", "profileImage", v)} />
                     <ImageUpload label="Background BG" value={data?.content?.about?.backgroundImage || ""} onChange={(v) => updateContent("about", "backgroundImage", v)} />
                   </div>
                   <EditField label="Heading (use \n for breaks)" type="textarea" value={data?.content?.about?.title || ""} onChange={(v) => updateContent("about", "title", v)} />
                   <EditField label="NBPA Certification Subtitle" value={data?.content?.about?.subtitle || ""} onChange={(v) => updateContent("about", "subtitle", v)} />
                   <EditField label="Main Bio Description" type="textarea" height="h-48" value={data?.content?.about?.description || ""} onChange={(v) => updateContent("about", "description", v)} />
                </div>
                <div className="space-y-8">
                   <div className="space-y-4">
                     <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-widest ml-1">Achievement Bullets</h3>
                     <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                       {(data?.content?.about?.bullets || []).map((bullet: string, idx: number) => (
                         <div key={idx} className="flex gap-2">
                           <textarea value={bullet} onChange={(e) => {
                             const newBullets = [...(data?.content?.about?.bullets || [])]
                             newBullets[idx] = e.target.value
                             updateContent("about", "bullets", newBullets)
                           }} className="flex-1 bg-white/5 border border-white/10 text-white text-[10px] rounded-xl p-3 h-16 resize-none focus:border-orange-500/30 transition-all" />
                           <Button variant="ghost" size="icon" onClick={() => {
                             const newBullets = (data?.content?.about?.bullets || []).filter((_: string, i: number) => i !== idx)
                             updateContent("about", "bullets", newBullets)
                           }} className="text-red-500/40 hover:text-red-500 size-10"><Trash2Icon className="size-4" /></Button>
                         </div>
                       ))}
                       <Button variant="outline" onClick={() => updateContent("about", "bullets", [...(data?.content?.about?.bullets || []), "New achievement..."])} className="w-full border-dashed border-white/10 text-white/40 hover:text-white h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                         + Add Achievement
                       </Button>
                     </div>
                   </div>

                   <div className="space-y-4 pt-8 border-t border-white/5">
                      <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-widest ml-1">Specialty Marquee</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                         {(data?.content?.about?.specialties || []).map((spec: string, idx: number) => (
                           <Input key={idx} value={spec} onChange={(e) => {
                             const newSpecs = [...(data?.content?.about?.specialties || [])]
                             newSpecs[idx] = e.target.value
                             updateContent("about", "specialties", newSpecs)
                           }} className="bg-black/40 border-white/10 text-white h-9 text-[10px]" />
                         ))}
                      </div>
                   </div>
                   
                   <EditField label="Bottom Focus Text" type="textarea" height="h-24" value={data?.content?.about?.focusText || ""} onChange={(v) => updateContent("about", "focusText", v)} />
                   <EditField label="CTA Button Text" value={data?.content?.about?.ctaText || ""} onChange={(v) => updateContent("about", "ctaText", v)} />
                </div>
              </div>
            </div>
          </section>

          {/* --- 4. CONTACT SECTION --- */}
          <section className="space-y-8">
            <PreviewBlock title="4. Contact Section Preview">
              <ContactSection data={data} />
            </PreviewBlock>
            
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-12">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="size-8 bg-cyan-600/20 rounded-lg flex items-center justify-center border border-cyan-500/20">
                  <PhoneIcon className="size-4 text-cyan-500" />
                </div>
                <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Direct Communication Hardening</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest ml-1">Branding & Headers</h3>
                   <ImageUpload label="Contact BG" value={data?.content?.contact?.backgroundImage || ""} onChange={(v) => updateContent("contact", "backgroundImage", v)} />
                   <EditField label="Main Heading" value={data?.content?.contact?.title || ""} onChange={(v) => updateContent("contact", "title", v)} />
                   <EditField label="Sub-Tagline" value={data?.content?.contact?.tagline || ""} onChange={(v) => updateContent("contact", "tagline", v)} />
                </div>
                <div className="space-y-6">
                   <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest ml-1">Contact Intelligence</h3>
                   <div className="space-y-4">
                      {/* Phone */}
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                        <EditField label="Phone Title" value={data?.content?.contact?.phoneTitle || ""} onChange={(v) => updateContent("contact", "phoneTitle", v)} />
                        <EditField label="Phone Number" value={data?.content?.contact?.phone || ""} onChange={(v) => updateContent("contact", "phone", v)} />
                        <EditField label="Phone Description" type="textarea" height="h-20" value={data?.content?.contact?.phoneDesc || ""} onChange={(v) => updateContent("contact", "phoneDesc", v)} />
                      </div>
                      {/* Email */}
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                        <EditField label="Email Title" value={data?.content?.contact?.emailTitle || ""} onChange={(v) => updateContent("contact", "emailTitle", v)} />
                        <EditField label="Email Address" value={data?.content?.contact?.email || ""} onChange={(v) => updateContent("contact", "email", v)} />
                        <EditField label="Email Description" type="textarea" height="h-20" value={data?.content?.contact?.emailDesc || ""} onChange={(v) => updateContent("contact", "emailDesc", v)} />
                      </div>
                      {/* Location */}
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                        <EditField label="Location Title" value={data?.content?.contact?.locationTitle || ""} onChange={(v) => updateContent("contact", "locationTitle", v)} />
                        <EditField label="Full Office Address" type="textarea" height="h-24" value={data?.content?.contact?.location || ""} onChange={(v) => updateContent("contact", "location", v)} />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}
    </div>
  )
}

function PreviewBlock({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="w-full rounded-[3rem] overflow-hidden border border-white/5 bg-black shadow-3xl">
      <div className="bg-white/5 px-8 py-3 flex items-center justify-center gap-3 border-b border-white/5">
        <div className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">{title}</span>
      </div>
      <div className="relative pointer-events-none opacity-90 transition-all">
        {children}
      </div>
    </div>
  )
}

function EditField({ label, value, onChange, type = "text", height = "h-24" }: { label: string, value: string, onChange: (v: string) => void, type?: "text" | "textarea", height?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">{label}</label>
      {type === "text" ? (
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="bg-white/5 border-white/10 text-white rounded-xl h-11 text-xs" />
      ) : (
        <textarea
          className={`flex w-full ${height} rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all no-scrollbar font-medium resize-none`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}
