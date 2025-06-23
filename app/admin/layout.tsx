import Image from "next/image";
import { getUser } from "@/lib/dal";
import { logout } from "../actions/auth.actions";
import { ADMIN_ROUTES } from "@/lib/constants/navigation.constants";
import NavListItem from "./NavListItem";

import styles from "./layout.module.css";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This will redirect to /login if not authenticated
  const user = await getUser();
  return (
    <div className={styles.admin_layout_page}>
      <div className={styles.admin_navigation_wrapper}>
        <Image
          src="/refactor-games-logo.webp"
          alt="Refactor Games Logo"
          className={styles.refactor_logo}
          width={326}
          height={88}
        />
        <div className={styles.admin_navlist}>
          {ADMIN_ROUTES.map((item) => (
            <NavListItem item={item} key={item.id}/>
          ))}
        </div>
      </div>
      <div className={styles.dashboard}>
        <header className={styles.dashboard_header}>
          <h2>ADMIN DASHBOARD</h2>
          <div className={styles.user_info}>
            <span>Hey, {user?.name}!</span>
            <button className={styles.logout_button} onClick={logout}>
              <span>Logout</span>
            </button>
          </div>
        </header>
        <main className={styles.main_content_wrapper}>
          {children}
        </main>
      </div>
    </div>
  );
}