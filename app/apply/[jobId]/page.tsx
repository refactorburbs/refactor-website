import { notFound } from "next/navigation";
import ApplicationForm from "./ApplicationForm";
import prisma from "@/lib/prisma";
import Image from "next/image";

import styles from "./applyPage.module.css";

export default async function ApplyPage({ params }: { params: Promise<{jobId: string}> }) {
  const { jobId } = await params;
  const jobIdInt = Number(jobId);

  if (isNaN(jobIdInt)) {
    notFound();
  }
  const job = await prisma.jobPosting.findUnique({
    where: { id: jobIdInt },
    select: {
      id: true,
      title: true,
      summary: true
    }
  });

  if (!job) {
    notFound();
  }

  return (
    <div className={styles.apply_page}>
      <div className={styles.apply_header_wrapper}>
        <div className={styles.apply_header}>
          <h1>Join the Team!</h1>
          <h2>{`Apply for ${job.title}`}</h2>
        </div>
        <Image
          src="/refactor-games-logo.webp"
          alt="Refactor Games Logo"
          className={styles.refactor_logo}
          width={326}
          height={88}
        />
      </div>
      <h3 className={styles.apply_summary}>
        {job.summary}
      </h3>
      <ApplicationForm jobId={jobIdInt}/>
    </div>
  );
}