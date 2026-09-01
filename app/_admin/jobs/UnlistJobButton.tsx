"use client";

import { toggleJobUnlisted } from "@/app/actions/jobs.actions";

interface UnlistJobButtonProps {
  jobId: number;
  jobTitle: string;
  isUnlisted: boolean;
}

export default function UnlistJobButton({ jobId, jobTitle, isUnlisted }: UnlistJobButtonProps) {

  const handleUnlistClick = async () => {
    const alertText = isUnlisted ? `Reviving "${jobTitle}" - It will now be visible on the website again.`
      : `Unlisting: "${jobTitle}". This job can be Relisted. Applicants and their resumes remain in the database.`;
    const confirmed = window.confirm(alertText);

    if (!confirmed) return;

    try {
      await toggleJobUnlisted(Number(jobId), isUnlisted);
    } catch (error) {
      console.error(`Failed to ${isUnlisted ? "Relist" : "Unlist"} job posting: ${error}`);
      alert(`Failed to ${isUnlisted ? "Relist" : "Unlist"} job posting: ${error}`);
    }
  }

  return (
    <div onClick={handleUnlistClick} style={{ cursor: "pointer" }}>
      {isUnlisted ? "Relist" : "Unlist"}
    </div>
  );
}