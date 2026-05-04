"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, Settings2Icon, PlusIcon, Trash2Icon } from "lucide-react"
import { PageData, ProcessStep, FAQ } from "@/types/cms"
import Image from "next/image"
import { GradientHeader } from "@/components/gradient-header"
import { CtaButton } from "@/components/cta-button"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"

export function ContractNegotiationEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<PageData | null>(null)
  const [activeTab, setActiveTab] = useState<"live" | "seo">("seo")

  useEffect(() => {
    fetchPageData()
  }, [])

  const fetchPageData = async () => {
    try {
      const response = await fetch("/api/pages/contract-negotiation")
      const result = await response.json()
      if (result.success && result.data) {
        setData(result.data)
      } else {
        setData({
          slug: "contract-negotiation",
          title: "Contract Negotiation",
          content: {
            mainTitle: "NBA Contract Negotiation and \n Representation",
            subDescription: "Data-driven contract deals with proprietary in-house salary-cap models. Expert representation that maximizes guaranteed money, incentives, and long-term player for active NBA players, college prospects, and elite high-school talent.",
            points: [
              { title: "Salary Cap Mastery & Analytical Modeling", items: [] },
              { title: "Rookie Scale & Veteran Extension Negotiation", items: [] },
              { title: "Multi-Team Bidding War Strategy", items: [] },
              { title: "Full CBA Compliance & Contract Structuring", items: [] },
              { title: "Pre-Draft & Combine Contract Positioning", items: [] },
            ],
            processSteps: [
              { step: 1, title: "Maximum", subtitle: "Guaranteed Money" },
              { step: 2, title: "Performance", subtitle: "Incentives & Escalators" },
              { step: 3, title: "Trade & Buyout", subtitle: "Negotiation" },
              { step: 4, title: "Post-Contract", subtitle: "Wealth Coordination" },
            ],
            ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL"
          },
          seo: {
            title: "NBA Contract Negotiation | Acclimation Sports",
            description: "Elite NBA contract negotiation and salary cap mastery.",
            keywords: "NBA Contract, Salary Cap, Joe Grekoski"
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
      const response = await fetch("/api/pages/contract-negotiation", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        toast.success("Contract Negotiation Published Successfully!")
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
        content: { ...prev.content, [field]: value }
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

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2Icon className="size-10 animate-spin text-blue-500" />
      </div>
    )
  }

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
              <div className="absolute inset-0 z-0">
                <Image src={data.content.backgroundImage || "/effect.png"} alt="Bg" fill className="object-cover opacity-30" />
              </div>
              <div className="container mx-auto px-6 pt-24 relative z-10 flex flex-col items-center">
                <div className="space-y-8 max-w-5xl mx-auto text-center">
                  <GradientHeader tag="h1" size="lg" className="mb-4 text-center leading-tight">
                    {(data.content.mainTitle || "").split('\n').map((line, i) => (
                      <React.Fragment key={i}>{line}{i < (data.content.mainTitle || "").split('\n').length - 1 && <br />}</React.Fragment>
                    ))}
                  </GradientHeader>
                  <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 max-w-3xl mx-auto leading-relaxed">
                    {data.content.subDescription}
                  </p>
                  <div className="flex flex-col items-center">
                    <ul className="text-left space-y-2">
                      {data.content.points?.map((point: { title: string; items: string[] }, i: number) => (
                        <li key={i} className="flex items-center gap-4 text-white/80">
                          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,210,255,1)]" />
                          <span className="text-lg font-bold tracking-tight">{point.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="container mx-auto px-6 mt-20 relative z-10">
                <h2 className="text-center text-sm font-black uppercase tracking-[0.4em] text-primary mb-12">Negotiation Process</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {data.content.processSteps?.map((item: ProcessStep) => (
                    <div key={item.step} className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-[#0a0d12] border border-primary/40 flex items-center justify-center font-black text-primary mb-4 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                        {item.step}
                      </div>
                      <h3 className="text-white text-[10px] font-black uppercase tracking-widest">{item.title}</h3>
                      <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{item.subtitle}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-16">
                  <CtaButton href="#">{data.content.ctaText}</CtaButton>
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
                      value={data.content.mainTitle}
                      onChange={(e) => updateContent("mainTitle", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Sub-Description / Tagline</label>
                    <textarea
                      className="w-full h-32 bg-white/5 border border-white/10 text-white rounded-2xl p-4 text-sm focus:border-blue-500/50 outline-none transition-all resize-none font-medium"
                      value={data.content.subDescription}
                      onChange={(e) => updateContent("subDescription", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                 <div className="flex items-center justify-between">
                   <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Core Strategy Points</h2>
                   <Button 
                     onClick={() => updateContent("points", [...(data.content.points || []), { title: "New Point", items: [] }])}
                     className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg"
                   >
                     <PlusIcon className="size-3 mr-2" /> Add Point
                   </Button>
                 </div>

                 <div className="grid grid-cols-1 gap-3">
                   {(data.content.points || []).map((point: { title: string; items: string[] }, idx: number) => (
                     <div key={idx} className="flex gap-2">
                        <Input
                          className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-xs font-bold uppercase tracking-wider"
                          value={point.title}
                          onChange={(e) => {
                            const newPoints = [...(data.content.points || [])]
                            newPoints[idx].title = e.target.value
                            updateContent("points", newPoints)
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newPoints = data.content.points?.filter((_: unknown, i: number) => i !== idx) || []
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

              <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                 <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Negotiation Process Steps</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.content.processSteps?.map((step: ProcessStep, idx: number) => (
                      <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4">
                        <div className="text-[10px] font-black text-primary uppercase tracking-widest border-b border-white/5 pb-2">Step {step.step}</div>
                        <div className="space-y-3">
                           <div className="space-y-1">
                             <label className="text-[8px] font-black text-white/20 uppercase tracking-widest ml-1">Title</label>
                             <Input 
                               value={step.title} 
                               onChange={(e) => {
                                 const newSteps = [...(data.content.processSteps || [])]
                                 newSteps[idx].title = e.target.value
                                 updateContent("processSteps", newSteps)
                               }}
                               className="bg-black/40 border-white/10 text-white h-10 text-xs font-black uppercase"
                             />
                           </div>
                           <div className="space-y-1">
                             <label className="text-[8px] font-black text-white/20 uppercase tracking-widest ml-1">Subtitle</label>
                             <Input 
                               value={step.subtitle} 
                               onChange={(e) => {
                                 const newSteps = [...(data.content.processSteps || [])]
                                 newSteps[idx].subtitle = e.target.value
                                 updateContent("processSteps", newSteps)
                               }}
                               className="bg-black/40 border-white/10 text-white h-10 text-xs font-bold uppercase tracking-widest"
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
                  value={data.content.backgroundImage || ""}
                  onChange={(v) => updateContent("backgroundImage", v)}
                />

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">CTA Button Text</label>
                  <Input
                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm font-bold uppercase tracking-widest"
                    value={data.content.ctaText}
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
