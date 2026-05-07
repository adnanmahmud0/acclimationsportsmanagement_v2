import type { MetadataRoute } from "next";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import Setting from "@/models/setting";
import { seoSiteConfig } from "@/lib/seoConfig";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        await connectDB();

        // Fetch domain from settings, fallback to config, or default
        const domainSetting = await Setting.findOne({ key: "siteDomain" }).lean();
        const baseUrl = domainSetting?.value || seoSiteConfig.url || "https://www.acclimationsportsmanagement.com";

        // Fetch all dynamic pages
        const pages = await Page.find({}, { slug: 1, updatedAt: 1, seo: 1 }).lean();

        // Static routes based on seoConfig or common routes
        const staticRoutes: MetadataRoute.Sitemap = [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 1,
            },
            {
                url: `${baseUrl}/contact`,
                lastModified: new Date(),
                changeFrequency: "monthly",
                priority: 0.8,
            },
        ];

        // Dynamic routes from DB
        const dynamicRoutes: MetadataRoute.Sitemap = pages
            .filter((p) => {
                const isSystemRoute = ["home", "contact"].includes(p.slug);
                const isImageFile = /\.(png|jpg|jpeg|webp|gif|svg|ico)$/i.test(p.slug);
                return p.slug && !isSystemRoute && !isImageFile && !p.seo?.noIndex;
            })
            .map((p) => ({
                url: `${baseUrl}/${p.slug}`,
                lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
                changeFrequency: (p.seo?.sitemapChangeFreq || "monthly") as "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
                priority: p.seo?.sitemapPriority ?? 0.7,
            }));

        return [...staticRoutes, ...dynamicRoutes];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        // Fallback to basic static routes if DB fails
        return [
            {
                url: seoSiteConfig.url,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: 1,
            },
        ];
    }
}
