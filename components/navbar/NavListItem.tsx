import { THashRoute } from "@/lib/types/home.types";

import styles from "./navListItem.module.css";

interface NavListItemProps {
  title: string;
  href: THashRoute;
  isActive: boolean;
  onSetActive: (hash: string) => void;
}

export default function NavListItem({ title, href, isActive, onSetActive }: NavListItemProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Update active state immediately when clicked
    onSetActive(href);
    // Smooth scroll to section
    const sectionId = href.replace("#", "");
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Manually update URL hash
      window.history.pushState(null, "", href);
    }
  };

  return (
    <li className={styles.desktop_navlist_item}>
      <div className={`${styles.desktop_navlist_item_indicator} ${isActive ? styles.active : ""}`}/>
      <a href={href} onClick={handleClick} aria-label={`Scroll to ${title} section`}>
        <span>
          {title}
        </span>
      </a>
    </li>
  );
}