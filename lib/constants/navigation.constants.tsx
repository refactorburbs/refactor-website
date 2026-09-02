import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavRoute, AdminNavItem } from "../types/navigation.types";
import { faBriefcase, faGamepad, faGauge, faKey, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

export const NAV_ROUTES: readonly NavRoute[] = [
  { id: "Home", title: "Home", href: "#home" },
  { id: "AboutUs", title: "About Us", href: "#about" },
  { id: "Games", title: "Games", href: "#games" },
  { id: "Team", title: "Team", href: "#team" },
  { id: "Careers", title: "Careers", href: "#careers" },
  { id: "Contact", title: "Contact", href: "#contact" },
] as const;

export const ADMIN_ROUTES: readonly AdminNavItem[] = [
  { id: "Dashboard", title: "Dashboard", href: "/admin", icon: <FontAwesomeIcon icon={faGauge} />},
  { id: "Our Games", title: "Our Games", href: "/admin/games", icon: <FontAwesomeIcon icon={faGamepad} /> },
  { id: "JobPostings", title: "Job Postings", href: "/admin/jobs", icon: <FontAwesomeIcon icon={faBriefcase}/>},
  { id: "JobApps", title: "Job Applicants", href: "/admin/applications", icon: <FontAwesomeIcon icon={faPeopleGroup} />},
  { id: "Credentials", title: "Credentials", href: "/admin/credentials", icon: <FontAwesomeIcon icon={faKey} />},
] as const;