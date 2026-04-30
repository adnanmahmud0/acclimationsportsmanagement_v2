"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, PencilIcon, GlobeIcon, Settings2Icon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { PageData } from "@/types/cms"
import Image from "next/image"
import { GradientHeader } from "@/components/gradient-header"
import { CtaButton } from "@/components/cta-button"

export function SalaryCapEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<PageData | null>(null)
  const [editingSection, setEditingSection] = useState<string | null>(null)

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
        // Default data if none exists
        setData({
          slug: "salary-cap",
          title: "Salary Cap Analytics",
          content: {
            salaryCap: {
              title: "Master the Salary Cap. \n Maximize Every Dollar.",
              subtitle: "Proprietary analytical models and expert salary cap strategy that put more money in your pocket. We deliver precise, real-time salary cap modeling and data-driven strategies to optimize every contract.",
              engineTitle: "The Acclimation Salary Cap Engine",
              cardTitles: [
                "Live Salary Cap Forecasting",
                "Luxury Tax Stress Testing",
                "Endorsement & NIL Valuation",
                "Contract Optimization Simulator"
              ],
              points: [
                "In-house salary cap & luxury tax forecasts",
                "Custom analytical projections",
                "Bird Rights and exception optimization",
                "Trade scenario analysis"
              ],
              ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL"
            }
          },
          seo: {
            title: "Salary Cap Analytics | Acclimation Sports",
            description: "Proprietary analytical models and expert salary cap strategy to maximize your earnings.",
            keywords: "NBA Salary Cap, Analytics, Contract Optimization"
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
        toast.success("Page Published Successfully!")
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

  const updateSeo = (field: keyof PageData["seo"], value: string) => {
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
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
      {/* 1. Header & Quick Publish */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#0a0d12]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-xl sticky top-4 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-inner">
            <Settings2Icon className="text-blue-500 size-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight italic">Page Editor <span className="text-blue-500 text-[10px] not-italic align-top ml-1">LIVE</span></h1>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{data.title}</p>
          </div>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-500 text-white border-none shadow-2xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 px-10 font-black text-xs h-12 tracking-widest uppercase rounded-2xl"
        >
          {saving ? <Loader2Icon className="size-4 animate-spin" /> : <SaveIcon className="size-4 mr-2" />}
          Publish to Site
        </Button>
      </div>

      {/* 2. SEO Section */}
      <div className="bg-[#0a0d12]/40 p-6 md:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-8">
          <GlobeIcon className="text-blue-500 size-5" />
          <h2 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Metadata Architecture</h2>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">Window Title</label>
            <Input value={data.seo.title} onChange={(e) => updateSeo("title", e.target.value)} className="bg-white/5 border-white/10 text-white rounded-xl h-11 text-xs" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-white/20 uppercase tracking-widest flex justify-between">
              Search Description
              <span className="text-[8px] opacity-50 lowercase font-normal italic">Recommended: 150-160 chars</span>
            </label>
            <Textarea
              value={data.seo.description}
              onChange={(e) => updateSeo("description", e.target.value)}
              className="bg-white/5 border-white/10 text-white rounded-xl min-h-[110px] text-xs resize-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Visual Preview Section */}
      <div className="rounded-[3rem] overflow-hidden border border-white/5 bg-black shadow-3xl">
        <div className="bg-white/5 px-8 py-3 flex items-center justify-center gap-3 border-b border-white/5">
          <div className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
          <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Live Visual Preview</span>
        </div>

        <PreviewWrapper onEdit={() => setEditingSection("main")}>
          <div className="relative pt-12 pb-24 bg-[#05070a] text-white">
            <div className="absolute inset-x-0 top-0 h-[85vh] z-0">
              <Image src="/graph.png" alt="Bg" fill className="object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/60 via-[#05070a]/20 to-[#05070a]" />
            </div>
            
            <div className="container mx-auto px-6 pt-24 pb-12 relative z-10 flex flex-col items-center">
              <div className="text-center space-y-6 max-w-5xl mx-auto mb-16">
                <GradientHeader tag="h1" size="lg" className="mb-4 text-center">
                  {content.title.split('\n').map((line, i) => (
                    <React.Fragment key={i}>{line}{i < content.title.split('\n').length - 1 && <br />}</React.Fragment>
                  ))}
                </GradientHeader>
                <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 whitespace-pre-line">
                  {content.subtitle}
                </p>
              </div>

              {/* Engine Preview */}
              <div className="w-full max-w-7xl space-y-8 mt-12">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-4 text-primary">
                    <div className="h-[1px] w-12 bg-primary/30" />
                    <span className="text-sm font-black uppercase tracking-[0.4em]">{content.engineTitle}</span>
                    <div className="h-[1px] w-12 bg-primary/30" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {content.cardTitles.map((title, i) => (
                    <div key={i} className="glass-premium p-6 rounded-2xl border-white/10 h-32 flex flex-col justify-between">
                      <h3 className="text-[10px] font-black text-white uppercase tracking-widest leading-tight">{title}</h3>
                      <div className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] italic">Engine Visualization Module</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-4 mt-12">
                  {content.points.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <p className="text-sm font-bold text-white/70 uppercase tracking-widest leading-tight">{p}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-12">
                  <CtaButton href="#">{content.ctaText}</CtaButton>
                </div>
              </div>
            </div>
          </div>
        </PreviewWrapper>
      </div>

      {/* MODAL EDITORS */}
      <Dialog open={editingSection !== null} onOpenChange={(open) => !open && setEditingSection(null)}>
        <DialogContent className="bg-[#0a0d12] border-white/10 text-white sm:max-w-[700px] rounded-[2rem] overflow-hidden p-0 shadow-3xl">
          <DialogHeader className="p-8 border-b border-white/5 bg-white/5">
            <DialogTitle className="text-xl font-black uppercase italic tracking-tighter">
              Edit <span className="text-blue-500">Salary Cap Analytics</span> Content
            </DialogTitle>
          </DialogHeader>

          <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
            <EditField label="Main Heading (use \n for line breaks)" type="textarea" height="h-24" value={content.title} onChange={(v) => updateContent("title", v)} />
            <EditField label="Sub-description" type="textarea" height="h-32" value={content.subtitle} onChange={(v) => updateContent("subtitle", v)} />
            <EditField label="Engine Section Label" value={content.engineTitle} onChange={(v) => updateContent("engineTitle", v)} />

            {/* Engine Cards */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Engine Visualization Modules (Titles Only)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.cardTitles.map((title, idx) => (
                  <div key={idx} className="space-y-2">
                    <label className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Card {idx + 1}</label>
                    <Input value={title} onChange={(e) => {
                      const newTitles = [...content.cardTitles]
                      newTitles[idx] = e.target.value
                      updateContent("cardTitles", newTitles)
                    }} className="bg-white/5 border-white/10 text-white text-xs rounded-xl" />
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy Points */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Core Strategy Points</label>
              <div className="space-y-3">
                {content.points.map((point, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={point}
                      onChange={(e) => {
                        const newPoints = [...content.points]
                        newPoints[idx] = e.target.value
                        updateContent("points", newPoints)
                      }}
                      className="bg-white/5 border-white/10 text-white rounded-xl h-11 text-xs"
                    />
                    <Button variant="ghost" size="icon" onClick={() => {
                      const newPoints = content.points.filter((_, i) => i !== idx)
                      updateContent("points", newPoints)
                    }} className="text-red-500 size-11">×</Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => updateContent("points", [...content.points, "New Strategy Point"])} className="w-full border-dashed border-white/10 h-11 rounded-xl text-[10px] font-black uppercase tracking-widest">+ Add Point</Button>
              </div>
            </div>

            <EditField label="CTA Button Text" value={content.ctaText} onChange={(v) => updateContent("ctaText", v)} />
          </div>

          <DialogFooter className="p-6 bg-white/5 border-t border-white/5">
            <Button onClick={() => setEditingSection(null)} className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] px-8 h-12 rounded-xl">
              Done Editing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PreviewWrapper({ children, onEdit }: { children: React.ReactNode, onEdit: () => void }) {
  return (
    <div className="relative group/section cursor-pointer overflow-hidden" onClick={onEdit}>
      <div className="transition-opacity duration-500 group-hover/section:opacity-40 pointer-events-none">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/section:opacity-100 transition-all duration-300 z-30 bg-blue-600/5">
        <div className="bg-blue-600 text-white size-16 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.8)] scale-75 group-hover/section:scale-100 transition-transform duration-300 border-4 border-white/20">
          <PencilIcon className="size-6" />
        </div>
      </div>
      <div className="absolute top-8 right-8 bg-blue-600 px-6 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] opacity-0 group-hover/section:opacity-100 transition-all duration-300 translate-x-4 group-hover/section:translate-x-0 shadow-2xl z-40">
        Click to Edit Page
      </div>
    </div>
  )
}

function EditField({ label, value, onChange, type = "text", height = "h-24" }: { label: string, value: string, onChange: (v: string) => void, type?: "text" | "textarea", height?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">{label}</label>
      {type === "text" ? (
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="bg-white/5 border-white/10 text-white rounded-xl h-12 text-sm" />
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
