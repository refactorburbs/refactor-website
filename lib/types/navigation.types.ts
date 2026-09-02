import { ReactNode } from "react";

export type HashRoute = `#${string}`;

export interface BaseNavItem<Href extends string = string> {
  id: string;
  title: string;
  href: Href;
  icon?: ReactNode;
}

export type NavRoute = BaseNavItem<HashRoute>;
export type AdminNavItem = BaseNavItem<string>;