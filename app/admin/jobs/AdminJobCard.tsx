import { IJobPosting } from "@/lib/types/admin.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import DeleteJobButton from "./DeleteJobButton";
import { getJobApplicationCount } from "@/app/actions";

import styles from "./adminJobCard.module.css";
import { timeAgo } from "@/lib/utils/general.utils";

interface AdminJobCardProps {
  job: IJobPosting;
}

export default async function AdminJobCard({ job }: AdminJobCardProps) {
  const numApplicants = await getJobApplicationCount(job.id);
  return (
    <div className={styles.admin_job_card}>
      <div className={styles.job_info}>
        <div className={styles.job_header}>
          <h2>{job.title}</h2>
          <span>{`Posted ${timeAgo(job.createdAt)}`}</span>
          <small>{`${numApplicants} applicant${numApplicants === 1 ? "" : "s"}`}</small>
        </div>
        <span>{job.summary}</span>
      </div>

      <div className={styles.job_buttons}>
        <Link
          href={`/admin/jobs/edit/${job.id}`}
          className={styles.edit_button}
        >
          <FontAwesomeIcon icon={faEdit} className={styles.edit_icon}/>
        </Link>
        <DeleteJobButton
          jobId={job.id}
          jobTitle={job.title}
        />
      </div>
    </div>
  );
}