"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, PencilIcon, Settings2Icon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import { Hero } from "@/components/hero"
import { OneStopShop } from "@/components/one-stop-shop"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { PageData, FAQ } from "@/types/cms"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"

export function HomePageEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<PageData | null>(null)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"live" | "seo">("seo")

  useEffect(() => {
    fetchPageData()
  }, [])

  const fetchPageData = async () => {
    try {
      const response = await fetch("/api/pages/home")
      const result = await response.json()
      if (result.success) {
        setData(result.data)
      } else {
        setData({
          slug: "home",
          title: "Home Page",
          content: {
            hero: {
              title: "Where Economic Precision \n Meets NBA Domination",
              tagline: "A New Kind of Basketball Agency",
              features: ["20+ Years Economic Edge", "Real-Time Salary Cap Forecasting", "Litigation-Grade Strategy", "In-House Analytics", "Lower Fees & More In Your Pocket"],
              cards: [
                { title: "NBA Contract Negotiation", desc: "Data-driven deals with litigation-grade strategy.", type: "shield" },
                { title: "Brand Development", desc: "Turn your talent into a premium economic asset.", type: "trending" },
                { title: "Marketing and Endorsements", desc: "Proprietary analytics ensure you're never underpaid.", type: "handshake" },
                { title: "Holistic Support", desc: "Elite trainers, chefs, wealth advisors & strategists.", type: "trophy" },
              ],
              chart: {
                title: "Projected Career Value Growth",
                data: [
                  { year: 1, value: 2.5, label: "Year 1: $2.5M" },
                  { year: 4, value: 8.1, label: "Year 4: $8.1M" },
                  { year: 8, value: 15.3, label: "Year 8: $15.3M" },
                  { year: 12, value: 22.7, label: "Year 12: $22.7M" },
                ]
              }
            },
            oneStopShop: {
              title: "One-Stop Shop for Everything",
              description: "We do it all — contract negotiation, salary-cap strategy, brand & endorsement deals, pre-draft mastery, analytics, and full concierge support.",
              ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
              points: [
                {
                  title: "Pre-Draft and NBA Combine Mastery",
                  items: ["Data-driven positioning", "Medical evaluation strategy", "Elite scouting access", "Athletic profiling that sets your entire NBA career foundation."]
                },
                {
                  title: "Proprietary Salary Cap and Analytical Models",
                  items: ["Real-time forecasting", "Luxury-tax modeling", "Endorsement valuation algorithms", "Market value simulations", "In-house analytics that consistently put more money in your pocket."]
                },
                {
                  title: "Litigation-Grade NBA Contract Negotiation",
                  items: ["Precision tactics", "Courtroom-proven leverage", "Unprecedented leverage", "Better deals at significantly lower fees", "Career-longevity protection"]
                },
                {
                  title: "Generational Wealth and Business Empire",
                  items: ["Off-court brand architecture", "Endorsement empire building", "Private-jet concierge support", "Elite trainers, CPAs & wealth advisors", "Legacy planning", "Dynamics"]
                }
              ]
            },
            about: {
              title: "About Acclimation Sports Management\nLed by Joe Grekoski",
              subtitle: "I am a certified agent from the National Basketball Players Association (NBPA).",
              description: "Joe Grekoski is the founder of Acclimation Group and Acclimation Sports Management...",
              focusText: "While other agents focus only on basketball, Joe Grekoski built Acclimation Sports Management as the true one-stop shop. You just play basketball. We handle everything else.",
              ctaText: "SCHEDULE YOUR CONFIDENTIAL CONTRACT STRATEGY CALL",
              bullets: [
                "Launched Acclimation Group and built it into a premier advisory firm serving top law firms worldwide.",
                "Advised on the sale of IP assets to professional sports teams using advanced social media sentiment analysis.",
                "Featured on CBS News discussing college basketball economics and player valuation.",
                "Expert in determining fair market rates for endorsement deals and NIL valuation.",
                "Brings courtroom-tested economic analysis to NBA contract negotiation.",
                "His goal is clear: to help elite NBA players, college prospects, and 5-star high-school talents succeed."
              ],
              specialties: [
                "Intellectual Property Expert",
                "Personal Brand Valuation Specialist",
                "Endorsement Market Rate Authority",
                "IP Asset Valuation for Professional Sports Teams",
                "Featured on CBS News",
                "You Just Play Basketball",
                "Acclimation Sports Management",
              ]
            },
            contact: {
              title: "Ready to Take the Next Step?",
              tagline: "Any questions or remarks? Just contact us!",
              phone: "512-518-6547",
              phoneTitle: "Joe's Direct Line",
              phoneDesc: "Call or text Joe anytime —\n24/7 for serious inquiries",
              email: "Joseph.Grekoski@AcclimationGroup.com",
              emailTitle: "Email",
              emailDesc: "Fast responses for NBA,\ncollege & high school athletes",
              location: "Acclimation Sports Agency\nFort Lauderdale, Florida 33308",
              locationTitle: "Office Location"
            }
          },
          seo: { title: "Acclimation Sports Management", description: "Elite NBA representation.", keywords: "NBA Agent" }
        })
      }
    } catch {
      toast.error("Failed to fetch page data")
    } finally {
      setLoading(false)
    }
  }

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
      return {
        ...prev,
        content: { ...prev.content, [section]: { ...(prev.content[section] as unknown as Record<string, unknown>), [field]: value } }
      }
    })
  }

  const updateSeo = (field: keyof PageData["seo"], value: string | FAQ[]) => {
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
        <div className="space-y-1 w-full rounded-[3rem] overflow-hidden border border-white/5 bg-black shadow-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white/5 px-8 py-3 flex items-center justify-center gap-3 border-b border-white/5">
            <div className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Visual Preview</span>
          </div>

          {/* HERO SECTION */}
          <PreviewWrapper onEdit={() => setEditingSection("hero")}>
            <Hero data={data} />
          </PreviewWrapper>

          {/* SERVICE SECTION */}
          <PreviewWrapper onEdit={() => setEditingSection("oneStopShop")}>
            <OneStopShop data={data} />
          </PreviewWrapper>

          {/* ABOUT SECTION */}
          <PreviewWrapper onEdit={() => setEditingSection("about")}>
            <AboutSection data={data} />
          </PreviewWrapper>

          {/* CONTACT SECTION */}
          <PreviewWrapper onEdit={() => setEditingSection("contact")}>
            <ContactSection data={data} />
          </PreviewWrapper>
        </div>
      )}

      {/* MODAL EDITORS */}
      <Dialog open={editingSection !== null} onOpenChange={(open) => !open && setEditingSection(null)}>
        <DialogContent className="bg-[#0a0d12] border-white/10 text-white sm:max-w-[600px] rounded-[2rem] overflow-hidden p-0">
          <DialogHeader className="p-8 border-b border-white/5">
            <DialogTitle className="text-xl font-black uppercase italic tracking-tighter">
              Edit Section: <span className="text-blue-500">{editingSection?.toUpperCase()}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
            {editingSection === "hero" && (
              <>
                <ImageUpload label="Hero Background Image" value={data.content.backgroundImage || ""} onChange={(v) => setData(prev => prev ? ({ ...prev, content: { ...prev.content, backgroundImage: v } }) : null)} />
                <EditField label="Hero Title" type="textarea" value={data.content.hero?.title || ""} onChange={(v) => updateContent("hero", "title", v)} />
                <EditField label="Tagline" value={data.content.hero?.tagline || ""} onChange={(v) => updateContent("hero", "tagline", v)} />
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Core Features Bar</label>
                  <div className="space-y-3">
                    {(data.content.hero?.features || []).map((feature: string, idx: number) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={feature}
                          onChange={(e) => {
                            const newFeatures = [...(data.content.hero?.features || [])]
                            newFeatures[idx] = e.target.value
                            updateContent("hero", "features", newFeatures)
                          }}
                          className="bg-white/5 border-white/10 text-white rounded-xl h-10 text-xs"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newFeatures = (data.content.hero?.features || []).filter((_: string, i: number) => i !== idx)
                            updateContent("hero", "features", newFeatures)
                          }}
                          className="text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newFeatures = [...(data.content.hero?.features || []), "New Feature"]
                        updateContent("hero", "features", newFeatures)
                      }}
                      className="w-full border-dashed border-white/10 text-white/40 hover:text-white hover:border-white/20 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest"
                    >
                      + Add Feature
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Service Cards</label>
                  <div className="space-y-6">
                    {data.content.hero?.cards?.map((card: { title: string, type: string, desc: string }, idx: number) => (
                      <div key={idx} className="bg-white/5 p-4 rounded-2xl space-y-3 relative border border-white/5">
                        <div className="grid md:grid-cols-2 gap-3">
                          <EditField label="Card Title" value={card.title} onChange={(v) => {
                            const newCards = [...(data.content.hero?.cards || [])]
                            newCards[idx].title = v
                            updateContent("hero", "cards", newCards)
                          }} />
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Icon Type</label>
                            <select
                              value={card.type}
                              onChange={(e) => {
                                const newCards = [...(data.content.hero?.cards || [])]
                                newCards[idx].type = e.target.value
                                updateContent("hero", "cards", newCards)
                              }}
                              className="w-full bg-white/5 border border-white/10 text-white rounded-xl h-12 text-sm px-4 focus:border-blue-500/50 outline-none"
                            >
                              <option value="shield">Shield</option>
                              <option value="trending">Trending</option>
                              <option value="handshake">Handshake</option>
                              <option value="trophy">Trophy</option>
                            </select>
                          </div>
                        </div>
                        <EditField label="Description" type="textarea" height="h-16" value={card.desc} onChange={(v) => {
                          const newCards = [...(data.content.hero?.cards || [])]
                          newCards[idx].desc = v
                          updateContent("hero", "cards", newCards)
                        }} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Career Growth Chart</label>
                  <div className="bg-white/5 p-4 rounded-2xl space-y-4 border border-white/5">
                    <EditField label="Chart Title" value={data.content.hero?.chart?.title || ""} onChange={(v) => {
                      const newChart = { ...(data.content.hero?.chart || { title: "", data: [] }), title: v }
                      updateContent("hero", "chart", newChart)
                    }} />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {(data.content.hero?.chart?.data || []).map((point: { year: number, value: number, label?: string }, idx: number) => (
                        <div key={idx} className="space-y-2">
                          <label className="text-[8px] font-black text-white/20 uppercase tracking-widest">Year {point.year} Value ($M)</label>
                          <Input
                            type="number"
                            step="0.1"
                            value={point.value}
                            onChange={(e) => {
                              const newData = [...(data.content.hero?.chart?.data || [])]
                              newData[idx].value = parseFloat(e.target.value)
                              newData[idx].label = `Year ${point.year}: $${e.target.value}M`
                              updateContent("hero", "chart", { ...(data.content.hero?.chart || { title: "", data: [] }), data: newData })
                            }}
                            className="bg-white/10 border-white/10 text-white rounded-lg h-9 text-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
            {editingSection === "oneStopShop" && (
              <>
                <ImageUpload label="Background Image" value={data.content.oneStopShop?.backgroundImage || ""} onChange={(v) => updateContent("oneStopShop", "backgroundImage", v)} />
                <EditField label="Section Title" value={data.content.oneStopShop?.title || ""} onChange={(v) => updateContent("oneStopShop", "title", v)} />
                <EditField label="Description" type="textarea" value={data.content.oneStopShop?.description || ""} onChange={(v) => updateContent("oneStopShop", "description", v)} />
                <EditField label="CTA Button Text" value={data.content.oneStopShop?.ctaText || ""} onChange={(v) => updateContent("oneStopShop", "ctaText", v)} />

                <div className="space-y-6 pt-4 border-t border-white/5">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Service Categories</label>
                  {(data.content.oneStopShop?.points || []).map((point: { title: string, items: string[] }, idx: number) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-2xl space-y-4 border border-white/5 relative group">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newPoints = (data.content.oneStopShop?.points || []).filter((_: { title: string, items: string[] }, i: number) => i !== idx)
                          updateContent("oneStopShop", "points", newPoints)
                        }}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </Button>
                      <EditField label={`Category ${idx + 1} Title`} value={point.title} onChange={(v) => {
                        const newPoints = [...(data.content.oneStopShop?.points || [])]
                        newPoints[idx].title = v
                        updateContent("oneStopShop", "points", newPoints)
                      }} />

                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-white/20 uppercase tracking-widest block">Bullet Points</label>
                        {point.items?.map((item: string, i: number) => (
                          <div key={i} className="flex gap-2">
                            <Input
                              value={item}
                              onChange={(e) => {
                                const newPoints = [...(data.content.oneStopShop?.points || [])]
                                newPoints[idx].items[i] = e.target.value
                                updateContent("oneStopShop", "points", newPoints)
                              }}
                              className="bg-white/5 border-white/10 text-white rounded-xl h-9 text-xs"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                const newPoints = [...(data.content.oneStopShop?.points || [])]
                                newPoints[idx].items = newPoints[idx].items.filter((_: string, index: number) => index !== i)
                                updateContent("oneStopShop", "points", newPoints)
                              }}
                              className="text-red-500 hover:text-red-400 size-9"
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newPoints = [...(data.content.oneStopShop?.points || [])]
                            newPoints[idx].items = [...newPoints[idx].items, "New point..."]
                            updateContent("oneStopShop", "points", newPoints)
                          }}
                          className="w-full border-dashed border-white/10 text-white/40 hover:text-white h-8 rounded-lg text-[9px] font-black uppercase"
                        >
                          + Add Bullet
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={() => {
                      const currentPoints = data.content.oneStopShop?.points || []
                      const newPoints = [...currentPoints, { title: "New Service Category", items: ["New bullet point..."] }]
                      updateContent("oneStopShop", "points", newPoints)
                    }}
                    className="w-full bg-blue-600/10 border border-dashed border-blue-500/20 text-blue-500 hover:bg-blue-600 hover:text-white font-black uppercase tracking-widest text-[10px] h-12 rounded-2xl transition-all"
                  >
                    + Add New Service Category
                  </Button>
                </div>
              </>
            )}
            {editingSection === "about" && (
              <>
                <ImageUpload label="Background Image" value={data.content.about?.backgroundImage || ""} onChange={(v) => updateContent("about", "backgroundImage", v)} />
                <ImageUpload label="Joe's Profile Image" value={data.content.about?.profileImage || ""} onChange={(v) => updateContent("about", "profileImage", v)} />
                <EditField label="About Heading" type="textarea" value={data.content.about?.title || ""} onChange={(v) => updateContent("about", "title", v)} />
                <EditField label="Certification Subtitle" value={data.content.about?.subtitle || ""} onChange={(v) => updateContent("about", "subtitle", v)} />
                <EditField label="Bio Description" type="textarea" height="h-32" value={data.content.about?.description || ""} onChange={(v) => updateContent("about", "description", v)} />
                <EditField label="Bottom Focus Text" type="textarea" height="h-24" value={data.content.about?.focusText || ""} onChange={(v) => updateContent("about", "focusText", v)} />
                <EditField label="CTA Button Text" value={data.content.about?.ctaText || ""} onChange={(v) => updateContent("about", "ctaText", v)} />

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Achievement Bullets</label>
                  {(data.content.about?.bullets || []).map((bullet: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        value={bullet}
                        onChange={(e) => {
                          const newBullets = [...(data.content.about?.bullets || [])]
                          newBullets[idx] = e.target.value
                          updateContent("about", "bullets", newBullets)
                        }}
                        className="bg-white/5 border-white/10 text-white rounded-xl h-10 text-xs"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newBullets = (data.content.about?.bullets || []).filter((_: string, i: number) => i !== idx)
                          updateContent("about", "bullets", newBullets)
                        }}
                        className="text-red-500 hover:text-red-400 size-10"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newBullets = [...(data.content.about?.bullets || []), "New achievement..."]
                      updateContent("about", "bullets", newBullets)
                    }}
                    className="w-full border-dashed border-white/10 text-white/40 hover:text-white h-10 rounded-xl text-[10px] font-black uppercase"
                  >
                    + Add Achievement
                  </Button>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Specialty Marquee</label>
                  {(data.content.about?.specialties || []).map((spec: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <Input
                        value={spec}
                        onChange={(e) => {
                          const newSpecs = [...(data.content.about?.specialties || [])]
                          newSpecs[idx] = e.target.value
                          updateContent("about", "specialties", newSpecs)
                        }}
                        className="bg-white/5 border-white/10 text-white rounded-xl h-10 text-xs"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newSpecs = (data.content.about?.specialties || []).filter((_: string, i: number) => i !== idx)
                          updateContent("about", "specialties", newSpecs)
                        }}
                        className="text-red-500 hover:text-red-400 size-10"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newSpecs = [...(data.content.about?.specialties || []), "New specialty..."]
                      updateContent("about", "specialties", newSpecs)
                    }}
                    className="w-full border-dashed border-white/10 text-white/40 hover:text-white h-10 rounded-xl text-[10px] font-black uppercase"
                  >
                    + Add Specialty
                  </Button>
                </div>
              </>
            )}
            {editingSection === "contact" && (
              <>
                <ImageUpload label="Background Image" value={data.content.contact?.backgroundImage || ""} onChange={(v) => updateContent("contact", "backgroundImage", v)} />
                <EditField label="Contact Heading" value={data.content.contact?.title || ""} onChange={(v) => updateContent("contact", "title", v)} />
                <EditField label="Tagline" value={data.content.contact?.tagline || ""} onChange={(v) => updateContent("contact", "tagline", v)} />

                <div className="space-y-6 pt-4 border-t border-white/5">
                  <div className="bg-white/5 p-4 rounded-2xl space-y-4 border border-white/5">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Direct Line Card</label>
                    <EditField label="Card Title" value={data.content.contact?.phoneTitle || ""} onChange={(v) => updateContent("contact", "phoneTitle", v)} />
                    <EditField label="Phone Number" value={data.content.contact?.phone || ""} onChange={(v) => updateContent("contact", "phone", v)} />
                    <EditField label="Description" type="textarea" height="h-20" value={data.content.contact?.phoneDesc || ""} onChange={(v) => updateContent("contact", "phoneDesc", v)} />
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl space-y-4 border border-white/5">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Email Card</label>
                    <EditField label="Card Title" value={data.content.contact?.emailTitle || ""} onChange={(v) => updateContent("contact", "emailTitle", v)} />
                    <EditField label="Email Address" value={data.content.contact?.email || ""} onChange={(v) => updateContent("contact", "email", v)} />
                    <EditField label="Description" type="textarea" height="h-20" value={data.content.contact?.emailDesc || ""} onChange={(v) => updateContent("contact", "emailDesc", v)} />
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl space-y-4 border border-white/5">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block">Location Card</label>
                    <EditField label="Card Title" value={data.content.contact?.locationTitle || ""} onChange={(v) => updateContent("contact", "locationTitle", v)} />
                    <EditField label="Location Details" type="textarea" height="h-24" value={data.content.contact?.location || ""} onChange={(v) => updateContent("contact", "location", v)} />
                  </div>
                </div>
              </>
            )}
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
    <div
      className="relative group/section cursor-pointer overflow-hidden"
      onClick={onEdit}
    >
      <div className="transition-opacity duration-500 group-hover/section:opacity-40 pointer-events-none">
        {children}
      </div>

      {/* Edit Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/section:opacity-100 transition-all duration-300 z-30 bg-blue-600/5">
        <div className="bg-blue-600 text-white size-16 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.8)] scale-75 group-hover/section:scale-100 transition-transform duration-300 border-4 border-white/20">
          <PencilIcon className="size-6" />
        </div>
      </div>

      <div className="absolute top-8 right-8 bg-blue-600 px-6 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] opacity-0 group-hover/section:opacity-100 transition-all duration-300 translate-x-4 group-hover/section:translate-x-0 shadow-2xl z-40">
        Click to Edit Section
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
