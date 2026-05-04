"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, Settings2Icon, PhoneIcon, MailIcon, MapPinIcon } from "lucide-react"
import { PageData, FAQ } from "@/types/cms"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"

export function ContactPageEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<PageData | null>(null)
  const [activeTab, setActiveTab] = useState<"live" | "seo">("seo")

  const fetchPageData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/pages/contact")
      const result = await response.json()
      if (result.success && result.data) {
        setData(result.data)
      } else {
        setData({
          slug: "contact",
          title: "Contact",
          content: {
            mainTitle: "Ready to Take the Next Step?",
            subDescription: "Any questions or remarks? Just contact us!",
            backgroundImage: "/aurabasketcoart.png",
            points: [
              { title: "Joe's Direct Line", items: ["512-518-6547", "Call or text Joe anytime — 24/7 for serious inquiries"] },
              { title: "Email", items: ["Joseph.Grekoski@AcclimationGroup.com", "Fast responses for NBA, college & high school athletes"] },
              { title: "Office Location", items: ["Acclimation Sports Agency", "Fort Lauderdale, Florida 33308"] },
            ]
          },
          seo: {
            title: "Contact Acclimation Sports Management | Joe Grekoski",
            description: "Connect with Joe Grekoski and the Acclimation team for elite NBA representation.",
            keywords: "contact NBA agent, Joe Grekoski contact"
          }
        })
      }
    } catch {
      toast.error("Failed to fetch page data")
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
      const response = await fetch("/api/pages/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) toast.success("Contact Page Published!")
      else toast.error(result.message)
    } catch {
      toast.error("An error occurred while saving")
    } finally {
      setSaving(false)
    }
  }

  const updateSeo = (field: keyof PageData["seo"], value: string | FAQ[] | boolean) => {
    setData((prev: PageData | null) => {
      if (!prev) return null
      return { ...prev, seo: { ...prev.seo, [field]: value } }
    })
  }

  const updatePoint = (idx: number, itemIdx: number, value: string) => {
    setData((prev) => {
      if (!prev) return null
      const newPoints = [...(prev.content.points || [])]
      newPoints[idx] = { ...newPoints[idx], items: [...(newPoints[idx].items || [])] }
      newPoints[idx].items[itemIdx] = value
      return { ...prev, content: { ...prev.content, points: newPoints } }
    })
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2Icon className="size-10 animate-spin text-blue-500" />
      </div>
    )
  }

  const phone = data.content.points?.[0]
  const email = data.content.points?.[1]
  const location = data.content.points?.[2]

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700 w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-[#0a0d12]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-xl sticky top-4 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-inner">
            <Settings2Icon className="text-blue-500 size-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight italic">Contact Page <span className="text-blue-500 text-[10px] not-italic align-top ml-1">EDITOR</span></h1>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Manage contact info and SEO</p>
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
          {/* Page Basics */}
          <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-6">
            <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Page Header</h2>

            <ImageUpload
              label="Background Image"
              value={data?.content?.backgroundImage || ""}
              onChange={(v) => setData(prev => prev ? ({ ...prev, content: { ...prev.content, backgroundImage: v } }) : null)}
            />

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Main Heading</label>
              <Input
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm"
                value={data?.content?.mainTitle || ""}
                onChange={(e) => setData(prev => prev ? ({ ...prev, content: { ...prev.content, mainTitle: e.target.value } }) : null)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Sub-Description</label>
              <Input
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm"
                value={data?.content?.subDescription || ""}
                onChange={(e) => setData(prev => prev ? ({ ...prev, content: { ...prev.content, subDescription: e.target.value } }) : null)}
              />
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Phone */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-5">
              <div className="flex items-center gap-3">
                <div className="size-9 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/20">
                  <PhoneIcon className="size-4 text-blue-500" />
                </div>
                <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Phone Card</h2>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Card Title</label>
                <Input
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-xs"
                  value={phone?.title || ""}
                  onChange={(e) => setData(prev => {
                    if (!prev) return null
                    const pts = [...(prev.content.points || [])]
                    pts[0] = { ...pts[0], title: e.target.value }
                    return { ...prev, content: { ...prev.content, points: pts } }
                  })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Phone Number</label>
                <Input
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-xs"
                  value={phone?.items?.[0] || ""}
                  onChange={(e) => updatePoint(0, 0, e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Description</label>
                <textarea
                  className="w-full h-24 bg-white/5 border border-white/10 text-white rounded-xl p-3 text-xs focus:border-blue-500/50 outline-none transition-all resize-none"
                  value={phone?.items?.[1] || ""}
                  onChange={(e) => updatePoint(0, 1, e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-5">
              <div className="flex items-center gap-3">
                <div className="size-9 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/20">
                  <MailIcon className="size-4 text-blue-500" />
                </div>
                <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Email Card</h2>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Card Title</label>
                <Input
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-xs"
                  value={email?.title || ""}
                  onChange={(e) => setData(prev => {
                    if (!prev) return null
                    const pts = [...(prev.content.points || [])]
                    pts[1] = { ...pts[1], title: e.target.value }
                    return { ...prev, content: { ...prev.content, points: pts } }
                  })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Email Address</label>
                <Input
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-xs"
                  value={email?.items?.[0] || ""}
                  onChange={(e) => updatePoint(1, 0, e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Description</label>
                <textarea
                  className="w-full h-24 bg-white/5 border border-white/10 text-white rounded-xl p-3 text-xs focus:border-blue-500/50 outline-none transition-all resize-none"
                  value={email?.items?.[1] || ""}
                  onChange={(e) => updatePoint(1, 1, e.target.value)}
                />
              </div>
            </div>

            {/* Location */}
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-5">
              <div className="flex items-center gap-3">
                <div className="size-9 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/20">
                  <MapPinIcon className="size-4 text-blue-500" />
                </div>
                <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Location Card</h2>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Card Title</label>
                <Input
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-xs"
                  value={location?.title || ""}
                  onChange={(e) => setData(prev => {
                    if (!prev) return null
                    const pts = [...(prev.content.points || [])]
                    pts[2] = { ...pts[2], title: e.target.value }
                    return { ...prev, content: { ...prev.content, points: pts } }
                  })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Business Name</label>
                <Input
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-xs"
                  value={location?.items?.[0] || ""}
                  onChange={(e) => updatePoint(2, 0, e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">Address</label>
                <textarea
                  className="w-full h-24 bg-white/5 border border-white/10 text-white rounded-xl p-3 text-xs focus:border-blue-500/50 outline-none transition-all resize-none"
                  value={location?.items?.[1] || ""}
                  onChange={(e) => updatePoint(2, 1, e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
