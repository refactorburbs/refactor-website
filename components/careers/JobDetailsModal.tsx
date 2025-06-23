"use client";

import { JobPost } from "@/lib/types/jobs.types";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DetailsModalSection from "./DetailsModalSection";
import { timeAgo } from "@/lib/utils/general.utils";
import Link from "next/link";

import styles from "./jobDetailsModal.module.css";

const renderTags = (tags: string[]) => {
  if (tags.length === 0) return null;

  return (
    <div className={styles.tags_wrapper}>
      {tags.map((tag) => (
        <span key={tag} className={styles.tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function JobDetailsModal({ job }: { job: JobPost }) {
  const [showModal, setShowModal] = useState(false);
  const applyUrl = `/apply/${job.id}`;

  const jobDetailsSections = [
    { title: "About the Job", items: job.aboutTheJob, isList: false },
    { title: "Experience", items: job.experience, isList: true },
    { title: "Responsibilities", items: job.responsibilities, isList: true },
    { title: "Requirements", items: job.requirements, isList: true },
    { title: "Pluses", items: job.pluses, isList: true },
  ]

  const handleOpenModal = () => {
    setShowModal(true);
    document.documentElement.style.overflow = "hidden";
  }

  const handleCloseModal = () => {
    setShowModal(false);
    document.documentElement.style.overflow = "unset";
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(function cleanUpHTMLOverflow() {
    return () => {
      document.documentElement.style.overflow = "unset";
    }
  }, []);

  return (
    <>
      <button onClick={handleOpenModal}>
        <span>View Details</span>
      </button>

      {showModal && (
        <>
          {/* Create a portal to render modal at document root */}
          {typeof document !== "undefined" &&
            createPortal(
              <div
                className={styles.modal_backdrop}
                onClick={handleBackdropClick}
              >
                <div className={styles.modal_content}>
                  <button
                    className={styles.close_button}
                    onClick={handleCloseModal}
                    aria-label="Close modal"
                  >
                    <span>x</span>
                  </button>

                  <div className={styles.modal_body}>
                    <div className={styles.job_header}>
                      <h2>{job.title}</h2>
                      <span>{`Posted ${timeAgo(job.createdAt)}`}</span>
                    </div>
                    {renderTags(job.tags)}
                    {jobDetailsSections.map((section) => (
                      <DetailsModalSection
                        title={section.title}
                        items={section.items}
                        isList={section.isList}
                        key={section.title}
                      />
                    ))}
                  </div>
                  <Link href={applyUrl} className={styles.apply_button}>
                    <button>
                      <span>Apply</span>
                    </button>
                  </Link>
                </div>
              </div>,
              document.body
            )
          }
        </>
      )}
    </>
  );
}