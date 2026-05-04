"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboardIcon, 
  UsersIcon, 
  FileTextIcon, 
  Settings2Icon, 
  LayersIcon,
  HomeIcon,
  HandshakeIcon,
  TrophyIcon,
  CalculatorIcon,
  BarChart3Icon,
  TargetIcon,
  HeartIcon,
  GraduationCap,
  MailIcon
} from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"

const data = {
  user: {
    name: "Administrator",
    email: "admin@admin.com",
    avatar: "/owner/me.png",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "General",
      url: "#",
      icon: <FileTextIcon />,
      items: [
        {
          title: "Home",
          url: "/admin/pages/home",
          icon: <HomeIcon className="size-4" />,
        },
        {
          title: "Contact",
          url: "/admin/pages/contact",
          icon: <MailIcon className="size-4" />,
        },
      ],
    },
    {
      title: "Services",
      url: "#",
      icon: <LayersIcon />,
      items: [
        {
          title: "Contract Negotiation",
          url: "/admin/pages/contract-negotiation",
          icon: <HandshakeIcon className="size-4" />,
        },
        {
          title: "Personal Branding",
          url: "/admin/pages/personal-branding",
          icon: <TrophyIcon className="size-4" />,
        },
        {
          title: "Salary Cap",
          url: "/admin/pages/salary-cap",
          icon: <CalculatorIcon className="size-4" />,
        },
        {
          title: "Marketing & Endorsements",
          url: "/admin/pages/marketing-endorsements",
          icon: <BarChart3Icon className="size-4" />,
        },
        {
          title: "Pre-Draft",
          url: "/admin/pages/pre-draft",
          icon: <TargetIcon className="size-4" />,
        },
        {
          title: "Holistic Concierge",
          url: "/admin/pages/holistic-concierge",
          icon: <HeartIcon className="size-4" />,
        },
      ],
    },
    {
      title: "For Players",
      url: "#",
      icon: <UsersIcon />,
      items: [
        {
          title: "WNBA",
          url: "/admin/pages/wnba",
          icon: <UsersIcon className="size-4" />,
        },
        {
          title: "College Prospects",
          url: "/admin/pages/college-prospects",
          icon: <GraduationCap className="size-4" />,
        },
        {
          title: "G-League Elite",
          url: "/admin/pages/g-league-elite",
          icon: <TrophyIcon className="size-4" />,
        },
        {
          title: "High School Talent",
          url: "/admin/pages/high-school-talent",
          icon: <TargetIcon className="size-4" />,
        },
        {
          title: "NBA Players",
          url: "/admin/pages/nba-players",
          icon: <UsersIcon className="size-4" />,
        },
        {
          title: "Two-Way Contracts",
          url: "/admin/pages/two-way-contracts",
          icon: <FileTextIcon className="size-4" />,
        },
      ],
    },
    {
      title: "Admin",
      url: "/admin/manage-admins",
      icon: <UsersIcon />,
    },
    {
      title: "Setting",
      url: "/admin/setting",
      icon: <Settings2Icon />,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5! h-12"
              render={<Link href="/" />}
            >
              <Logo variant="horizontal" width={140} height={30} showLink={false} />
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
