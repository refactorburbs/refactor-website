import { NavRoute, AdminNavItem } from "../types/navigation.types";

export const NAV_ROUTES: readonly NavRoute[] = [
  { title: "Home", href: "#home" },
  { title: "About Us", href: "#about" },
  { title: "Games", href: "#games" },
  { title: "Team", href: "#team" },
  { title: "Careers", href: "#careers" },
  { title: "Contact", href: "#contact" },
] as const;

export const ADMIN_ROUTES: readonly AdminNavItem[] = [
  { id: "Dashboard", text: "Dashboard", href: "/admin" },
  { id: "Games", text: "Our Games", href: "/admin/games" },
  { id: "JobPostings", text: "Job Postings", href: "/admin/jobs" },
  { id: "JobApps", text: "Job Applications", href: "/admin/applications" },
] as const;