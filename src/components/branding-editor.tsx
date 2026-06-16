"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { 
  SaveIcon, 
  Loader2Icon, 
  Settings2Icon, 
  LayoutIcon, 
  MonitorIcon, 
  SmartphoneIcon,
  ScalingIcon,
  ExternalLinkIcon
} from "lucide-react"
import { ImageUpload } from "@/components/image-upload"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card"
import Image from "next/image"

interface BrandingData {
  navbarLogo: string;
  navbarLogoSize: number;
  footerLogo: string;
  footerLogoSize: number;
  adminSidebarLogo: string;
  adminSidebarLogoSize: number;
  favicon: string;
}

export function BrandingEditor() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<BrandingData>({
    navbarLogo: "",
    navbarLogoSize: 220,
    footerLogo: "",
    footerLogoSize: 200,
    adminSidebarLogo: "",
    adminSidebarLogoSize: 140,
    favicon: ""
  })

  useEffect(() => {
    fetchBranding()
  }, [])

  const fetchBranding = async () => {
    try {
      const response = await fetch("/api/branding")
      const result = await response.json()
      if (result.success && result.data) {
        setData(result.data)
      }
    } catch (error) {
      console.error("Fetch branding error:", error)
      toast.error("Failed to fetch branding settings")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("/api/branding", {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        toast.success("Branding updated successfully")
        // Trigger a refresh of components that use these settings if needed
        // Or just let the user see the live preview and then reload
      } else {
        toast.error(result.message)
      }
    } catch {
      toast.error("An error occurred while saving")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2Icon className="size-10 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-[#0a0d12]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-xl sticky top-4 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-inner">
            <Settings2Icon className="text-blue-500 size-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight italic">Logo & Branding <span className="text-blue-500 text-[10px] not-italic align-top ml-1">MANAGER</span></h1>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Configure global logos and site identity</p>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-500 text-white border-none shadow-2xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 px-10 font-black text-xs h-12 tracking-widest uppercase rounded-2xl shrink-0"
        >
          {saving ? <Loader2Icon className="size-4 animate-spin" /> : <SaveIcon className="size-4 mr-2" />}
          Update Branding
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Navbar Logo */}
          <Card className="border-white/5 bg-[#0a0d12]/40 backdrop-blur-md overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/20">
                  <MonitorIcon className="size-4 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-sm font-black uppercase tracking-tight">Navbar Identity</CardTitle>
                  <CardDescription className="text-[10px] uppercase font-bold text-white/20">Logo appearing in top navigation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <ImageUpload 
                label="Navbar Logo" 
                value={data.navbarLogo} 
                onChange={(v) => setData({ ...data, navbarLogo: v })} 
              />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Logo Width (px)</label>
                  <span className="text-xs font-mono text-blue-500">{data.navbarLogoSize}px</span>
                </div>
                <div className="flex items-center gap-4">
                  <ScalingIcon className="size-4 text-white/20" />
                  <input 
                    type="range" 
                    min="50" 
                    max="500" 
                    value={data.navbarLogoSize} 
                    onChange={(e) => setData({ ...data, navbarLogoSize: parseInt(e.target.value) })}
                    className="flex-1 accent-blue-500 h-1 bg-white/5 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Logo */}
          <Card className="border-white/5 bg-[#0a0d12]/40 backdrop-blur-md overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/20">
                  <LayoutIcon className="size-4 text-purple-500" />
                </div>
                <div>
                  <CardTitle className="text-sm font-black uppercase tracking-tight">Footer Identity</CardTitle>
                  <CardDescription className="text-[10px] uppercase font-bold text-white/20">Logo appearing in site footer</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <ImageUpload 
                label="Footer Logo" 
                value={data.footerLogo} 
                onChange={(v) => setData({ ...data, footerLogo: v })} 
              />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Logo Width (px)</label>
                  <span className="text-xs font-mono text-purple-500">{data.footerLogoSize}px</span>
                </div>
                <div className="flex items-center gap-4">
                  <ScalingIcon className="size-4 text-white/20" />
                  <input 
                    type="range" 
                    min="50" 
                    max="500" 
                    value={data.footerLogoSize} 
                    onChange={(e) => setData({ ...data, footerLogoSize: parseInt(e.target.value) })}
                    className="flex-1 accent-purple-500 h-1 bg-white/5 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Sidebar Logo */}
          <Card className="border-white/5 bg-[#0a0d12]/40 backdrop-blur-md overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-500/20">
                  <Settings2Icon className="size-4 text-emerald-500" />
                </div>
                <div>
                  <CardTitle className="text-sm font-black uppercase tracking-tight">Admin Sidebar Identity</CardTitle>
                  <CardDescription className="text-[10px] uppercase font-bold text-white/20">Logo appearing in admin dashboard</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <ImageUpload 
                label="Admin Sidebar Logo" 
                value={data.adminSidebarLogo} 
                onChange={(v) => setData({ ...data, adminSidebarLogo: v })} 
              />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Logo Width (px)</label>
                  <span className="text-xs font-mono text-emerald-500">{data.adminSidebarLogoSize}px</span>
                </div>
                <div className="flex items-center gap-4">
                  <ScalingIcon className="size-4 text-white/20" />
                  <input 
                    type="range" 
                    min="50" 
                    max="300" 
                    value={data.adminSidebarLogoSize} 
                    onChange={(e) => setData({ ...data, adminSidebarLogoSize: parseInt(e.target.value) })}
                    className="flex-1 accent-emerald-500 h-1 bg-white/5 rounded-full appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Favicon */}
          <Card className="border-white/5 bg-[#0a0d12]/40 backdrop-blur-md overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-orange-500/20 rounded-lg flex items-center justify-center border border-orange-500/20">
                  <SmartphoneIcon className="size-4 text-orange-500" />
                </div>
                <div>
                  <CardTitle className="text-sm font-black uppercase tracking-tight">Site Identity (Favicon)</CardTitle>
                  <CardDescription className="text-[10px] uppercase font-bold text-white/20">Browser icon and tab identity</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ImageUpload 
                label="Favicon Logo" 
                value={data.favicon} 
                onChange={(v) => setData({ ...data, favicon: v })} 
              />
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-4 flex items-center gap-2">
                <ExternalLinkIcon className="size-3" />
                Recommended: Square PNG or ICO file (32x32 or 64x64)
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 lg:sticky lg:top-24 h-fit">
          {/* Live Preview */}
          <Card className="border-white/5 bg-[#05070a] shadow-3xl overflow-hidden min-h-[600px] flex flex-col">
            <CardHeader className="bg-white/5 border-b border-white/5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-black uppercase tracking-tight flex items-center gap-2">
                   <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                   Live Identity Preview
                </CardTitle>
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-white/10" />
                  <div className="size-2.5 rounded-full bg-white/10" />
                  <div className="size-2.5 rounded-full bg-white/10" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-y-auto no-scrollbar bg-[url('/analitic.png')] bg-cover bg-center">
               <div className="min-h-full bg-black/80 backdrop-blur-sm flex flex-col">
                  {/* Navbar Preview */}
                  <div className="h-16 border-b border-white/10 flex items-center px-6 bg-black/40">
                    <div className="relative" style={{ width: data.navbarLogoSize }}>
                      <Image 
                        src={data.navbarLogo || "/logo/AcclimationLogo-Horizontal.png"} 
                        alt="Navbar Logo" 
                        width={data.navbarLogoSize} 
                        height={40} 
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 flex justify-end gap-4">
                       <div className="h-2 w-12 bg-white/10 rounded-full" />
                       <div className="h-2 w-12 bg-white/10 rounded-full" />
                       <div className="h-2 w-12 bg-white/10 rounded-full" />
                    </div>
                  </div>

                  {/* Body Preview */}
                  <div className="flex-1 p-12 space-y-6">
                     <div className="h-8 w-48 bg-blue-500/20 rounded-lg" />
                     <div className="space-y-3">
                       <div className="h-3 w-full bg-white/5 rounded-full" />
                       <div className="h-3 w-full bg-white/5 rounded-full" />
                       <div className="h-3 w-2/3 bg-white/5 rounded-full" />
                     </div>

                     <div className="grid grid-cols-2 gap-4 mt-8">
                       <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center p-8">
                          <Image 
                            src={data.adminSidebarLogo || "/logo/AcclimationLogo-Horizontal.png"} 
                            alt="Sidebar Logo" 
                            width={data.adminSidebarLogoSize} 
                            height={30} 
                            className="object-contain"
                            unoptimized
                          />
                          <p className="absolute bottom-4 text-[8px] font-black text-white/20 uppercase tracking-widest">Sidebar Preview</p>
                       </div>
                       <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-3">
                          <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2">
                             <Image 
                               src={data.favicon || "/favicon.ico"} 
                               alt="Favicon" 
                               width={32} 
                               height={32} 
                               className="object-contain"
                               unoptimized
                             />
                          </div>
                          <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Favicon Preview</p>
                       </div>
                     </div>
                  </div>

                  {/* Footer Preview */}
                  <div className="p-12 bg-black border-t border-white/10 mt-auto">
                    <div className="grid grid-cols-2 gap-12">
                       <div className="space-y-4">
                          <Image 
                            src={data.footerLogo || "/logo/AcclimationLogo-Horizontal.png"} 
                            alt="Footer Logo" 
                            width={data.footerLogoSize} 
                            height={40} 
                            className="object-contain"
                            unoptimized
                          />
                          <div className="h-2 w-32 bg-white/5 rounded-full" />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                             <div className="h-2 w-16 bg-white/10 rounded-full" />
                             <div className="h-1.5 w-12 bg-white/5 rounded-full" />
                             <div className="h-1.5 w-12 bg-white/5 rounded-full" />
                          </div>
                          <div className="space-y-2">
                             <div className="h-2 w-16 bg-white/10 rounded-full" />
                             <div className="h-1.5 w-12 bg-white/5 rounded-full" />
                             <div className="h-1.5 w-12 bg-white/5 rounded-full" />
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
