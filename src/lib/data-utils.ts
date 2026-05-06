import { PageData } from "@/types/cms";
import { DEFAULT_HOME_DATA } from "./defaults";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mergePageData(data: any, defaultData: PageData = DEFAULT_HOME_DATA): PageData {
  if (!data) return defaultData;
  
  return {
    ...defaultData,
    ...data,
    content: {
      ...defaultData.content,
      ...(data.content || {}),
      hero: data.content?.hero ? { ...defaultData.content.hero, ...data.content.hero } : defaultData.content.hero,
      oneStopShop: data.content?.oneStopShop ? { ...defaultData.content.oneStopShop, ...data.content.oneStopShop } : defaultData.content.oneStopShop,
      about: data.content?.about ? { ...defaultData.content.about, ...data.content.about } : defaultData.content.about,
      contact: data.content?.contact ? { ...defaultData.content.contact, ...data.content.contact } : defaultData.content.contact,
      personalBranding: data.content?.personalBranding ? { ...defaultData.content.personalBranding, ...data.content.personalBranding } : defaultData.content.personalBranding,
      salaryCap: data.content?.salaryCap ? { ...defaultData.content.salaryCap, ...data.content.salaryCap } : defaultData.content.salaryCap,
      marketingEndorsements: data.content?.marketingEndorsements ? { ...defaultData.content.marketingEndorsements, ...data.content.marketingEndorsements } : defaultData.content.marketingEndorsements,
      preDraft: data.content?.preDraft ? { ...defaultData.content.preDraft, ...data.content.preDraft } : defaultData.content.preDraft,
      holisticConcierge: data.content?.holisticConcierge ? { ...defaultData.content.holisticConcierge, ...data.content.holisticConcierge } : defaultData.content.holisticConcierge,
    },
    seo: { ...defaultData.seo, ...(data.seo || {}) }
  };
}
