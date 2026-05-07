import { SitemapManager } from "@/components/sitemap-manager"

export default function SitemapPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Sitemap Settings</h1>
        <p className="text-muted-foreground">
          Manage how search engines discover and index your pages.
        </p>
      </div>
      <SitemapManager />
    </div>
  )
}
