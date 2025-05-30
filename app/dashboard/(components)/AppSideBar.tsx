"use client";
import {
  Calendar,
  CalendarCheck,
  Home,
  HomeIcon,
  Inbox,
  Search,
  Settings,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";

// Menu items.
const items = [
  {
    title: "Event Types",
    url: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Meetings",
    url: "/dashboard/meetings",
    icon: User2,
  },
  {
    title: "Availability",
    url: "/dashboard/availability",
    icon: CalendarCheck,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="border-b h-14 mb-4">
        <p className="font-semibold">
          Cal<span className="text-primary">Scheduler</span>
        </p>
      </SidebarHeader>
      <nav className="grid items-start px-2 lg:px-3 space-y-2">
        {items.map((item) => (
          <Link
            className={cn(
              pathname === item.url
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground",
              "flex items-center gap-3 px-3 py-2 rounded-md transition-all hover:text-primary"
            )}
            key={item.title}
            href={item.url}
          >
            <item.icon className="size-4" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </Sidebar>
  );
}
