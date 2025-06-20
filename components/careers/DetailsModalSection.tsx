import styles from "./detailsModalSection.module.css";

interface DetailsModalSectionProps {
  title: string;
  items: string[];
  isList: boolean;
}

export default function DetailsModalSection({ title, items, isList } : DetailsModalSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className={styles.job_details_section}>
      <h3 className={styles.details_section_title}>
        {title}
      </h3>
      {isList ? (
        <ul className={styles.section_list}>
          {items.map((item, i) => (
            <li key={i}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.section_paragraphs}>
          {items.map((paragraph, i) => (
            <p key={i}>
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}