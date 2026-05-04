import { Schema, model, models } from "mongoose";

export interface IPage {
  slug: string;
  title: string;
  content: Record<string, unknown>;
  seo: {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    faqs?: Array<{ question: string; answer: string }>;
  };
  views?: number;
}

const pageSchema = new Schema<IPage>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: Schema.Types.Mixed,
      default: {},
    },
    seo: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      keywords: { type: String, default: "" },
      canonicalUrl: { type: String, default: "" },
      noIndex: { type: Boolean, default: false },
      faqs: [
        {
          question: { type: String, default: "" },
          answer: { type: String, default: "" },
        },
      ],
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Page = models.Page || model<IPage>("Page", pageSchema);

export default Page;
