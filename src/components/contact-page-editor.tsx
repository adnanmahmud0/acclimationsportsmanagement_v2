"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { SaveIcon, Loader2Icon, Settings2Icon, PhoneIcon } from "lucide-react"
import { PageData, FAQ } from "@/types/cms"
import { SeoEditor } from "@/components/seo-editor"
import { ImageUpload } from "@/components/image-upload"
import { ContactSection } from "@/components/contact-section"

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
              locationTitle: "Office Location",
              backgroundImage: "/bascatecoart_v6.png"
            }
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

  const updateContent = (field: string, value: string) => {
    setData((prev) => {
      if (!prev) return null
      const content = { ...prev.content }
      const contactData = { ...(content.contact || {}), [field]: value }
      // @ts-expect-error - contactData might be partial but is being built
      content.contact = contactData
      return { ...prev, content }
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
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-[#0a0d12]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-xl sticky top-4 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-inner">
            <Settings2Icon className="text-blue-500 size-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight italic">Contact Page <span className="text-blue-500 text-[10px] not-italic align-top ml-1">EDITOR</span></h1>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Manage contact information, visual branding, and SEO</p>
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
          
          {/* Section 4: Contact Section */}
          <section className="space-y-8">
            <PreviewBlock title="Contact Page Preview">
              <ContactSection data={data} />
            </PreviewBlock>
            
            <div className="bg-[#0a0d12]/40 p-8 rounded-[2.5rem] border border-white/5 space-y-12">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="size-8 bg-cyan-600/20 rounded-lg flex items-center justify-center border border-cyan-500/20">
                  <PhoneIcon className="size-4 text-cyan-500" />
                </div>
                <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em]">Direct Communication Hardening</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest ml-1">Branding & Headers</h3>
                   <ImageUpload label="Contact BG" value={data?.content?.contact?.backgroundImage || ""} onChange={(v) => updateContent("backgroundImage", v)} />
                   <EditField label="Main Heading" value={data?.content?.contact?.title || ""} onChange={(v) => updateContent("title", v)} />
                   <EditField label="Sub-Tagline" value={data?.content?.contact?.tagline || ""} onChange={(v) => updateContent("tagline", v)} />
                </div>
                <div className="space-y-6">
                   <h3 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest ml-1">Contact Intelligence</h3>
                   <div className="space-y-4">
                      {/* Phone */}
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                        <EditField label="Phone Title" value={data?.content?.contact?.phoneTitle || ""} onChange={(v) => updateContent("phoneTitle", v)} />
                        <EditField label="Phone Number" value={data?.content?.contact?.phone || ""} onChange={(v) => updateContent("phone", v)} />
                        <EditField label="Phone Description" type="textarea" height="h-20" value={data?.content?.contact?.phoneDesc || ""} onChange={(v) => updateContent("phoneDesc", v)} />
                      </div>
                      {/* Email */}
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                        <EditField label="Email Title" value={data?.content?.contact?.emailTitle || ""} onChange={(v) => updateContent("emailTitle", v)} />
                        <EditField label="Email Address" value={data?.content?.contact?.email || ""} onChange={(v) => updateContent("email", v)} />
                        <EditField label="Email Description" type="textarea" height="h-20" value={data?.content?.contact?.emailDesc || ""} onChange={(v) => updateContent("emailDesc", v)} />
                      </div>
                      {/* Location */}
                      <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                        <EditField label="Location Title" value={data?.content?.contact?.locationTitle || ""} onChange={(v) => updateContent("locationTitle", v)} />
                        <EditField label="Full Office Address" type="textarea" height="h-24" value={data?.content?.contact?.location || ""} onChange={(v) => updateContent("location", v)} />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}
    </div>
  )
}

function PreviewBlock({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="w-full rounded-[3rem] overflow-hidden border border-white/5 bg-black shadow-3xl">
      <div className="bg-white/5 px-8 py-3 flex items-center justify-center gap-3 border-b border-white/5">
        <div className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">{title}</span>
      </div>
      <div className="relative pointer-events-none opacity-90 transition-all">
        {children}
      </div>
    </div>
  )
}

function EditField({ label, value, onChange, type = "text", height = "h-24" }: { label: string, value: string, onChange: (v: string) => void, type?: "text" | "textarea", height?: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-1">{label}</label>
      {type === "text" ? (
        <Input 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          className="bg-white/5 border-white/10 text-white rounded-xl h-11 text-xs font-bold" 
        />
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

