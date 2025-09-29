"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserRole } from "@/lib/types";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Award,
  Users,
  Megaphone,
  FilePen,
  History,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["Apprentice", "Scorer", "Program Operator", "Program Orchestrator"] },
  { href: "/dashboard/tasks", label: "My Tasks", icon: ClipboardCheck, roles: ["Apprentice"] },
  { href: "/dashboard/journal", label: "AI Journal", icon: FilePen, roles: ["Apprentice"] },
  { href: "/dashboard/submissions", label: "Submissions", icon: Award, roles: ["Scorer"] },
  { href: "/dashboard/users", label: "User Management", icon: Users, roles: ["Program Orchestrator"] },
  { href: "/dashboard/announcements", label: "Announcements", icon: Megaphone, roles: ["Program Orchestrator", "Program Operator"] },
  { href: "/dashboard/requests", label: "Access Requests", icon: History, roles: ["Program Orchestrator"] },
  { href: "/playbook", label: "Playbook", icon: BookOpen, roles: ["Apprentice", "Scorer", "Program Operator", "Program Orchestrator"] },
];

export default function SidebarNav({ userRole }: { userRole: UserRole }) {
  const pathname = usePathname();
  const accessibleNavItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {accessibleNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            pathname === item.href && "bg-muted text-primary"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
