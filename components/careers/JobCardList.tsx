"use client";

import { useState } from "react";
import { JobPost } from "@/lib/types/jobs.types";
import JobCard from "./JobCard";

import styles from "./jobCardList.module.css";

interface JobCardListProps {
  jobPosts: JobPost[];
}

const JOBS_PER_PAGE = 3;

export default function JobCardList ({ jobPosts }: JobCardListProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(jobPosts.length / JOBS_PER_PAGE);
  const startIndex = currentPage * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const currentJobs = jobPosts.slice(startIndex, endIndex);

  const canGoLeft = currentPage > 0;
  const canGoRight = currentPage < totalPages - 1;

  const handlePrevious = () => {
    if (canGoLeft) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoRight) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.jobs_container}>
      <div className={styles.job_card_list}>
        {currentJobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={handlePrevious}
          disabled={!canGoLeft}
          className={canGoLeft ? styles.pagination_button : styles.disabled_button}
          aria-label="Previous jobs"
        >
          <span>←</span>
        </button>

        <span className={styles.page_indicator}>
          {currentPage + 1} / {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={!canGoRight}
          className={canGoRight ? styles.pagination_button : styles.disabled_button}
          aria-label="Next jobs"
        >
          <span>→</span>
        </button>

      </div>
    </div>
  );
}