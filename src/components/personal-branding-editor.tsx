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

export function PersonalBrandingEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<PageData | null>(null)
  const [editingSection, setEditingSection] = useState<string | null>(null)

  useEffect(() => {
    fetchPageData()
  }, [])

  const fetchPageData = async () => {
    try {
      const response = await fetch("/api/pages/personal-branding")
      const result = await response.json()
      if (result.success && result.data) {
        setData(result.data)
      } else {
        // Default data if none exists
        setData({
          slug: "personal-branding",
          title: "Personal Branding",
          content: {
            personalBranding: {
              title: "Turn Your Talent Into a \n Premium, Monetizable \n Economic Asset",
              tagline: "Personal Brand Development: the art of truly identifying the unique value, \n data-backed and scaling strategically and carefully, then to view the potential.",
              metrics: [
                { title: "Brand Equity", value: "$1.2M" },
                { title: "Social Reach", value: "2.4M" },
                { title: "Endorsement Value", value: "$850K" },
              ],
              services: [
                { title: "Personal Brand Strategy", desc: "Personal brand strategy to guarantee and optimize valuation and monetization." },
                { title: "Endorsement Deal", desc: "Endorsement negotiation and contract review sent to the highest value." },
                { title: "Media Training Programs", desc: "Media training programs to ensure you are ready and strategic and confident." },
              ],
              resultsTitle: "Personal Brand Strategy | Negotiation:",
              highlights: [
                { value: "$8.2M", label: "Average Uplift in \n Endorsement Value" },
                { value: "340%", label: "Brand \n Growth" },
              ]
            }
          },
          seo: {
            title: "Personal Branding | Acclimation Sports",
            description: "Turn your talent into a premium, monetizable economic asset with our expert brand strategy.",
            keywords: "Personal Branding, NBA Brand, Athlete Marketing"
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
      const response = await fetch("/api/pages/personal-branding", {
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
          personalBranding: {
            ...prev.content.personalBranding!,
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

  if (loading || !data || !data.content.personalBranding) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2Icon className="size-10 animate-spin text-blue-500" />
      </div>
    )
  }

  const content = data.content.personalBranding

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

        {/* Previews */}
        <div className="mt-10 pt-8 border-t border-white/5">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <label className="text-[9px] font-black text-white/20 uppercase tracking-widest block">Google Preview</label>
              <div className="bg-white rounded-xl p-6 shadow-xl max-w-xl">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-100">
                    <Image src="/logo/AcclimationLogo-Vartical.png" alt="Logo" width={24} height={24} />
                  </div>
                  <div className="text-[12px] text-[#202124]">Acclimation Sports</div>
                </div>
                <div className="text-[20px] text-[#1a0dab] font-medium leading-tight mb-1">{data.seo.title}</div>
                <div className="text-[14px] text-[#4d5156] line-clamp-2">{data.seo.description}</div>
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[9px] font-black text-white/20 uppercase tracking-widest block">Social Media Preview</label>
              <div className="bg-[#18191a] rounded-xl overflow-hidden border border-white/10 shadow-xl max-w-md">
                <div className="aspect-[1.91/1] bg-white relative flex items-center justify-center p-8">
                  <Image src="/logo/AcclimationLogo-Vartical.png" alt="Logo" width={140} height={140} className="object-contain" />
                </div>
                <div className="p-3 bg-[#242526]">
                  <div className="text-[11px] text-[#b0b3b8] uppercase">acclimationsports.com</div>
                  <div className="text-[16px] text-white font-bold line-clamp-1">{data.seo.title}</div>
                  <div className="text-[14px] text-[#b0b3b8] line-clamp-1">{data.seo.description}</div>
                </div>
              </div>
            </div>
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
          <div className="relative pt-12 pb-24 bg-[#05070a]">
            <div className="absolute inset-0 z-0">
              <Image src="/glove.png" alt="Bg" fill className="object-cover opacity-50" />
            </div>
            
            <div className="container mx-auto px-6 pt-24 pb-12 relative z-10 flex flex-col items-center">
              <div className="text-center space-y-4 mb-12">
                <GradientHeader tag="h1" size="lg" className="mb-4 text-center">
                  {content.title.split('\n').map((line, i) => (
                    <React.Fragment key={i}>{line}{i < content.title.split('\n').length - 1 && <br />}</React.Fragment>
                  ))}
                </GradientHeader>
                <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 whitespace-pre-line">
                  {content.tagline}
                </p>
              </div>

              {/* Metrics Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
                {content.metrics.map((m, i) => (
                  <div key={i} className="bg-[#0a0d12]/95 border border-primary/30 p-6 rounded-3xl backdrop-blur-xl shadow-2xl text-center">
                    <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{m.title}</div>
                    <div className="text-3xl font-black text-white">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Services & Highlights Preview */}
              <div className="w-full max-w-7xl space-y-12 bg-gradient-to-t from-[#05070a] via-[#05070a]/80 to-transparent p-8 md:p-12 rounded-[3rem] border border-white/5 backdrop-blur-sm mt-12">
                <div className="flex flex-col lg:flex-row gap-12 items-end">
                  <div className="flex-1 space-y-8">
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight drop-shadow-lg">
                      {content.resultsTitle.split('|')[0]} | <span className="text-primary">{content.resultsTitle.split('|')[1]}</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {content.services.map((s, i) => (
                        <div key={i} className="bg-[#0a0d12]/95 border border-white/10 p-6 rounded-2xl space-y-4">
                          <div className="flex gap-3 items-center">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <h4 className="text-white font-black uppercase text-sm tracking-widest">{s.title}</h4>
                          </div>
                          <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">{s.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-1/3 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      {content.highlights.map((h, i) => (
                        <div key={i} className="bg-[#0a0d12]/95 border border-primary/20 p-8 rounded-2xl shadow-2xl text-center">
                          <div className="text-4xl font-black text-white mb-2">{h.value}</div>
                          <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest leading-relaxed whitespace-pre-line">{h.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <CtaButton href="#">SCHEDULE YOUR CALL</CtaButton>
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
              Edit <span className="text-blue-500">Personal Branding</span> Content
            </DialogTitle>
          </DialogHeader>

          <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
            <EditField label="Main Heading (use \n for line breaks)" type="textarea" height="h-24" value={content.title} onChange={(v) => updateContent("title", v)} />
            <EditField label="Tagline / Sub-description" type="textarea" height="h-24" value={content.tagline} onChange={(v) => updateContent("tagline", v)} />

            {/* Metrics */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Brand Metrics</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {content.metrics.map((m, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-xl space-y-3">
                    <Input value={m.title} onChange={(e) => {
                      const newMetrics = [...content.metrics]
                      newMetrics[idx].title = e.target.value
                      updateContent("metrics", newMetrics)
                    }} placeholder="Metric Title" className="bg-white/5 border-white/10 text-white text-[10px]" />
                    <Input value={m.value} onChange={(e) => {
                      const newMetrics = [...content.metrics]
                      newMetrics[idx].value = e.target.value
                      updateContent("metrics", newMetrics)
                    }} placeholder="Value" className="bg-white/5 border-white/10 text-white text-xs font-bold" />
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Strategy Boxes</label>
              <div className="space-y-4">
                {content.services.map((s, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-xl space-y-3 border border-white/5">
                    <Input value={s.title} onChange={(e) => {
                      const newServices = [...content.services]
                      newServices[idx].title = e.target.value
                      updateContent("services", newServices)
                    }} placeholder="Service Title" className="bg-white/5 border-white/10 text-white text-xs font-black uppercase" />
                    <Textarea value={s.desc} onChange={(e) => {
                      const newServices = [...content.services]
                      newServices[idx].desc = e.target.value
                      updateContent("services", newServices)
                    }} placeholder="Description" className="bg-white/5 border-white/10 text-white text-[10px] resize-none" />
                  </div>
                ))}
              </div>
            </div>

            <EditField label="Results Section Title (use | for primary color split)" value={content.resultsTitle} onChange={(v) => updateContent("resultsTitle", v)} />

            {/* Highlights */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Potential Results Highlights</label>
              <div className="grid grid-cols-2 gap-4">
                {content.highlights.map((h, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-xl space-y-3">
                    <Input value={h.value} onChange={(e) => {
                      const newHighlights = [...content.highlights]
                      newHighlights[idx].value = e.target.value
                      updateContent("highlights", newHighlights)
                    }} placeholder="Value" className="bg-white/5 border-white/10 text-white text-xl font-black" />
                    <Textarea value={h.label} onChange={(e) => {
                      const newHighlights = [...content.highlights]
                      newHighlights[idx].label = e.target.value
                      updateContent("highlights", newHighlights)
                    }} placeholder="Label (use \n for breaks)" className="bg-white/5 border-white/10 text-white text-[10px] h-16 resize-none" />
                  </div>
                ))}
              </div>
            </div>
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
