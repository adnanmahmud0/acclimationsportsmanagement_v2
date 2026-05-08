import { Schema, model, models } from "mongoose";

export interface IBranding {
  navbarLogo: string;
  navbarLogoSize: number;
  footerLogo: string;
  footerLogoSize: number;
  adminSidebarLogo: string;
  adminSidebarLogoSize: number;
  favicon: string;
}

const brandingSchema = new Schema<IBranding>(
  {
    navbarLogo: { type: String, default: "/logo/AcclimationLogo-Horizontal.png" },
    navbarLogoSize: { type: Number, default: 220 },
    footerLogo: { type: String, default: "/logo/AcclimationLogo-Horizontal.png" },
    footerLogoSize: { type: Number, default: 200 },
    adminSidebarLogo: { type: String, default: "/logo/AcclimationLogo-Horizontal.png" },
    adminSidebarLogoSize: { type: Number, default: 140 },
    favicon: { type: String, default: "/favicon.ico" },
  },
  { timestamps: true }
);

const Branding = models.Branding || model<IBranding>("Branding", brandingSchema);

export default Branding;
