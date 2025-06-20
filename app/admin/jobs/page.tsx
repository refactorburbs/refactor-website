import { getAllJobPostings } from "@/app/actions";
import AdminJobCard from "./AdminJobCard";
import Link from "next/link";
import { getUser } from "@/lib/dal";

import styles from "./jobPostings.module.css";

export default async function JobPostings() {
  await getUser();
  const jobPosts = await getAllJobPostings();
  return (
    <div className={styles.jobs_page}>
      <div className={styles.jobs_header}>
        <h3>{`Current Open Positions: ${jobPosts.length}`}</h3>
        <Link href="/admin/jobs/add" className={styles.add_button}>
          <span>{"Add +"}</span>
        </Link>
      </div>
      <div className={styles.current_jobs_list}>
        {jobPosts.length > 0 ? (
          jobPosts.map((job) => (
            <AdminJobCard job={job} key={job.id}/>
          ))
        ) : (
          <p>No job openings found. Add your first position!</p>
        )}
      </div>
    </div>
  );
}