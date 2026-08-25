"use client";

import styles from "./paginationButtons.module.css";

interface PaginationButtonsProps {
  canGoLeft: boolean;
  canGoRight: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  currentIndex: number;
  totalItems: number;
}

export default function PaginationButtons({
  canGoLeft,
  canGoRight,
  handlePrevious,
  handleNext,
  currentIndex,
  totalItems
}: PaginationButtonsProps) {
  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevious}
        disabled={!canGoLeft}
        className={canGoLeft ? styles.pagination_button : styles.disabled_button}
        aria-label="Previous item"
      >
        <span>←</span>
      </button>

      <span className={styles.page_indicator}>
        {currentIndex + 1} / {totalItems}
      </span>

      <button
        onClick={handleNext}
        disabled={!canGoRight}
        className={canGoRight ? styles.pagination_button : styles.disabled_button}
        aria-label="Next item"
      >
        <span>→</span>
      </button>
    </div>
  );
}