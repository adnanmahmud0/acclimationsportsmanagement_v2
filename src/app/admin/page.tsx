"use client"

import React, { useEffect, useState } from "react"
import { 
  FileTextIcon, 
  UsersIcon, 
  EyeIcon, 
  ArrowRightIcon,
  HistoryIcon,
  LayoutIcon,
  ExternalLinkIcon
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Stats {
  totalPages: number
  totalAdmins: number
  lastEditedPages: Array<{
    _id: string
    slug: string
    title: string
    updatedAt: string
  }>
  totalViews: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/stats")
        const result = await response.json()
        if (result.success) {
          setStats(result.data)
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-white/50 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">Acclimation Sports Management Intelligence</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank">
            <Button className="rounded-xl h-11 px-6 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20 bg-white text-black hover:bg-white/90">
              <ExternalLinkIcon className="mr-2 size-4" /> Go to Website
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Content Pages" 
          value={stats.totalPages} 
          icon={<LayoutIcon className="text-blue-500" />} 
          description="Managed content routes"
        />
        <StatCard 
          title="Administrative Team" 
          value={stats.totalAdmins} 
          icon={<UsersIcon className="text-purple-500" />} 
          description="Active control accounts"
        />
        <StatCard 
          title="Total Site Traffic" 
          value={stats.totalViews.toLocaleString()} 
          icon={<EyeIcon className="text-emerald-500" />} 
          description="Real-time internal views"
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Recent Activity */}
        <Card className="bg-[#0a0d12]/40 border-white/5 rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center gap-3">
              <HistoryIcon className="text-primary size-5" />
              <CardTitle className="text-lg font-black text-white uppercase tracking-widest">Recent Content Updates</CardTitle>
            </div>
            <CardDescription className="font-bold text-white/30 uppercase text-[10px] tracking-widest">Latest modifications across the portfolio</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {stats.lastEditedPages.map((page) => (
                <Link 
                  key={page._id} 
                  href={`/admin/pages/${page.slug}`}
                  className="flex items-center justify-between p-6 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary border border-white/10 group-hover:border-primary/30 transition-all">
                      <FileTextIcon className="size-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white uppercase tracking-wider">{page.title}</h4>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5">Last updated {new Date(page.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <ArrowRightIcon className="size-4 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, description }: { title: string, value: string | number, icon: React.ReactNode, description: string }) {
  return (
    <Card className="bg-[#0a0d12]/40 border-white/5 rounded-[2.5rem] p-6 hover:border-white/10 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/10">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">{title}</p>
        <h3 className="text-2xl font-black text-white tracking-tighter">{value}</h3>
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest pt-1">{description}</p>
      </div>
    </Card>
  )
}
