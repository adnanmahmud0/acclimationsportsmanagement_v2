export interface HeroCard {
  title: string;
  desc: string;
  type: string;
}

export interface ChartPoint {
  year: number;
  value: number;
  label: string;
}

export interface HeroData {
  title: string;
  tagline: string;
  features: string[];
  cards: HeroCard[];
  chart: {
    title: string;
    data: ChartPoint[];
  };
}

export interface ServicePoint {
  title: string;
  items: string[];
}

export interface OneStopShopData {
  title: string;
  description: string;
  ctaText: string;
  points: ServicePoint[];
}

export interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  focusText: string;
  ctaText: string;
  bullets: string[];
  specialties: string[];
}

export interface ContactData {
  title: string;
  tagline: string;
  phone: string;
  phoneTitle: string;
  phoneDesc: string;
  email: string;
  emailTitle: string;
  emailDesc: string;
  location: string;
  locationTitle: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  subtitle: string;
}

export interface MetricData {
  title: string;
  value: string;
}

export interface ServiceBoxData {
  title: string;
  desc: string;
}

export interface HighlightData {
  value: string;
  label: string;
}

export interface PersonalBrandingData {
  title: string;
  tagline: string;
  metrics: MetricData[];
  services: ServiceBoxData[];
  resultsTitle: string;
  highlights: HighlightData[];
}

export interface SalaryCapData {
  title: string;
  subtitle: string;
  engineTitle: string;
  cardTitles: string[];
  points: string[];
  ctaText: string;
}

export interface PageContent {
  hero?: HeroData;
  oneStopShop?: OneStopShopData;
  about?: AboutData;
  contact?: ContactData;
  personalBranding?: PersonalBrandingData;
  salaryCap?: SalaryCapData;
  mainTitle?: string;
  subDescription?: string;
  points?: string[];
  processSteps?: ProcessStep[];
  ctaText?: string;
}

export interface PageData {
  slug: string;
  title: string;
  content: PageContent;
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage?: string;
  };
}
