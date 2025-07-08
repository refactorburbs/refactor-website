import AnimatedHeader from "../AnimatedHeader";

import styles from "./about2.module.css";

export default function DesktopAbout2 () {
  return (
    <div className={styles.desktop_about}>
      <AnimatedHeader title="About Us" rootMargin="0px 0px -400px 0px"/>
    </div>
  );
}