"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface BrandingData {
  navbarLogo: string;
  navbarLogoSize: number;
  footerLogo: string;
  footerLogoSize: number;
  adminSidebarLogo: string;
  adminSidebarLogoSize: number;
  favicon: string;
}

const defaultBranding: BrandingData = {
  navbarLogo: "/logo/AcclimationLogo-Horizontal.png",
  navbarLogoSize: 220,
  footerLogo: "/logo/AcclimationLogo-Horizontal.png",
  footerLogoSize: 200,
  adminSidebarLogo: "/logo/AcclimationLogo-Horizontal.png",
  adminSidebarLogoSize: 140,
  favicon: "/favicon.ico"
}

interface BrandingContextType {
  branding: BrandingData;
  refreshBranding: () => Promise<void>;
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined)

export function BrandingProvider({ children }: { children: React.ReactNode }) {
  const [branding, setBranding] = useState<BrandingData>(defaultBranding)

  const fetchBranding = async () => {
    try {
      const response = await fetch("/api/branding")
      const result = await response.json()
      if (result.success && result.data) {
        setBranding(result.data)
        
        // Update favicon dynamically
        const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement
        if (favicon && result.data.favicon) {
          favicon.href = result.data.favicon
        }
      }
    } catch (error) {
      console.error("Fetch branding error:", error)
    }
  }

  useEffect(() => {
    fetchBranding()
  }, [])

  return (
    <BrandingContext.Provider value={{ branding, refreshBranding: fetchBranding }}>
      {children}
    </BrandingContext.Provider>
  )
}

export function useBranding() {
  const context = useContext(BrandingContext)
  if (context === undefined) {
    throw new Error("useBranding must be used within a BrandingProvider")
  }
  return context
}
