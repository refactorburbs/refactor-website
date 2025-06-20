import styles from "./ledOverlay.module.css";

export default function LEDOverlay() {
  return (
    <div className={styles.hero_overlay}>
      <div className={styles.vignette} />
      <div className={styles.led} />
    </div>
  );
}