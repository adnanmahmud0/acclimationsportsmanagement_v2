import type { MetadataRoute } from "next";

import { siteMetadata } from "@/lib/seo";

const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number; lastModified: Date }[] = [
    { path: "/",                      changeFrequency: "weekly",  priority: 1.0,  lastModified: new Date("2026-04-24") },
    { path: "/contact",               changeFrequency: "monthly", priority: 0.9,  lastModified: new Date("2026-04-18") },

    { path: "/nba-players",           changeFrequency: "monthly", priority: 0.85, lastModified: new Date("2026-04-11") },
    { path: "/college-prospects",     changeFrequency: "monthly", priority: 0.85, lastModified: new Date("2026-04-11") },
    { path: "/high-school-talent",    changeFrequency: "monthly", priority: 0.85, lastModified: new Date("2026-04-11") },
    { path: "/wnba",                  changeFrequency: "monthly", priority: 0.85, lastModified: new Date("2026-04-11") },
    { path: "/contract-negotiation",  changeFrequency: "monthly", priority: 0.8,  lastModified: new Date("2026-04-11") },
    { path: "/salary-cap",            changeFrequency: "monthly", priority: 0.8,  lastModified: new Date("2026-04-15") },
    { path: "/personal-branding",     changeFrequency: "monthly", priority: 0.8,  lastModified: new Date("2026-04-11") },
    { path: "/marketing-endorsements",changeFrequency: "monthly", priority: 0.8,  lastModified: new Date("2026-04-11") },
    { path: "/pre-draft",             changeFrequency: "monthly", priority: 0.8,  lastModified: new Date("2026-04-11") },
    { path: "/holistic-concierge",    changeFrequency: "monthly", priority: 0.75, lastModified: new Date("2026-04-11") },
    { path: "/two-way-contracts",     changeFrequency: "monthly", priority: 0.75, lastModified: new Date("2026-04-11") },
    { path: "/g-league-elite",        changeFrequency: "monthly", priority: 0.75, lastModified: new Date("2026-04-16") },
];

export default function sitemap(): MetadataRoute.Sitemap {
    return routes.map(({ path, changeFrequency, priority, lastModified }) => ({
        url: path === "/" ? siteMetadata.url : `${siteMetadata.url}${path}`,
        lastModified,
        changeFrequency,
        priority,
    }));
}
