"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Squash as Hamburger } from "hamburger-react";
import { ADMIN_ROUTES } from "@/lib/constants/navigation.constants";

import styles from "./navigationSidebar.module.css";

export default function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(function handleClickAway () {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav
      ref={menuRef}
      className={styles.mobile_navbar}
      style={{
        background: isOpen ? "#0D1420" : "transparent",
        width: isOpen ? "75%" : "max-content",
        position: isOpen ? "absolute" : "relative"
      }}
    >
      <Hamburger toggled={isOpen} size={22} toggle={setIsOpen} color="white" />

      <div
        className={styles.mobile_nav_menu_overlay}
        role="dialog"
        aria-modal="true"
        style={{
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transform: isOpen ? "translateY(0)" : "translateY(-10px)",
          position: isOpen ? "relative" : "fixed"
        }}
      >
        <ul>
          {ADMIN_ROUTES.map((item, i) => {
            const isActive = pathname == item.href
            return (
              <li
                key={item.id}
                className={styles.navlist_item}
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0%)" : "translateX(-30%)",
                  transitionDelay: isOpen ? `${0.2 + i * 0.1}s` : "0s",
                }}
              >
                <a
                  onClick={() => setIsOpen(false)}
                  href={item.href}
                  style={{
                    backgroundColor: isActive ? "#181F2B" : "",
                    borderLeft: isActive ? "4px solid yellow" : "none",
                    color: isActive ? "yellow" : "white"
                  }}
                >
                  {item.icon && item.icon}
                  <span>{item.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className={styles.mobile_nav_backdrop}
          style={{
            opacity: isOpen ? 1 : 0,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}