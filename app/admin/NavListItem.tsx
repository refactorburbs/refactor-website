"use client";

import { AdminNavItem } from "@/lib/types/navigation.types";
import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from "./navListItem.module.css";

interface NavListItemProps {
  item: AdminNavItem;
}

export default function NavListItem({ item }: NavListItemProps) {
  const currentRoute = usePathname();
  const isActive = currentRoute === item.href;

  return (
    <Link
      className={isActive ? styles.active_navitem : styles.navitem}
      href={item.href}
    >
      {item.text}
      <span className={styles.nav_underline}/>
    </Link>
  );
}