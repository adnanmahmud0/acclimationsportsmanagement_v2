import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";

import Setting from "@/models/setting";

export async function GET() {
  try {
    await connectDB();
    
    // Fetch domain from settings, fallback to env variable, or default to the original domain
    const domainSetting = await Setting.findOne({ key: "siteDomain" }).lean();
    const baseUrl = domainSetting?.value || process.env.NEXT_PUBLIC_SITE_URL || "https://www.acclimationsportsmanagement.com";

    const pages = await Page.find({}, { slug: 1, updatedAt: 1 }).lean();

    // Static pages that always exist
    const staticRoutes = [
      { slug: "/", changefreq: "weekly", priority: "1.0" },
      { slug: "/contact", changefreq: "monthly", priority: "0.8" },
    ];

    // Dynamic CMS pages
    const dynamicRoutes = pages
      .filter((p) => p.slug && p.slug !== "home" && p.slug !== "contact")
      .map((p) => ({
        slug: `/${p.slug}`,
        changefreq: "monthly",
        priority: "0.9",
        lastmod: p.updatedAt ? new Date(p.updatedAt).toISOString() : new Date().toISOString(),
      }));

    const allRoutes = [
      ...staticRoutes.map((r) => ({ ...r, lastmod: new Date().toISOString() })),
      ...dynamicRoutes,
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.slug}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
