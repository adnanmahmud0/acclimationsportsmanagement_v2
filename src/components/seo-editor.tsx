"use client"

import React from "react"
import { GlobeIcon } from "lucide-react"
import { PageData, FAQ } from "@/types/cms"
import Image from "next/image"

// Individual imports to be safe
import { Button as UIButton } from "@/components/ui/button"
import { Input as UIInput } from "@/components/ui/input"
import { Textarea as UITextarea } from "@/components/ui/textarea"

interface SeoEditorProps {
  data: PageData
  updateSeo: (field: keyof PageData["seo"], value: string | FAQ[]) => void
}

export function SeoEditor({ data, updateSeo }: SeoEditorProps) {
  return (
    <div className="bg-[#0a0d12]/40 p-6 md:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-8">
        <GlobeIcon className="text-blue-500 size-5" />
        <h2 className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Metadata Architecture</h2>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">Window Title</label>
          <UIInput 
            value={data.seo.title} 
            onChange={(e) => updateSeo("title", e.target.value)} 
            className="bg-white/5 border-white/10 text-white rounded-xl h-11 text-xs focus:border-blue-500/50 transition-all" 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-[9px] font-black text-white/20 uppercase tracking-widest flex justify-between">
            Search Description
            <span className="text-[8px] opacity-50 lowercase font-normal italic">Recommended: 150-160 characters</span>
          </label>
          <UITextarea
            value={data.seo.description}
            onChange={(e) => updateSeo("description", e.target.value)}
            placeholder="A brief summary of your page for search engine results."
            className="bg-white/5 border-white/10 text-white rounded-xl min-h-[110px] text-xs focus:border-blue-500/50 transition-all resize-none p-4 leading-relaxed"
          />
        </div>

        <div className="space-y-2 pt-4 border-t border-white/5">
           <label className="text-[9px] font-black text-white/20 uppercase tracking-widest block mb-2">Social Media Preview Image (OG Image)</label>
           <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <input 
                type="file" 
                className="hidden" 
                id="og-image-upload" 
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  const formData = new FormData()
                  formData.append("file", file)
                  try {
                    const res = await fetch("/api/upload", { method: "POST", body: formData })
                    const result = await res.json()
                    if (result.success) {
                      updateSeo("ogImage", result.url)
                    }
                  } catch (err) {
                    console.error("Upload failed", err)
                  }
                }}
              />
              <div className="flex items-center gap-6">
                <div className="relative w-32 aspect-[1.91/1] rounded-lg overflow-hidden bg-black border border-white/10 shrink-0">
                  {data.seo.ogImage ? (
                    <Image src={data.seo.ogImage} alt="OG Preview" fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/10 font-black uppercase">No Image</div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">
                    This image appears when your link is shared on social media (Twitter, LinkedIn, etc.)
                  </p>
                  <div className="flex gap-2">
                    <UIButton 
                      size="sm" 
                      onClick={() => document.getElementById("og-image-upload")?.click()}
                      className="bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white border border-blue-500/20 text-[10px] font-black uppercase tracking-widest h-9 px-4 rounded-xl"
                    >
                      {data.seo.ogImage ? "Change Image" : "Upload Image"}
                    </UIButton>
                    {data.seo.ogImage && (
                      <UIButton 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => updateSeo("ogImage", "")}
                        className="text-red-500/40 hover:text-red-500 hover:bg-red-500/10 text-[10px] font-black uppercase tracking-widest h-9 px-4 rounded-xl"
                      >
                        Remove
                      </UIButton>
                    )}
                  </div>
                </div>
              </div>
           </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-white/5">
          <label className="text-[9px] font-black text-white/20 uppercase tracking-widest block mb-2">Search Keywords</label>
          <div className="flex gap-2 mb-4">
            <UIInput
              placeholder="Type keyword and press Enter..."
              className="bg-white/5 border-white/10 text-white rounded-xl h-11 text-xs focus:border-blue-500/50 transition-all flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  const val = (e.target as HTMLInputElement).value.trim()
                  if (val) {
                    const current = data.seo.keywords ? data.seo.keywords.split(",").map((k: string) => k.trim()).filter(Boolean) : []
                    if (!current.includes(val)) {
                      updateSeo("keywords", [...current, val].join(", "))
                      ;(e.target as HTMLInputElement).value = ""
                    }
                  }
                }
              }}
            />
            <UIButton
              onClick={() => {
                const input = document.querySelector('input[placeholder="Type keyword and press Enter..."]') as HTMLInputElement
                if (input) {
                  const val = input.value.trim()
                  if (val) {
                    const current = data.seo.keywords ? data.seo.keywords.split(",").map((k: string) => k.trim()).filter(Boolean) : []
                    if (!current.includes(val)) {
                      updateSeo("keywords", [...current, val].join(", "))
                      input.value = ""
                    }
                  }
                }
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 h-11 text-xs font-black uppercase tracking-widest"
            >
              +
            </UIButton>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {(data.seo.keywords ? data.seo.keywords.split(",").map((k: string) => k.trim()).filter(Boolean) : []).map((keyword: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full group transition-all hover:bg-blue-500/20">
                <span className="text-[11px] font-bold text-blue-400">{keyword}</span>
                <button
                  onClick={() => {
                    const keywords = data.seo.keywords.split(",").map((k: string) => k.trim()).filter((_: string, i: number) => i !== idx)
                    updateSeo("keywords", keywords.join(", "))
                  }}
                  className="text-blue-500/40 hover:text-red-500 transition-colors text-xs font-black leading-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="space-y-4 pt-6 border-t border-white/5">
          <div className="flex items-center justify-between">
            <label className="text-[9px] font-black text-white/20 uppercase tracking-widest">Search Engine FAQs</label>
            <UIButton 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                const newFaqs = [...(data.seo.faqs || []), { question: "", answer: "" }]
                updateSeo("faqs", newFaqs)
              }}
              className="text-blue-500 text-[10px] font-black uppercase hover:bg-blue-500/10 h-7 px-3 rounded-lg border border-blue-500/20"
            >
              + Add FAQ
            </UIButton>
          </div>
          
          <div className="space-y-4">
            {(data.seo.faqs || []).map((faq, idx) => (
              <div key={idx} className="bg-white/5 p-4 rounded-2xl space-y-3 border border-white/5 relative group animate-in slide-in-from-top-2 duration-300">
                <UIButton 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    const newFaqs = data.seo.faqs?.filter((_, i) => i !== idx) || []
                    updateSeo("faqs", newFaqs)
                  }}
                  className="absolute top-2 right-2 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all h-6 w-6 p-0 rounded-full"
                >
                  ×
                </UIButton>
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-white/10 uppercase tracking-[0.2em] ml-1">Question</label>
                  <UIInput 
                    value={faq.question} 
                    onChange={(e) => {
                      const newFaqs = [...(data.seo.faqs || [])]
                      newFaqs[idx].question = e.target.value
                      updateSeo("faqs", newFaqs)
                    }} 
                    placeholder="e.g. How do NIL deals work for high schoolers?" 
                    className="bg-white/5 border-white/5 text-white h-10 text-xs font-bold rounded-xl focus:border-blue-500/30 transition-all" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-white/10 uppercase tracking-[0.2em] ml-1">Answer</label>
                  <UITextarea 
                    value={faq.answer} 
                    onChange={(e) => {
                      const newFaqs = [...(data.seo.faqs || [])]
                      newFaqs[idx].answer = e.target.value
                      updateSeo("faqs", newFaqs)
                    }} 
                    placeholder="Provide a clear, concise answer for search results..." 
                    className="bg-white/5 border-white/5 text-white text-[11px] resize-none min-h-[80px] rounded-xl focus:border-blue-500/30 transition-all" 
                  />
                </div>
              </div>
            ))}
            {(!data.seo.faqs || data.seo.faqs.length === 0) && (
              <div className="py-8 border-2 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center text-center px-6">
                <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.2em]">No SEO FAQs configured</p>
                <p className="text-[9px] text-white/5 mt-1">Add FAQs to improve your search engine presence</p>
              </div>
            )}
          </div>
        </div>

        {/* PREVIEW SECTION */}
        <div className="mt-10 pt-8 border-t border-white/5">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Google Preview */}
            <div className="space-y-6">
              <label className="text-[9px] font-black text-white/20 uppercase tracking-widest block mb-4">Google Search Preview</label>
              <div className="max-w-2xl bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
                <div className="flex flex-col gap-1.5 text-left">
                  <div className="flex items-center gap-2 text-[14px] text-[#202124]">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden border border-gray-100 p-0.5">
                      <Image src="/logo/AcclimationLogo-Vartical.png" alt="Logo" width={24} height={24} className="object-contain" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] leading-tight font-normal text-black">Acclimation Sports Management</span>
                      <span className="text-[12px] leading-tight text-[#5f6368] truncate">https://acclimationsports.com</span>
                    </div>
                  </div>
                  <h3 className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer font-medium leading-tight mt-1 line-clamp-1">
                    {data.seo.title || "Acclimation Sports Management | Elite NBA Representation"}
                  </h3>
                  <p className="text-[14px] text-[#4d5156] leading-snug mt-1 line-clamp-2 min-h-[40px]">
                    {data.seo.description || "Leading NBA agency providing precision economic analysis, contract negotiation, and holistic player support for elite athletes."}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Card Preview */}
            <div className="space-y-6">
              <label className="text-[9px] font-black text-white/20 uppercase tracking-widest block mb-4">Social Media Preview</label>
              <div className="max-w-md bg-[#18191a] rounded-xl overflow-hidden border border-white/10 shadow-2xl font-sans text-left">
                <div className="relative aspect-[1.91/1] bg-white flex items-center justify-center overflow-hidden p-8">
                   <Image src={data.seo.ogImage || "/logo/AcclimationLogo-Vartical.png"} alt="Logo" fill={!!data.seo.ogImage} width={!data.seo.ogImage ? 140 : undefined} height={!data.seo.ogImage ? 140 : undefined} className="object-contain" />
                </div>
                <div className="p-4 bg-[#242526] border-t border-white/5">
                  <div className="text-[11px] text-[#b0b3b8] uppercase tracking-wider mb-1 font-medium">acclimationsports.com</div>
                  <div className="text-[16px] text-[#e4e6eb] font-bold line-clamp-1 mb-1">
                    {data.seo.title || "Acclimation Sports Management"}
                  </div>
                  <div className="text-[14px] text-[#b0b3b8] line-clamp-1">
                    {data.seo.description || "Elite NBA representation and contract negotiation."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
