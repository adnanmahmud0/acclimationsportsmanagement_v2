"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlobeIcon, SaveIcon, InfoIcon, ExternalLinkIcon } from "lucide-react"
import { toast } from "sonner"

export function SitemapConfig() {
  const [domain, setDomain] = useState("https://www.acclimationsportsmanagement.com")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function fetchDomain() {
      try {
        const res = await fetch("/api/admin/settings")
        const result = await res.json()
        if (result.success && result.data.siteDomain) {
          setDomain(result.data.siteDomain)
        }
      } catch (err) {
        console.error("Failed to fetch domain", err)
      } finally {
        setLoading(false)
      }
    }
    fetchDomain()
  }, [])

  const handleSave = async () => {
    if (!domain || !domain.startsWith("http")) {
      toast.error("Please enter a valid URL starting with http:// or https://")
      return
    }

    setSaving(true)
    try {
      const token = localStorage.getItem("accessToken")
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ key: "siteDomain", value: domain.replace(/\/$/, "") }) // remove trailing slash
      })
      const result = await res.json()
      if (result.success) {
        toast.success("Domain updated successfully")
      } else {
        toast.error(result.message || "Failed to update domain")
      }
    } catch {
      toast.error("Error saving domain")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return null

  return (
    <Card className="bg-[#0a0d12]/40 border-white/5 rounded-[2.5rem] overflow-hidden">
      <CardHeader className="p-8 pb-4">
        <div className="flex items-center gap-3">
          <GlobeIcon className="text-blue-500 size-5" />
          <CardTitle className="text-lg font-black text-white uppercase tracking-widest">SEO & Domain Configuration</CardTitle>
        </div>
        <CardDescription className="font-bold text-white/30 uppercase text-[10px] tracking-widest">
          Manage your live domain and search engine connections
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-8">
        
        {/* Domain Input */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Live Website Domain</label>
          <div className="flex flex-col md:flex-row gap-4">
            <Input 
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="https://www.yourdomain.com"
              className="bg-white/5 border-white/10 text-white rounded-xl h-12 text-sm focus:border-blue-500/50 transition-all flex-1"
            />
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-12 px-8 font-black uppercase tracking-widest"
            >
              {saving ? "Saving..." : <><SaveIcon className="size-4 mr-2" /> Save Domain</>}
            </Button>
          </div>
          <p className="text-[10px] text-white/30 italic">
            Changing this domain automatically updates all URLs inside your dynamic sitemap.
          </p>
        </div>

        {/* Sitemap Instructions */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <InfoIcon className="text-blue-400 size-5 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">How the Sitemap Works</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Your sitemap is 100% automatic. Every page you edit or create in the CMS will automatically appear in the sitemap within hours. 
                <br /><br />
                <span className="text-white font-bold">The admin&apos;s only task (One-time setup):</span>
              </p>
              
              <ol className="list-decimal list-inside text-xs text-white/60 space-y-2 pt-2 pb-2">
                <li>Go to <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Google Search Console</a></li>
                <li>Add your website</li>
                <li>Submit the following URL:</li>
              </ol>

              <div className="flex items-center gap-2 bg-black/40 p-3 rounded-lg border border-white/5">
                <code className="text-blue-300 text-xs flex-1 break-all select-all">
                  {domain}/sitemap.xml
                </code>
                <a 
                  href={`${domain}/sitemap.xml`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-white/40 hover:text-white transition-colors"
                  title="View Live Sitemap"
                >
                  <ExternalLinkIcon className="size-4" />
                </a>
              </div>
              
              <p className="text-[10px] text-white/40 pt-2 uppercase tracking-widest font-bold">
                After submission, everything is automatic forever.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
