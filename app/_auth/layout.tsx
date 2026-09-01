import Image from "next/image";

import styles from "./layout.module.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.auth_layout_page}>
      <div className={styles.auth_card}>
        {children}
        <div className={styles.card_branding}>
          <Image
            src="/refactor-games-logo.webp"
            alt="Refactor Games Logo"
            className={styles.navbar_logo}
            width={326}
            height={88}
          />
          <h3>Administrative Dashboard</h3>
        </div>
      </div>
    </div>
  );
}