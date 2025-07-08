import AnimatedHeader from "../AnimatedHeader";

import styles from "./about2.module.css";

export default function MobileAbout2 () {
  return (
    <div className={styles.mobile_about}>
      <AnimatedHeader title="About Us" />
    </div>
  );
}