"use client";

import { useState, useRef, useEffect } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { NAV_ROUTES } from "@/lib/constants/navigation.constants";

import styles from "./mobileNav.module.css";

export default function MobileNav() {
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
    <nav ref={menuRef} className={styles.mobile_navbar}>
      <Hamburger toggled={isOpen} size={20} toggle={setIsOpen} color="white" />

      <div
        className={styles.mobile_nav_menu_overlay}
        role="dialog"
        aria-modal="true"
        style={{
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transform: isOpen ? "translateY(0)" : "translateY(-10px)",
        }}
      >
        <ul>
          {NAV_ROUTES.map((route, i) => (
            <li
              key={route.title}
              className={styles.mobile_navlist_item}
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "scale(1)" : "scale(0.8)",
                transitionDelay: isOpen ? `${0.1 + i * 0.1}s` : "0s",
              }}
            >
              <a
                onClick={() => setIsOpen(false)}
                href={route.href}
              >
                <span>{route.title}</span>
                <span style={{ fontSize: "20px" }}>→</span>
              </a>
            </li>
          ))}
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