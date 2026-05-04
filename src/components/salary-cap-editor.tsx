"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, Settings2Icon, PlusIcon, Trash2Icon } from "lucide-react"
import { PageData, FAQ } from "@/types/cms"
import Image from "next/image"
import { GradientHeader } from "@/components/gradient-header"
import { CtaButton } from "@/components/cta-button"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"

export function SalaryCapEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<PageData | null>(null)
  const [activeTab, setActiveTab] = useState<"live" | "seo">("seo")

  useEffect(() => {
    fetchPageData()
  }, [])

  const fetchPageData = async () => {
    try {
      const response = await fetch("/api/pages/salary-cap")
      const result = await response.json()
      if (result.success && result.data) {
        setData(result.data)
      } else {
        setData({
          slug: "salary-cap",
          title: "Salary Cap Analytics",
          content: {
            salaryCap: {
              title: "Master the Salary Cap. \n Maximize Every Dollar.",
              subtitle: "Proprietary analytical models and expert salary cap strategy that put more money in your pocket.",
              engineTitle: "The Acclimation Salary Cap Engine",
              cardTitles: [
                "Live Salary Cap Forecasting",
                "Luxury Tax Stress Testing",
                "Endorsement & NIL Valuation",
                "Contract Optimization Simulator"
              ],
              points: [
                "In-house salary cap forecasts",
                "Custom analytical projections",
                "Bird Rights optimization",
              ],
              ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL"
            }
          },
          seo: {
            title: "Salary Cap Analytics | Acclimation Sports",
            description: "Proprietary analytical models and expert salary cap strategy.",
            keywords: "NBA Salary Cap, Analytics"
          }
        })
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
      const response = await fetch("/api/pages/salary-cap", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        toast.success("Salary Cap Analytics Published Successfully!")
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
      return {
        ...prev,
        content: {
          ...prev.content,
          salaryCap: {
            ...prev.content.salaryCap!,
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

  if (loading || !data || !data.content.salaryCap) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2Icon className="size-10 animate-spin text-blue-500" />
      </div>
    )
  }

  const content = data.content.salaryCap

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
              <div className="absolute inset-x-0 top-0 h-[85vh] z-0">
                <Image src={content.backgroundImage || "/graph.png"} alt="Bg" fill className="object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/60 via-[#05070a]/20 to-[#05070a]" />
              </div>
              
              <div className="container mx-auto px-6 pt-24 pb-12 relative z-10 flex flex-col items-center">
                <div className="text-center space-y-6 max-w-5xl mx-auto mb-16">
                  <GradientHeader tag="h1" size="lg" className="mb-4 text-center">
                    {(content.title || "").split('\n').map((line: string, i: number) => (
                      <React.Fragment key={i}>{line}{i < (content.title || "").split('\n').length - 1 && <br />}</React.Fragment>
                    ))}
                  </GradientHeader>
                  <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 whitespace-pre-line leading-relaxed">
                    {content.subtitle}
                  </p>
                </div>

                <div className="w-full max-w-7xl space-y-8 mt-12">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-4 text-primary">
                      <div className="h-[1px] w-12 bg-primary/30" />
                      <span className="text-sm font-black uppercase tracking-[0.4em]">{content.engineTitle}</span>
                      <div className="h-[1px] w-12 bg-primary/30" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {content.cardTitles.map((title: string, i: number) => (
                      <div key={i} className="glass-premium p-6 rounded-2xl border border-white/10 h-32 flex flex-col justify-between">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest leading-tight">{title}</h3>
                        <div className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] italic">Engine Module</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col items-center gap-4 mt-12 text-white">
                    {content.points.map((p: string, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <p className="text-sm font-bold text-white/70 uppercase tracking-widest">{p}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-12">
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
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Hero Subtitle</label>
                    <textarea
                      className="w-full h-32 bg-white/5 border border-white/10 text-white rounded-2xl p-4 text-sm focus:border-blue-500/50 outline-none transition-all resize-none"
                      value={content.subtitle}
                      onChange={(e) => updateContent("subtitle", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                 <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Engine Modules</h2>
                 <div className="space-y-4">
                    <div className="space-y-1">
                       <label className="text-[8px] font-black text-white/20 uppercase tracking-widest ml-1">Engine Section Title</label>
                       <Input 
                         value={content.engineTitle} 
                         onChange={(e) => updateContent("engineTitle", e.target.value)}
                         className="bg-white/5 border-white/10 text-white h-10 text-xs font-black uppercase"
                       />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.cardTitles.map((title: string, idx: number) => (
                        <div key={idx} className="space-y-1">
                          <label className="text-[8px] font-black text-white/10 uppercase tracking-widest ml-1">Card {idx + 1}</label>
                          <Input 
                            value={title} 
                            onChange={(e) => {
                              const newTitles = [...content.cardTitles]
                              newTitles[idx] = e.target.value
                              updateContent("cardTitles", newTitles)
                            }}
                            className="bg-black/40 border-white/10 text-white h-10 text-xs font-bold uppercase"
                          />
                        </div>
                      ))}
                    </div>
                 </div>
              </div>

              <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                 <div className="flex items-center justify-between">
                   <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Strategy Points</h2>
                   <Button 
                     onClick={() => updateContent("points", [...content.points, "New Strategy Point"])}
                     className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg"
                   >
                     <PlusIcon className="size-3 mr-2" /> Add Point
                   </Button>
                 </div>
                 <div className="grid grid-cols-1 gap-3">
                   {content.points.map((point: string, idx: number) => (
                     <div key={idx} className="flex gap-2">
                        <Input
                          className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-xs font-bold uppercase tracking-wider"
                          value={point}
                          onChange={(e) => {
                            const newPoints = [...(content.points || [])]
                            newPoints[idx] = e.target.value
                            updateContent("points", newPoints)
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newPoints = (content.points || []).filter((_: string, i: number) => i !== idx)
                            updateContent("points", newPoints)
                          }}
                          className="text-red-500/40 hover:text-red-500 hover:bg-red-500/10 h-12 w-12 rounded-xl"
                        >
                          <Trash2Icon className="size-4" />
                        </Button>
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
