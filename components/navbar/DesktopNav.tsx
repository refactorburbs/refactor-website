"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_ROUTES } from "@/lib/constants/home.constants";
import { INavRoute } from "@/lib/types/home.types";
import NavListItem from "./NavListItem";

import styles from "./desktopNav.module.css";

export default function DesktopNav() {
  const [activeSection, setActiveSection] = useState<string>("#home");
  const activeSectionRef = useRef<string>("#home");

  // Keep ref in sync with the activeSection state so as
  // not to re-create the intersection observer every time
  useEffect(function updateSectionRef () {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(function observeAllSections () {
    const setupObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          // Filter out only significantly visible sections
          const visibleEntries = entries.filter(entry =>
            entry.isIntersecting && entry.intersectionRatio > 0.5
          );

          if (visibleEntries.length > 0) {
            const mostVisibleSection = visibleEntries.reduce((prev, current) =>
              current.intersectionRatio > prev.intersectionRatio ? current : prev
            );
            const newActiveHash = `#${mostVisibleSection.target.id}`;
            if (newActiveHash !== activeSectionRef.current) {
              // This will update the ref, as it's a dep in the prev useEffect
              setActiveSection(newActiveHash);
              // Update URL hash
              if (window.location.hash !== newActiveHash) {
                window.history.replaceState(null, "", newActiveHash);
              }
            }
          }
        },
        { threshold: 0.7 }
      );

      // Observe all sections
      const observedElements: Element[] = [];
      NAV_ROUTES.forEach((route) => {
        const sectionId = route.href.replace("#", "");
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
          observedElements.push(element);
        }
      });

      return observer;
    }

    // Setup observer with retry for async sections
    let observer = setupObserver();

    const retryTimeout = setTimeout(() => {
      observer.disconnect();
      observer = setupObserver();
    }, 1000);

    // Handle manual hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash || "#home";
      setActiveSection(newHash);
    };

    // Initial setup
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      clearTimeout(retryTimeout);
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <nav className={styles.desktop_navbar}>
      <ul>
        {NAV_ROUTES.map((route: INavRoute) => (
          <div className={styles.list_item_wrapper} key={route.href}>
            <NavListItem
              href={route.href}
              title={route.title}
              isActive={activeSection === route.href}
              onSetActive={setActiveSection}
            />
          </div>
        ))}
      </ul>
    </nav>
  );
}