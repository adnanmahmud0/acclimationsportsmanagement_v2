"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, Settings2Icon, PlusIcon, Trash2Icon } from "lucide-react"
import { PageData, FAQ } from "@/types/cms"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"
import { GradientHeader } from "@/components/gradient-header"
import Image from "next/image"

interface GeneralPageEditorProps {
  slug: string
  title: string
}

export function GeneralPageEditor({ slug, title }: GeneralPageEditorProps) {
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
            mainTitle: title,
            subDescription: "",
            description: "",
            points: [],
            ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL"
          },
          seo: {
            title: `${title} | Acclimation Sports`,
            description: `Elite services for ${title}.`,
            keywords: `NBA, Agent, ${title}`
          }
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
      if (result.success) toast.success(`${title} Published!`)
      else toast.error(result.message)
    } catch {
      toast.error("An error occurred while saving")
    } finally {
      setSaving(false)
    }
  }

  const updateSeo = (field: keyof PageData["seo"], value: string | FAQ[]) => {
    setData((prev: PageData | null) => {
      if (!prev) return null
      return { ...prev, seo: { ...prev.seo, [field]: value } }
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
    <div className="space-y-12 pb-24 animate-in fade-in duration-700 w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-[#0a0d12]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-xl sticky top-4 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-inner">
            <Settings2Icon className="text-blue-500 size-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight italic">{data.title} <span className="text-blue-500 text-[10px] not-italic align-top ml-1">EDITOR</span></h1>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Configure page content and SEO</p>
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Visual Preview Area */}
          <div className="w-full rounded-[3rem] overflow-hidden border border-white/5 bg-black shadow-3xl">
            <div className="bg-white/5 px-8 py-3 flex items-center justify-center gap-3 border-b border-white/5">
              <div className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Visual Preview</span>
            </div>
            
            <div className="relative min-h-[400px] bg-[#05070a] flex flex-col items-center justify-center text-center p-20 overflow-hidden">
               {/* Background */}
               <div className="absolute inset-0 z-0">
                  <Image 
                    src={data.content.backgroundImage || "/analitic.png"} 
                    alt="Bg Preview" 
                    fill 
                    className="object-cover opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-transparent to-[#05070a]" />
               </div>

               <div className="relative z-10 space-y-8 max-w-4xl">
                  <GradientHeader tag="h1" size="lg">
                    {(data.content.mainTitle || "").split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < (data.content.mainTitle || "").split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </GradientHeader>
                  
                  {data.content.subDescription && (
                    <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50">
                      {data.content.subDescription}
                    </p>
                  )}

                  {data.content.description && (
                    <p className="text-white/60 font-medium leading-relaxed max-w-2xl mx-auto">
                      {data.content.description}
                    </p>
                  )}

                  <div className="pt-8">
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white px-10 h-14 rounded-2xl font-black uppercase tracking-widest text-xs">
                      {data.content.ctaText || "CTA BUTTON"}
                    </Button>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em] mb-4">Header Content</h2>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Main Heading (Use \\n for new line)</label>
                  <textarea
                    className="w-full h-32 bg-white/5 border border-white/10 text-white rounded-2xl p-4 text-sm focus:border-blue-500/50 outline-none transition-all resize-none font-bold"
                    value={data.content.mainTitle || ""}
                    onChange={(e) => setData({ ...data, content: { ...data.content, mainTitle: e.target.value } })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Sub-Description (Short)</label>
                  <Input
                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm"
                    value={data.content.subDescription || ""}
                    onChange={(e) => setData({ ...data, content: { ...data.content, subDescription: e.target.value } })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Main Body Text</label>
                  <textarea
                    className="w-full h-40 bg-white/5 border border-white/10 text-white rounded-2xl p-4 text-sm focus:border-blue-500/50 outline-none transition-all resize-none"
                    value={data.content.description || ""}
                    onChange={(e) => setData({ ...data, content: { ...data.content, description: e.target.value } })}
                  />
                </div>
              </div>

              <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                 <div className="flex items-center justify-between">
                   <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Content Points / Features</h2>
                   <Button 
                     onClick={() => {
                       const newPoints = [...(data.content.points || []), { title: "New Point", items: ["New detail..."] }]
                       setData({ ...data, content: { ...data.content, points: newPoints } })
                     }}
                     className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg"
                   >
                     <PlusIcon className="size-3 mr-2" /> Add Point
                   </Button>
                 </div>

                 <div className="space-y-4">
                   {(data.content.points || []).map((point: { title: string; items: string[] }, idx: number) => (
                     <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 relative group">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newPoints = data.content.points?.filter((_, i) => i !== idx)
                            setData({ ...data, content: { ...data.content, points: newPoints } })
                          }}
                          className="absolute top-4 right-4 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2Icon className="size-4" />
                        </Button>

                        <div className="space-y-4">
                          <div className="space-y-1">
                             <label className="text-[8px] font-black text-white/10 uppercase tracking-widest">Point Title</label>
                             <Input
                               className="bg-black/40 border-white/10 text-white h-10 rounded-xl text-xs font-black uppercase"
                               value={point.title}
                               onChange={(e) => {
                                 const newPoints = [...(data.content.points || [])]
                                 newPoints[idx].title = e.target.value
                                 setData({ ...data, content: { ...data.content, points: newPoints } })
                               }}
                             />
                          </div>
                          <div className="space-y-1">
                             <label className="text-[8px] font-black text-white/10 uppercase tracking-widest">Detail / Description</label>
                             <textarea
                               className="w-full h-20 bg-black/40 border border-white/10 text-white rounded-xl p-3 text-xs focus:border-blue-500/50 outline-none transition-all resize-none"
                               value={point.items?.[0] || ""}
                               onChange={(e) => {
                                 const newPoints = [...(data.content.points || [])]
                                 newPoints[idx].items = [e.target.value]
                                 setData({ ...data, content: { ...data.content, points: newPoints } })
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
                  label="Page Background Image"
                  value={data.content.backgroundImage || ""}
                  onChange={(v) => setData({ ...data, content: { ...data.content, backgroundImage: v } })}
                />

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">CTA Button Text</label>
                  <Input
                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm font-bold uppercase tracking-widest"
                    value={data.content.ctaText || ""}
                    onChange={(e) => setData({ ...data, content: { ...data.content, ctaText: e.target.value } })}
                  />
                </div>
              </div>

              <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Quick Stats / Metrics (Optional)</h2>
                  <Button 
                    onClick={() => {
                      const newStats = [...(data.content.stats || []), { label: "Label", value: "Value" }]
                      setData({ ...data, content: { ...data.content, stats: newStats } })
                    }}
                    className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg"
                  >
                    <PlusIcon className="size-3 mr-2" /> Add Stat
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {(data.content.stats || []).map((stat, idx) => (
                    <div key={idx} className="flex gap-2 items-end">
                      <div className="flex-1 space-y-1">
                        <label className="text-[8px] font-black text-white/10 uppercase tracking-widest ml-1">Label</label>
                        <Input
                          className="bg-black/40 border-white/10 text-white h-10 rounded-xl text-xs"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...(data.content.stats || [])]
                            newStats[idx].label = e.target.value
                            setData({ ...data, content: { ...data.content, stats: newStats } })
                          }}
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <label className="text-[8px] font-black text-white/10 uppercase tracking-widest ml-1">Value</label>
                        <Input
                          className="bg-black/40 border-white/10 text-white h-10 rounded-xl text-xs"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...(data.content.stats || [])]
                            newStats[idx].value = e.target.value
                            setData({ ...data, content: { ...data.content, stats: newStats } })
                          }}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newStats = data.content.stats?.filter((_, i) => i !== idx)
                          setData({ ...data, content: { ...data.content, stats: newStats } })
                        }}
                        className="text-red-500/40 hover:text-red-500 hover:bg-red-500/10 h-10 rounded-xl"
                      >
                        <Trash2Icon className="size-4" />
                      </Button>
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
