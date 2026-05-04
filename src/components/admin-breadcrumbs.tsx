"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"

export function AdminBreadcrumbs() {
  const pathname = usePathname()
  const paths = pathname.split("/").filter(Boolean)

  // Map slugs to display names
  const nameMap: Record<string, string> = {
    admin: "Admin Panel",
    pages: "Pages",
    home: "Home",
    "contract-negotiation": "Contract Negotiation",
    "personal-branding": "Personal Branding",
    "salary-cap": "Salary Cap",
    "marketing-endorsements": "Marketing & Endorsements",
    "pre-draft": "Pre-Draft",
    "holistic-concierge": "Holistic Concierge",
    "manage-admins": "Admins",
    setting: "Settings"
  }

  const getDisplayName = (slug: string) => {
    return nameMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1
          const href = "/" + paths.slice(0, index + 1).join("/")
          const displayName = getDisplayName(path)

          if (path === "admin" && !isLast) {
            return (
              <React.Fragment key={path}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin">{displayName}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </React.Fragment>
            )
          }

          // Special case for "pages" - if we want to show "Services" instead for service paths
          // But based on URL it is "pages". I'll just show "Pages" or "Services" based on context.
          let finalDisplayName = displayName
          if (path === "pages") {
            const nextPath = paths[index + 1]
            if (nextPath && nextPath !== "home") {
               finalDisplayName = "Services"
            }
          }

          if (isLast) {
            return (
              <BreadcrumbItem key={path}>
                <BreadcrumbPage>{finalDisplayName}</BreadcrumbPage>
              </BreadcrumbItem>
            )
          }

          return (
            <React.Fragment key={path}>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={href}>{finalDisplayName}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
