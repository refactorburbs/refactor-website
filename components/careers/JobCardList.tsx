"use client";

import { useState } from "react";
import { JobPost } from "@/lib/types/jobs.types";
import JobCard from "./JobCard";

import styles from "./jobCardList.module.css";
import PaginationButtons from "../PaginationButtons";

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

      <PaginationButtons
        canGoLeft={canGoLeft}
        canGoRight={canGoRight}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        currentIndex={currentPage}
        totalItems={totalPages}
      />
    </div>
  );
}