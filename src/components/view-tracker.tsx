"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Determine slug: if it's just "/", use "home"
    const slug = pathname === "/" ? "home" : pathname.split("/").filter(Boolean).pop() || "home"
    
    // Block admin/login/api tracking
    if (pathname.startsWith("/admin") || pathname.startsWith("/login") || pathname.startsWith("/api")) {
      return
    }

    // Send tracking signal immediately
    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    }).catch(err => console.error("Tracking error:", err))
  }, [pathname])

  return null
}
