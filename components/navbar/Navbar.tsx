import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.navigation_wrapper} role="banner">
      <Link href="/" aria-label="Go to Refactor Games Landing Page">
        <Image
          src="/refactor-games-logo.webp"
          alt="Refactor Games Logo"
          className={styles.navbar_logo}
          width={326}
          height={88}
          loading="eager"
        />
      </Link>
      <DesktopNav />
      <MobileNav />
    </header>
  );
}