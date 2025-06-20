import Image from "next/image";

import styles from "./divider.module.css";

interface DividerProps {
  title: string;
  isUnderlined: boolean;
  isSlanted: boolean;
}

const getWrapperClassName = (isSlanted: boolean, isUnderlined: boolean) => {
  if (isSlanted && isUnderlined) {
    return `${styles.slanted_divider_wrapper} ${styles.underlined}`;
  }
  if (isSlanted && !isUnderlined) {
    return styles.slanted_divider_wrapper;
  }
  if (!isSlanted && isUnderlined) {
    return `${styles.divider} ${styles.divider_bg} ${styles.underlined}`;
  }
  if (!isSlanted && !isUnderlined) {
    return `${styles.divider} ${styles.divider_bg}`;
  }
}

export default function Divider({ title, isUnderlined, isSlanted }: DividerProps) {
  return (
    <div className={getWrapperClassName(isSlanted, isUnderlined)}>
      {!isSlanted && <div className={styles.geo_pattern}/>}
      <h2>{title}</h2>
      {isSlanted ?
        (
          <div className={`${styles.slanted_divider} ${styles.divider_bg}`}>
            <div className={`${styles.geo_pattern}`} />
            <div />
            <Image
              src="/refactor-icon-black.svg"
              alt="Refactor Games Logo Icon"
              width={32}
              height={32}
            />
          </div>
        ) : (
          <Image
            src="/refactor-icon-black.svg"
            alt="Refactor Games Logo Icon"
            width={32}
            height={32}
          />
        )
      }
    </div>
  );
}