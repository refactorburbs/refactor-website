import { IJobPost } from "@/lib/types/careers.types";
import ScrollAnimatedElement from "../ScrollAnimatedElement";

import styles from "./jobCard.module.css";
import JobDetailsModal from "./JobDetailsModal";

interface JobCardProps {
  job: IJobPost;
}

const truncateSummary = (summary: string): string => {
  if (summary.length >= 140) {
    const truncated = `${summary.slice(0, 140)}...`;
    return truncated;
  }
  return summary;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <ScrollAnimatedElement directionIn="up" directionOut="up" thresholdIn={0.5} thresholdOut={0.5}>
      <div className={`gradient-container ${styles.job_card}`}>
        <div className={styles.job_summary}>
          <h2>{job.title}</h2>
          <p>{truncateSummary(job.summary)}</p>
        </div>
        <JobDetailsModal job={job}/>
      </div>
    </ScrollAnimatedElement>
  );
}