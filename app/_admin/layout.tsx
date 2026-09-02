import Image from "next/image";
import { getUser } from "@/lib/dal";
import { logout } from "../actions/auth.actions";
import MobileNav from "@/components/admin/nav/MobileNav";
import DesktopNav from "@/components/admin/nav/DesktopNav";

import styles from "./layout.module.css";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This will redirect to /login if not authenticated
  // const user = await getUser();
  const user = {name: "DELETE ME"}
  return (
    <div className={styles.admin_layout_page}>
      <DesktopNav />
      <div className={styles.admin_content}>
        <header className={styles.admin_header}>
          <MobileNav />
          <h2>ADMIN DASHBOARD</h2>
          <div className={styles.user_info}>
            <button className={styles.logout_button} onClick={logout}>
              <span>Logout</span>
            </button>
          </div>
        </header>
        <main className={styles.admin_tab_content}>
          {children}
        </main>
      </div>
    </div>
  );
}