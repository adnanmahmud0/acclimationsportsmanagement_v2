"use client"

import React, { useState, useEffect } from "react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { SaveIcon, RefreshCwIcon, GlobeIcon, Trash2Icon } from "lucide-react"

interface PageSeo {
  slug: string;
  title: string;
  seo: {
    noIndex?: boolean;
    sitemapPriority?: number;
    sitemapChangeFreq?: string;
  };
}

// Sub-component for each row to manage its own state and satisfy Base UI "controlled" requirements
function SitemapRow({ 
  page, 
  onUpdate, 
  onDelete 
}: { 
  page: PageSeo, 
  onUpdate: (slug: string, updates: Partial<PageSeo["seo"]>) => Promise<void>,
  onDelete: (slug: string) => Promise<void>
}) {
  const [priority, setPriority] = useState(page.seo?.sitemapPriority?.toString() ?? "0.7")
  const [frequency, setFrequency] = useState(page.seo?.sitemapChangeFreq ?? "monthly")
  const [noIndex, setNoIndex] = useState(!!page.seo?.noIndex)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await onUpdate(page.slug, {
      sitemapPriority: parseFloat(priority),
      sitemapChangeFreq: frequency,
      noIndex: noIndex
    })
    setSaving(false)
  }

  return (
    <TableRow className="hover:bg-white/5 border-white/5">
      <TableCell className="font-medium">{page.title}</TableCell>
      <TableCell className="text-muted-foreground text-xs">/{page.slug}</TableCell>
      <TableCell className="text-center">
        <div className="flex justify-center">
          <Checkbox 
            checked={noIndex} 
            onCheckedChange={(checked) => setNoIndex(!!checked)}
            disabled={saving}
          />
        </div>
      </TableCell>
      <TableCell>
        <Input 
          type="number" 
          step="0.1" 
          min="0" 
          max="1" 
          className="h-8 w-20 text-xs"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={saving}
        />
      </TableCell>
      <TableCell>
        <Select 
          value={frequency}
          onValueChange={(val) => val && setFrequency(val)}
          disabled={saving}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="always">Always</SelectItem>
            <SelectItem value="hourly">Hourly</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
            <SelectItem value="never">Never</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 hover:text-red-500 hover:bg-red-500/10"
            disabled={saving}
            onClick={() => onDelete(page.slug)}
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8"
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? (
              <RefreshCwIcon className="h-4 w-4 animate-spin" />
            ) : (
              <SaveIcon className="h-4 w-4 text-primary" />
            )}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export function SitemapManager() {
  const [pages, setPages] = useState<PageSeo[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    setRefreshing(true)
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("/api/admin/sitemap", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await response.json()
      if (result.success) {
        setPages(result.data)
      }
    } catch (error) {
      console.error("Fetch sitemap error:", error)
      toast.error("Failed to load sitemap data")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleUpdate = async (slug: string, updates: Partial<PageSeo["seo"]>) => {
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch(`/api/pages/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          seo: updates
        }),
      })

      const result = await response.json()
      if (result.success) {
        toast.success(`Updated ${slug}`)
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error("Failed to update sitemap settings")
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete the page "${slug}"? This action cannot be undone.`)) return

    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch(`/api/pages/${slug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })

      const result = await response.json()
      if (result.success) {
        toast.success(`Deleted ${slug}`)
        setPages(pages.filter(p => p.slug !== slug))
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error("Failed to delete page")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-primary">
        <RefreshCwIcon className="w-6 h-6 animate-spin" />
        <span className="ml-3 text-muted-foreground font-medium">Analyzing Sitemap...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-white/5 bg-[#05070a]/50 backdrop-blur-sm shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <GlobeIcon className="w-5 h-5 text-primary" />
              Sitemap & Indexing Manager
            </CardTitle>
            <CardDescription>
              Configure strategic visibility and priority for search engine crawlers.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={fetchPages} disabled={refreshing} className="glass-premium border-white/10">
            <RefreshCwIcon className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Sync Pages
          </Button>
        </CardHeader>
        <CardContent>
          {/* SEO Information Guide */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 shadow-inner">
              <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2 uppercase tracking-wider">
                <GlobeIcon className="w-4 h-4" />
                Home Page Optimization
              </h4>
              <p className="text-xs text-white/60 leading-relaxed font-medium">
                The main Home route (<strong>/</strong>) is automatically optimized as a system priority. 
                It is permanently set to <strong className="text-primary">1.0 Priority</strong> and <strong>Weekly</strong> frequency 
                to ensure maximum branding visibility.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-inner">
              <h4 className="text-sm font-bold text-white/80 mb-2 uppercase tracking-wider">SEO Definitions</h4>
              <ul className="space-y-2 text-[11px] text-white/50 font-medium">
                <li>
                  <strong className="text-white/70">Priority (0.1 - 1.0):</strong> Helps search engines understand which pages are core assets relative to your other pages.
                </li>
                <li>
                  <strong className="text-white/70">Change Freq:</strong> Advises bots on how often to re-scan for new strategic updates and data.
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/5 border-b border-white/5">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[200px]">Page Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="text-center w-[100px]">No Index</TableHead>
                  <TableHead className="w-[150px]">Priority</TableHead>
                  <TableHead className="w-[180px]">Crawl Frequency</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages
                  .filter(p => {
                    const isSystemRoute = ["home", "contact"].includes(p.slug);
                    const isImageFile = /\.(png|jpg|jpeg|webp|gif|svg|ico)$/i.test(p.slug);
                    return !isSystemRoute && !isImageFile;
                  })
                  .map((page) => (
                    <SitemapRow 
                      key={page.slug} 
                      page={page} 
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                    />
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button 
          variant="link" 
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
          onClick={() => window.open("/sitemap.xml", "_blank")}
        >
          View live sitemap.xml
        </Button>
      </div>
    </div>
  )
}
