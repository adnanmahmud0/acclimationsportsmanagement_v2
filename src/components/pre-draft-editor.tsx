"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, Settings2Icon, CircleDot, TrendingUp, Target, Mic, FileText, PlusIcon, Trash2Icon } from "lucide-react"
import { PageData, FAQ } from "@/types/cms"
import Image from "next/image"
import { GradientHeader } from "@/components/gradient-header"
import { CtaButton } from "@/components/cta-button"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"

export function PreDraftEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<PageData | null>(null)
  const [activeTab, setActiveTab] = useState<"live" | "seo">("seo")

  useEffect(() => {
    fetchPageData()
  }, [])

  const fetchPageData = async () => {
    try {
      const response = await fetch("/api/pages/pre-draft")
      const result = await response.json()
      if (result.success && result.data) {
        setData(result.data)
      } else {
        setData({
          slug: "pre-draft",
          title: "Pre-Draft Mastery",
          content: {
            preDraft: {
              title: "Pre-Draft and NBA \n Combine Mastery",
              tagline: "Our Pre-Draft and NBA Combine Mastery program prepares elite prospects to rise on draft boards and enter the NBA with maximum value.",
              points: [
                "PROFESSIONAL PLAYER VALUATION REPORT",
                "CUSTOMIZED NBA COMBINE TRAINING",
                "TARGETED WORKOUTS WITH NBA TEAMS",
              ],
              ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL"
            }
          },
          seo: {
            title: "Pre-Draft & NBA Combine Mastery | Acclimation Sports",
            description: "Prepare to rise on draft boards.",
            keywords: "NBA Draft, Pre-Draft Training"
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
      const response = await fetch("/api/pages/pre-draft", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        toast.success("Pre-Draft Mastery Published Successfully!")
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

  const updateContent = (field: string, value: string | string[]) => {
    setData((prev) => {
      if (!prev) return null
      return {
        ...prev,
        content: {
          ...prev.content,
          preDraft: {
            ...prev.content.preDraft!,
            [field]: value
          }
        }
      }
    })
  }

  const updateSeo = (field: keyof PageData["seo"], value: string | FAQ[]) => {
    setData((prev) => {
      if (!prev) return null
      return {
        ...prev,
        seo: { ...prev.seo, [field]: value }
      }
    })
  }

  const getIcon = (idx: number) => {
    const icons = [
      <CircleDot key={0} className="w-6 h-6 text-primary" />,
      <TrendingUp key={1} className="w-6 h-6 text-primary" />,
      <Target key={2} className="w-6 h-6 text-primary" />,
      <Mic key={3} className="w-6 h-6 text-primary" />,
      <FileText key={4} className="w-6 h-6 text-primary" />,
    ]
    return icons[idx % icons.length]
  }

  if (loading || !data || !data.content.preDraft) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2Icon className="size-10 animate-spin text-blue-500" />
      </div>
    )
  }

  const content = data.content.preDraft

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
                <Image src={content.backgroundImage || "/baskateballplayer.png"} alt="Bg" fill className="object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/60 via-[#05070a]/20 to-[#05070a]" />
              </div>
              
              <div className="container mx-auto px-6 pt-32 pb-12 relative z-10 flex flex-col items-center">
                <div className="space-y-16 max-w-6xl mx-auto text-center">
                  <div className="space-y-6">
                    <GradientHeader tag="h1" size="lg" className="mb-4 text-center">
                      {(content.title || "").split('\n').map((line: string, i: number) => (
                        <React.Fragment key={i}>{line}{i < (content.title || "").split('\n').length - 1 && <br />}</React.Fragment>
                      ))}
                    </GradientHeader>
                    <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 whitespace-pre-line max-w-4xl mx-auto">
                      {content.tagline}
                    </p>
                  </div>

                  <div className="pt-12 flex justify-center w-full text-white">
                    <ul className="space-y-8 max-w-4xl text-left w-full">
                      {(content.points || []).map((point: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-6 group">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/40 transition-all shadow-xl">
                            {getIcon(idx)}
                          </div>
                          <span className="text-base md:text-lg font-bold text-white tracking-tight leading-tight uppercase">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-center pt-8">
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
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Hero Tagline</label>
                    <textarea
                      className="w-full h-32 bg-white/5 border border-white/10 text-white rounded-2xl p-4 text-sm focus:border-blue-500/50 outline-none transition-all resize-none"
                      value={content.tagline}
                      onChange={(e) => updateContent("tagline", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                 <div className="flex items-center justify-between">
                   <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Mastery Points</h2>
                   <Button 
                     onClick={() => updateContent("points", [...content.points, "New Mastery Point"])}
                     className="bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase h-8 px-4 rounded-lg"
                   >
                     <PlusIcon className="size-3 mr-2" /> Add Point
                   </Button>
                 </div>

                 <div className="grid grid-cols-1 gap-3">
                   {(content.points || []).map((point: string, idx: number) => (
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
