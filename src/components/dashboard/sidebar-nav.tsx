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
  Trophy,
  Upload,
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
  { href: "/dashboard/tasks", label: "Active Tasks", icon: ClipboardCheck, roles: ["Apprentice"] },
  { href: "/dashboard/journal", label: "AI Journal", icon: FilePen, roles: ["Apprentice"] },
  { href: "/dashboard/submissions", label: "Submit Deliverable", icon: Upload, roles: ["Apprentice"] },
  { href: "/dashboard/scores", label: "My Scores", icon: Trophy, roles: ["Apprentice"] },
  
  // Scorer
  { href: "/dashboard/submissions", label: "Submissions", icon: Award, roles: ["Scorer"] },

  // Program Operator
  { href: "/dashboard/orchestrator-tasks", label: "Tasks", icon: ClipboardCheck, roles: ["Program Operator"] },
  { href: "/dashboard/announcements", label: "Announcements", icon: Megaphone, roles: ["Program Operator"] },
  { href: "/dashboard/people", label: "People Directory", icon: Users, roles: ["Program Operator"] },
  { href: "/dashboard/scores", label: "Scores & Leaderboard", icon: Trophy, roles: ["Program Operator", "Program Orchestrator"] },
  
  // Program Orchestrator
  { href: "/dashboard/analytical", label: "Program Analytics", icon: LineChart, roles: ["Program Orchestrator"] },
  { href: "/dashboard/orchestrator-tasks", label: "Task Management", icon: ClipboardCheck, roles: ["Program Orchestrator"] },
  { href: "/dashboard/people", label: "People Management", icon: Users, roles: ["Program Orchestrator"] },
  { href: "/dashboard/orchestrator-announcements", label: "Post Announcement", icon: Megaphone, roles: ["Program Orchestrator"] },
  { href: "/dashboard/requests", label: "Access Requests", icon: History, roles: ["Program Orchestrator"] },
];

export default function SidebarNav({ userRole }: { userRole: UserRole }) {
  const accessibleNavItems = navItems.filter(item => {
    if (!item.roles.includes(userRole)) return false;

    // Special rule for Orchestrator: show "Task Management" instead of "Tasks"
    if (userRole === 'Program Orchestrator' && item.href === '/dashboard/orchestrator-tasks' && item.label === 'Tasks') return false;
    if (userRole === 'Program Operator' && item.href === '/dashboard/orchestrator-tasks' && item.label === 'Task Management') return false;
    
    // Special rule for Orchestrator: show "People Management" instead of "People Directory"
    if (userRole === 'Program Orchestrator' && item.href === '/dashboard/people' && item.label === 'People Directory') return false;
    if (userRole === 'Program Operator' && item.href === '/dashboard/people' && item.label === 'People Management') return false;

     // Special rule for Orchestrator: show "Post Announcement" instead of "Announcements"
    if (userRole === 'Program Orchestrator' && item.href === '/dashboard/orchestrator-announcements') return true;
    if (userRole === 'Program Operator' && item.href === '/dashboard/orchestrator-announcements') return false;
    if (userRole === 'Program Operator' && item.href === '/dashboard/announcements') return true;


    return true;
  });

  const pathname = usePathname();

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {accessibleNavItems.map((item) => (
        <Link
          key={item.href + item.label}
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
