import { seoSiteConfig } from "@/lib/seoConfig";

// ─── Organization (homepage) ──────────────────────────────────────────────────
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: seoSiteConfig.name,
    url: seoSiteConfig.url,
    logo: `${seoSiteConfig.url}/logo/AcclimationLogo-Horizontal.png`,
    description: seoSiteConfig.description,
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-512-518-6547",
      contactType: "customer service",
      email: "Joseph.Grekoski@AcclimationGroup.com",
      areaServed: "US",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fort Lauderdale",
      addressRegion: "FL",
      postalCode: "33308",
      addressCountry: "US",
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── LocalBusiness / Professional Service (contact page) ─────────────────────
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: seoSiteConfig.name,
    url: seoSiteConfig.url,
    logo: `${seoSiteConfig.url}/logo/AcclimationLogo-Horizontal.png`,
    image: `${seoSiteConfig.url}/og-image.png`,
    description: seoSiteConfig.description,
    telephone: "+1-512-518-6547",
    email: "Joseph.Grekoski@AcclimationGroup.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fort Lauderdale",
      addressRegion: "FL",
      postalCode: "33308",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.1224,
      longitude: -80.1373,
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "$$$$",
    servesCuisine: undefined,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasMap: `https://maps.google.com/?q=Fort+Lauderdale+FL+33308`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Person (Joe Grekoski) ────────────────────────────────────────────────────
export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Joe Grekoski",
    jobTitle: "Founder & NBA Agent",
    worksFor: {
      "@type": "Organization",
      name: seoSiteConfig.name,
      url: seoSiteConfig.url,
    },
    telephone: "+1-512-518-6547",
    email: "Joseph.Grekoski@AcclimationGroup.com",
    url: `${seoSiteConfig.url}/contact`,
    image: `${seoSiteConfig.url}/joe.png`,
    description:
      "Joe Grekoski is the founder of Acclimation Sports Management, providing NBA representation, contract negotiation, and career management for elite basketball players.",
    knowsAbout: [
      "NBA Contract Negotiation",
      "Salary Cap Analytics",
      "NIL Strategy",
      "Sports Management",
      "Basketball Representation",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── BreadcrumbList (inner pages) ─────────────────────────────────────────────
interface BreadcrumbItem {
  name: string;
  href: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: seoSiteConfig.url,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${seoSiteConfig.url}${item.href}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── FAQPage ─────────────────────────────────────────────────────────────────
interface FaqItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
