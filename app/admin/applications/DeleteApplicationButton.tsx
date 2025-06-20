import { deleteJobApplication } from "@/app/actions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./jobApplicationCard.module.css";

export default function DeleteApplicationButton({ applicationId }: { applicationId: number }) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    )

    if (!confirmed) return;

    try {
      await deleteJobApplication(applicationId);
    } catch (error) {
      console.error("Failed to delete applicant:", error);
      alert("Failed to delete applicant. Please try again.");
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