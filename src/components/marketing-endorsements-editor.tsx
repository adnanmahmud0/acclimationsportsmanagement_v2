"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, Settings2Icon, BarChart3, Mic2, Handshake, Network, Trophy } from "lucide-react"
import { PageData, FAQ, MarketingEndorsementItem } from "@/types/cms"
import Image from "next/image"
import { GradientHeader } from "@/components/gradient-header"
import { CtaButton } from "@/components/cta-button"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"

export function MarketingEndorsementsEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<PageData | null>(null)
  const [activeTab, setActiveTab] = useState<"live" | "seo">("seo")

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
        setData({
          slug: "marketing-endorsements",
          title: "Marketing & Endorsements",
          content: {
            marketingEndorsements: {
              title: "Marketing and \n Endorsement Deals",
              tagline: "We build and monetize your personal brand so you earn maximum value from endorsements, sponsorships, and marketing opportunities.",
              items: [
                { title: "Professional brand valuation", desc: "Analysis of market value", iconType: "chart" },
                { title: "Media training", desc: "Personal branding development", iconType: "mic" },
              ],
              transitionQuote: "Whether you're chasing your first major shoe deal or expanding your brand, we make sure you're never undervalued.",
              readyHeading: "Ready to unlock your full potential?",
              ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL"
            }
          },
          seo: {
            title: "Marketing & Endorsements | Acclimation Sports",
            description: "Build and monetize your personal brand.",
            keywords: "Athlete Marketing, NBA Endorsements",
            faqs: []
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
        toast.success("Marketing & Endorsements Published Successfully!")
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

  const updateSeo = (field: keyof PageData["seo"], value: string | FAQ[]) => {
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
                <Image src={content.backgroundImage || "/fullbuscatecoart.png"} alt="Bg" fill className="object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/90 via-[#05070a]/40 to-[#05070a]" />
              </div>
              
              <div className="container mx-auto px-6 pt-24 pb-12 relative z-10 flex flex-col items-center text-center text-white">
                <div className="space-y-12 max-w-5xl mx-auto">
                  <div className="space-y-6">
                    <GradientHeader tag="h1" size="lg" className="mb-4 text-center">
                      {(content.title || "").split('\n').map((line: string, i: number) => (
                        <React.Fragment key={i}>{line}{i < (content.title || "").split('\n').length - 1 && <br />}</React.Fragment>
                      ))}
                    </GradientHeader>
                    <p className="text-sm font-bold tracking-[0.3em] uppercase text-white/50 mb-4 whitespace-pre-line">
                      {content.tagline}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-10 py-8 w-full max-w-4xl mx-auto">
                    <ul className="space-y-8 text-left w-full">
                      {content.items.map((item: MarketingEndorsementItem, i: number) => (
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
                 <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Marketing Highlights</h2>
                 <div className="grid grid-cols-1 gap-4">
                   {content.items.map((item: MarketingEndorsementItem, idx: number) => (
                     <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                           <span className="text-[10px] font-black text-primary uppercase tracking-widest">Highlight {idx + 1}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-1">
                             <label className="text-[8px] font-black text-white/10 uppercase tracking-widest">Icon</label>
                             <select 
                               value={item.iconType} 
                               onChange={(e) => {
                                 const newItems = [...content.items]
                                 newItems[idx].iconType = e.target.value as MarketingEndorsementItem["iconType"]
                                 updateContent("items", newItems)
                               }}
                               className="w-full bg-black/40 border border-white/10 rounded-xl h-10 px-3 text-[10px] text-white uppercase font-black"
                             >
                               <option value="chart">Chart</option>
                               <option value="mic">Mic</option>
                               <option value="handshake">Handshake</option>
                               <option value="network">Network</option>
                               <option value="trophy">Trophy</option>
                             </select>
                           </div>
                           <div className="space-y-1">
                             <label className="text-[8px] font-black text-white/10 uppercase tracking-widest">Title</label>
                             <Input 
                               value={item.title} 
                               onChange={(e) => {
                                 const newItems = [...content.items]
                                 newItems[idx].title = e.target.value
                                 updateContent("items", newItems)
                               }}
                               className="bg-black/40 border-white/10 text-white h-10 text-xs font-black uppercase"
                             />
                           </div>
                        </div>
                        <div className="space-y-1">
                           <label className="text-[8px] font-black text-white/10 uppercase tracking-widest">Description</label>
                           <textarea
                             value={item.desc}
                             onChange={(e) => {
                               const newItems = [...content.items]
                               newItems[idx].desc = e.target.value
                               updateContent("items", newItems)
                             }}
                             className="w-full bg-black/40 border border-white/10 rounded-xl h-20 p-3 text-xs text-white resize-none"
                           />
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

              <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
                <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Footer Messaging</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Transition Quote</label>
                    <textarea
                      className="w-full h-24 bg-white/5 border border-white/10 text-white rounded-2xl p-4 text-xs italic font-medium resize-none"
                      value={content.transitionQuote}
                      onChange={(e) => updateContent("transitionQuote", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Ready Heading</label>
                    <Input
                      className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-xs font-black uppercase"
                      value={content.readyHeading}
                      onChange={(e) => updateContent("readyHeading", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
