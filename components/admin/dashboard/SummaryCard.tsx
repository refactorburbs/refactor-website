import styles from "./summaryCard.module.css";

export default function SummaryCard() {
  return (
    <section className={styles.summary_card}>
      <div className={styles.user_greeting}>
        <h2>Hey, Rachel 👋</h2>
        <span>Here's what's happening on the site today.</span>
      </div>
    </section>
  );
}