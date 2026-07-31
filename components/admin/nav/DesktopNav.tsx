import { ADMIN_ROUTES } from "@/lib/constants/navigation.constants";
import NavListItem from "@/components/admin/nav/NavListItem";
import Image from "next/image";
import refactorLogo from "../../../public/refactor-games-logo.webp";

import styles from "./navigationSidebar.module.css";

export default function DesktopNav() {
  return (
    <aside className={styles.desktop_navigation_wrapper}>
      <nav className={`${styles.desktop_navbar} ${styles.navbar}`}>
        <Image
          src={refactorLogo}
          alt="Refactor Logo"
          width={150}
          height={40}
          style={{marginLeft: "1rem"}}
        />
        <ul>
          {ADMIN_ROUTES.map((item) => (
            <NavListItem item={item} key={item.id}/>
          ))}
        </ul>
      </nav>
    </aside>
  );
}