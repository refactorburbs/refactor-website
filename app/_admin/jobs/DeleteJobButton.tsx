"use client";

import { deleteJobPosting } from "@/app/actions/jobs.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import styles from "./adminJobCard.module.css";

interface DeleteGameButtonProps {
  jobId: number
  jobTitle: string
}

export default function DeleteGameButton({ jobId, jobTitle }: DeleteGameButtonProps) {

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the Job Position: "${jobTitle}"? This will also delete all associated applicants.`
    )

    if (!confirmed) return;

    try {
      await deleteJobPosting(Number(jobId));
    } catch (error) {
      console.error("Failed to delete job posting:", error);
      alert("Failed to delete job posting. Please try again.");
    }
  }

  return (
    <div onClick={handleDelete}>
      <FontAwesomeIcon
        icon={faTrash}
        className={styles.trash_icon}
      />
    </div>
  );
}