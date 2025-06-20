export type HashRoute = `#${string}`;

export interface NavRoute {
  title: string;
  href: HashRoute;
  icon?: string;
}

export interface AdminNavItem {
  id: string;
  text: string;
  href: string;
}