import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faUser, faEnvelope, faBriefcase, faEarthAmericas, faSackDollar } from "@fortawesome/free-solid-svg-icons";
import StarFavoriteButton from "./StarFavoriteButton";
import DeleteApplicationButton from "./DeleteApplicationButton";

import styles from "./jobApplicationCard.module.css";
import { availabilityIn, timeAgo } from "@/lib/utils/general.utils";

interface JobApplication {
  id: number
  firstName: string
  lastName: string
  email: string
  location: string
  salary: number
  startDate: Date
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

interface JobApplicationCardProps {
  application: JobApplication;
}

export default function JobApplicationCard({ application }: JobApplicationCardProps) {
  const fullName = `${application.firstName} ${application.lastName}`

  return (
    <div className={styles.application_card}>
      <div className={styles.card_header}>
        <div className={styles.applicant_info}>

          <h3 className={styles.applicant_name}>
            <FontAwesomeIcon icon={faUser} />
            {fullName}
          </h3>

          <p className={styles.job_title}>
            <FontAwesomeIcon icon={faBriefcase} className={styles.briefcase_icon}/>
            Applied for: {application.jobPosting.title}
          </p>

          {application.location &&
            <p className={styles.job_fit_item}>
              <FontAwesomeIcon icon={faEarthAmericas} className={styles.briefcase_icon}/>
              {application.location}
            </p>
          }

          <div className={styles.contact_info}>
            <div className={styles.contact_item}>
              <FontAwesomeIcon icon={faEnvelope} />
              <a href={`mailto:${application.email}`} className={styles.email_link}>
                {application.email}
              </a>
            </div>
            {application.salary > 0 &&
              <p className={styles.job_fit_item}>
                <FontAwesomeIcon icon={faSackDollar} className={styles.briefcase_icon}/>
                {application.salary.toLocaleString("en-US")}
              </p>
            }
          </div>

        </div>

        <StarFavoriteButton applicationId={application.id} isStarred={application.starred}/>
      </div>

      <div className={styles.links_section}>
        <div className={styles.links_grid}>
          <a
            href={application.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.link_item} ${styles.resume_link}`}
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} />
            View Resume
          </a>

          {application.portfolio && (
            <a
              href={application.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.link_item} ${styles.portfolio_link}`}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              Portfolio
            </a>
          )}

          {application.linkedIn && (
            <a
              href={application.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.link_item} ${styles.linkedin_link}`}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              LinkedIn
            </a>
          )}

          {application.other && (
            <span><small className={styles.other}>other info: </small>{application.other}</span>
          )}
        </div>
      </div>

      <div className={styles.application_meta}>
        <span>Applied: {application.createdAt.toLocaleDateString()} ( {timeAgo(application.createdAt)} )</span>
        <span>Available: {application.startDate.toLocaleDateString()} ( {availabilityIn(application)} )</span>
        <DeleteApplicationButton applicationId={application.id}/>
      </div>
    </div>
  );
}