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
  LineChart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
};

const navItems: NavItem[] = [
  // Common
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["Apprentice", "Scorer", "Program Operator", "Program Orchestrator"] },
  { href: "/playbook", label: "Playbook", icon: BookOpen, roles: ["Apprentice", "Scorer", "Program Operator", "Program Orchestrator"] },
  
  // Apprentice
  { href: "/dashboard/tasks", label: "My Tasks", icon: ClipboardCheck, roles: ["Apprentice"] },
  { href: "/dashboard/journal", label: "AI Journal", icon: FilePen, roles: ["Apprentice"] },
  
  // Scorer
  { href: "/dashboard/submissions", label: "Submissions", icon: Award, roles: ["Scorer"] },

  // Program Operator
  { href: "/dashboard/announcements", label: "Announcements", icon: Megaphone, roles: ["Program Operator"] },
  
  // Program Orchestrator
  { href: "/dashboard/analytical", label: "Analytical Dashboard", icon: LineChart, roles: ["Program Orchestrator"] },
  { href: "/dashboard/orchestrator-tasks", label: "Tasks", icon: ClipboardCheck, roles: ["Program Orchestrator"] },
  { href: "/dashboard/people", label: "People", icon: Users, roles: ["Program Orchestrator"] },
  { href: "/dashboard/orchestrator-announcements", label: "Announcements", icon: Megaphone, roles: ["Program Orchestrator"] },
  { href: "/dashboard/scores", label: "Scores", icon: Award, roles: ["Program Orchestrator"] },
  { href: "/dashboard/requests", label: "Access Requests", icon: History, roles: ["Program Orchestrator"] },
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
