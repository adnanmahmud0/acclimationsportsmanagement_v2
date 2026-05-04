import type { Metadata } from "next";
import { PageData } from "@/types/cms";
import {
    seoDefaultRoute,
    seoRoutes,
    seoSiteConfig,
    type SeoRoutePath,
} from "@/lib/seoConfig";

export const siteMetadata = seoSiteConfig;

function resolveUrl(pathOrUrl: string): string {
    return new URL(pathOrUrl, seoSiteConfig.url).toString();
}

function resolveCanonicalPath(path: string): string {
    if (path === "/") {
        return "/";
    }

    return path.startsWith("/") ? path : `/${path}`;
}

function buildSocialImage(path?: string): string {
    return resolveUrl(path ?? seoSiteConfig.defaultImage);
}

function buildMetadata(route: {
    title: string;
    description: string;
    keywords?: readonly string[];
    image?: string;
    noIndex?: boolean;
}, canonicalPath: string): Metadata {
    const canonical = resolveUrl(resolveCanonicalPath(canonicalPath));
    const image = buildSocialImage(route.image);
    const imageAlt = route.image ? route.title : seoSiteConfig.defaultImageAlt;

    return {
        metadataBase: new URL(seoSiteConfig.url),
        title: route.title,
        description: route.description,
        keywords: [...seoSiteConfig.keywords, ...(route.keywords ?? [])],
        alternates: {
            canonical,
        },
        openGraph: {
            title: route.title,
            description: route.description,
            url: canonical,
            siteName: seoSiteConfig.name,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: imageAlt,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: route.title,
            description: route.description,
            images: [image],
            creator: seoSiteConfig.twitterHandle,
            site: seoSiteConfig.twitterHandle,
        },
        robots: {
            index: route.noIndex !== true,
            follow: route.noIndex !== true,
        },
    };
}

export function buildSiteMetadata(): Metadata {
    return buildMetadata(seoDefaultRoute, "/");
}

export function buildPageMetadata(path: SeoRoutePath | string): Metadata {
    const normalizedPath = resolveCanonicalPath(path);
    const route = seoRoutes[normalizedPath as SeoRoutePath] ?? seoDefaultRoute;

    return buildMetadata(route, normalizedPath);
}

export function buildMetadataFromPage(page: PageData | null, fallbackPath: string): Metadata {
    if (!page?.seo) {
        return buildPageMetadata(fallbackPath);
    }

    const route = {
        title: page.seo.title,
        description: page.seo.description,
        keywords: page.seo.keywords ? page.seo.keywords.split(",").map((k: string) => k.trim()) : [],
        image: page.seo.ogImage,
        noIndex: page.seo.noIndex,
    };

    const canonicalPath = page.seo.canonicalUrl || fallbackPath;

    return buildMetadata(route, canonicalPath);
}
