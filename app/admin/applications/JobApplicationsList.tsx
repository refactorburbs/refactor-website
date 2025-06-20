"use client";

import { useState, useEffect } from "react";
import JobApplicationCard from "./JobApplicationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faStar } from "@fortawesome/free-solid-svg-icons";

import styles from "./jobApplicationList.module.css";

interface JobPosting {
  id: number
  title: string
  _count: {
    JobApplication: number
  }
}

interface JobApplication {
  id: number
  firstName: string
  lastName: string
  email: string
  portfolio?: string | null
  linkedIn?: string | null
  other?: string | null
  resume: string
  starred: boolean
  jobPostingId: number
  jobPosting: {
    id: number
    title: string
  }
  createdAt: Date
  updatedAt: Date
}

interface JobApplicationsListProps {
  applications: JobApplication[]
  jobPostings: JobPosting[]
}

export default function JobApplicationsList({ applications, jobPostings }: JobApplicationsListProps) {
  const [filteredApplications, setFilteredApplications] = useState(applications);
  const [selectedJobId, setSelectedJobId] = useState<string>("all");
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  useEffect(function filterAppsWhenDropdownChanges () {
    let filtered = applications;

    // Filter by job post id
    if (selectedJobId !== "all") {
      const jobId = Number(selectedJobId);
      filtered = filtered.filter(app => app.jobPostingId === jobId);
    }

    // Filter by starred status
    if (showStarredOnly) {
      filtered = filtered.filter(app => app.starred);
    }

    setFilteredApplications(filtered);
  }, [applications, selectedJobId, showStarredOnly]);

  const starredCount = applications.filter(app => app.starred).length;
  const totalCount = applications.length;

  return (
    <div className={styles.applications_wrapper}>
      <div className={styles.applications_header}>

        <div className={styles.header_info}>
          <h3>Current Applicants</h3>
          <div className={styles.application_stats}>
            <span>
              {totalCount} total applications
            </span>
            {starredCount > 0 && (
              <span>
                <FontAwesomeIcon icon={faStar} className={styles.star_icon} />
                {` ${starredCount}`}
              </span>
            )}
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.filter_group}>
            <label htmlFor="job-filter" className={styles.filter_label}>
              <FontAwesomeIcon icon={faFilter}/>
              Filter by Position:
            </label>
            <select
              id="job-filter"
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className={styles.job_filter_select}
            >
              <option value="all">All Positions ({totalCount})</option>
              {jobPostings.map(job => (
                <option key={job.id} value={job.id.toString()}>
                  {job.title} ({job._count.JobApplication})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filter_group}>
            <label className={styles.starred_filter}>
              <input
                type="checkbox"
                checked={showStarredOnly}
                onChange={(e) => setShowStarredOnly(e.target.checked)}
              />
              <FontAwesomeIcon icon={faStar} className={showStarredOnly ? styles.stars_toggled : styles.stars_not_toggled}/>
              Starred Only
            </label>
          </div>
        </div>
      </div>

      <div className={styles.filter_results}>
        {filteredApplications.length !== totalCount && (
          <p className={styles.filter_info}>
            Showing {filteredApplications.length} of {totalCount} applications
            {selectedJobId !== "all" && (
              <span> for {jobPostings.find(j => j.id.toString() === selectedJobId)?.title}</span>
            )}
            {showStarredOnly && <span> (starred only)</span>}
          </p>
        )}
      </div>

      <div className={styles.applications_grid}>
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
            <JobApplicationCard
              application={application}
              key={application.id}
            />
          ))
        ) : (
          <div className={styles.no_applications}>
            <p>
              {applications.length === 0
                ? "No job applications found."
                : "No applications match your current filters."
              }
            </p>
            {filteredApplications.length === 0 && totalCount > 0 && (
              <button
                onClick={() => {
                  setSelectedJobId("all")
                  setShowStarredOnly(false)
                }}
                className={styles.clear_filters_btn}
              >
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}