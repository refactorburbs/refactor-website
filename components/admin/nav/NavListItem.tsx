"use client";

import { AdminNavItem } from "@/lib/types/navigation.types";
import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from "./navigationSidebar.module.css";

interface NavListItemProps {
  item: AdminNavItem;
  className?: string;
  style?: object;
}

export default function NavListItem({ item, className = "", style = {} }: NavListItemProps) {
  const currentRoute = usePathname();
  const isActive = currentRoute === item.href;

  return (
    <li className={`${styles.navlist_item} ${className}`} style={style}>
      <Link
        className={`${styles.navlist_link} ${isActive ? styles.active : ""}`}
        href={item.href}
      >
        {item.icon && item.icon}
        <span>{item.title}</span>
      </Link>
    </li>
  );
}