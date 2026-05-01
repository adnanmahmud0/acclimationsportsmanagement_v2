"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, PencilIcon, GlobeIcon, Settings2Icon, BarChart3, Mic2, Handshake, Network, Trophy } from "lucide-react"
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

export function MarketingEndorsementsEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<PageData | null>(null)
  const [editingSection, setEditingSection] = useState<string | null>(null)

  useEffect(() => {
    fetchPageData()
  }, [])

  const fetchPageData = async () => {
    try {
      const response = await fetch("/api/pages/marketing-endorsements")
      const result = await response.json()
      if (result.success && result.data) {
        setData(result.data)
      } else {
        // Default data
        setData({
          slug: "marketing-endorsements",
          title: "Marketing & Endorsements",
          content: {
            marketingEndorsements: {
              title: "Marketing and \n Endorsement Deals",
              tagline: "We build and monetize your personal brand so you earn maximum value from endorsements, sponsorships, and marketing opportunities. elite high school talent turn their talent into real off-court income.",
              items: [
                { title: "Professional brand valuation and market positioning", desc: "Analysis of your market value and strategic positioning", iconType: "chart" },
                { title: "Media training and personal branding development", desc: "", iconType: "mic" },
                { title: "Targeted endorsement strategy and deal sourcing", desc: "Negotiation of sponsorships, NIL deals, and long-term partnerships", iconType: "handshake" },
                { title: "Full integration with your NBA contract for maximum career earnings", desc: "Seamless alignment with your professional contract", iconType: "network" },
                { title: "Long-term portfolio growth and legacy building", desc: "Strategies to ensure sustained off-court success", iconType: "trophy" },
              ],
              transitionQuote: "Whether you're chasing your first major shoe deal, building your NIL portfolio, or expanding your brand as a NBA player, we make sure you're never undervalued in the marketplace.",
              readyHeading: "Ready to unlock your full earning potential off the court?",
              ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL"
            }
          },
          seo: {
            title: "Marketing & Endorsements | Acclimation Sports",
            description: "Build and monetize your personal brand with elite endorsement deals and strategic marketing.",
            keywords: "Athlete Marketing, NBA Endorsements, NIL Deals"
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
      const response = await fetch("/api/pages/marketing-endorsements", {
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
          marketingEndorsements: {
            ...prev.content.marketingEndorsements!,
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

  const getIcon = (type: string) => {
    switch (type) {
      case "chart": return <BarChart3 className="w-5 h-5 text-primary" />;
      case "mic": return <Mic2 className="w-5 h-5 text-primary" />;
      case "handshake": return <Handshake className="w-5 h-5 text-primary" />;
      case "network": return <Network className="w-5 h-5 text-primary" />;
      case "trophy": return <Trophy className="w-5 h-5 text-primary" />;
      default: return <Trophy className="w-5 h-5 text-primary" />;
    }
  };

  if (loading || !data || !data.content.marketingEndorsements) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2Icon className="size-10 animate-spin text-blue-500" />
      </div>
    )
  }

  const content = data.content.marketingEndorsements

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
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

      {/* SEO Section */}
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
            <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">Search Description</label>
            <Textarea
              value={data.seo.description}
              onChange={(e) => updateSeo("description", e.target.value)}
              className="bg-white/5 border-white/10 text-white rounded-xl min-h-[110px] text-xs resize-none"
            />
          </div>
        </div>
      </div>

      {/* Visual Preview Section */}
      <div className="rounded-[3rem] overflow-hidden border border-white/5 bg-black shadow-3xl">
        <div className="bg-white/5 px-8 py-3 flex items-center justify-center gap-3 border-b border-white/5">
          <div className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
          <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Live Visual Preview</span>
        </div>

        <PreviewWrapper onEdit={() => setEditingSection("main")}>
          <div className="relative pt-12 pb-24 bg-[#05070a] text-white">
            <div className="absolute inset-0 z-0">
              <Image src="/fullbuscatecoart.png" alt="Bg" fill className="object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/90 via-[#05070a]/40 to-[#05070a]" />
            </div>
            
            <div className="container mx-auto px-6 pt-24 pb-12 relative z-10 flex flex-col items-center text-center">
              <div className="space-y-12 max-w-5xl mx-auto">
                <div className="space-y-6">
                  <GradientHeader tag="h1" size="lg" className="mb-4 text-center">
                    {content.title.split('\n').map((line, i) => (
                      <React.Fragment key={i}>{line}{i < content.title.split('\n').length - 1 && <br />}</React.Fragment>
                    ))}
                  </GradientHeader>
                  <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 whitespace-pre-line">
                    {content.tagline}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-10 py-8 w-full max-w-4xl mx-auto">
                  <ul className="space-y-8 text-left w-full">
                    {content.items.map((item, i) => (
                      <li key={i} className="flex gap-6">
                        <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          {getIcon(item.iconType)}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-lg md:text-xl font-black text-white tracking-tight leading-tight uppercase">{item.title}</h4>
                          {item.desc && <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest">{item.desc}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6 max-w-4xl mx-auto">
                  <p className="text-white/60 text-lg font-bold tracking-wide leading-relaxed italic">
                    &quot;{content.transitionQuote}&quot;
                  </p>
                  <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
                    {content.readyHeading}
                  </h2>
                </div>

                <div className="pt-6">
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
              Edit <span className="text-blue-500">Marketing & Endorsements</span>
            </DialogTitle>
          </DialogHeader>

          <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
            <EditField label="Main Heading" type="textarea" height="h-24" value={content.title} onChange={(v) => updateContent("title", v)} />
            <EditField label="Hero Tagline" type="textarea" height="h-32" value={content.tagline} onChange={(v) => updateContent("tagline", v)} />

            {/* List Items */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Service Items</label>
              <div className="space-y-6">
                {content.items.map((item, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-xl space-y-3 border border-white/5">
                    <div className="flex justify-between items-center">
                      <label className="text-[8px] font-bold text-primary uppercase">Item {idx + 1}</label>
                    </div>
                    <Input value={item.title} onChange={(e) => {
                      const newItems = [...content.items]
                      newItems[idx].title = e.target.value
                      updateContent("items", newItems)
                    }} placeholder="Title" className="bg-white/5 border-white/10 text-white text-xs font-black uppercase" />
                    <Input value={item.desc} onChange={(e) => {
                      const newItems = [...content.items]
                      newItems[idx].desc = e.target.value
                      updateContent("items", newItems)
                    }} placeholder="Description (Optional)" className="bg-white/5 border-white/10 text-white text-[10px]" />
                  </div>
                ))}
              </div>
            </div>

            <EditField label="Transition Quote" type="textarea" height="h-24" value={content.transitionQuote} onChange={(v) => updateContent("transitionQuote", v)} />
            <EditField label="Ready Heading" value={content.readyHeading} onChange={(v) => updateContent("readyHeading", v)} />
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
