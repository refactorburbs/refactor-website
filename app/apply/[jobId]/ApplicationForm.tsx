"use client";

import { submitJobApplication } from "@/app/actions";
import { useActionState } from "react";

import styles from "./applicationForm.module.css";

export default function ApplicationForm({ jobId }: { jobId: number }) {
  const [state, action, isPending] = useActionState(submitJobApplication, null);

  return (
    <form action={action}>
      {/* Hidden input to include jobId in form data */}
      <input type="hidden" name="jobId" value={jobId} />

      <div className={styles.application_section_divider}>
        <h3>Personal Info:</h3>
        <div className="thin-divider" />
      </div>

      <div className={styles.application_section}>
        <div className={styles.input_label_wrapper}>
          <label htmlFor="firstName">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className={`${styles.input_field} gradient-container`}
          />
          {state?.errors?.firstName && (
            <div style={{ color: "indianRed", fontSize: "0.875rem" }}>
              {state.errors.firstName[0]}
            </div>
          )}
        </div>
        <div className={styles.input_label_wrapper}>
          <label htmlFor="lastName">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className={`${styles.input_field} gradient-container`}
          />
          {state?.errors?.lastName && (
            <div style={{ color: "indianRed", fontSize: "0.875rem" }}>
              {state.errors.lastName[0]}
            </div>
          )}
        </div>
        <div className={styles.input_label_wrapper}>
          <label htmlFor="email">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={`${styles.input_field} gradient-container`}
          />
          {state?.errors?.email && (
            <div style={{ color: "indianRed", fontSize: "0.875rem" }}>
              {state.errors.email[0]}
            </div>
          )}
        </div>
      </div>

      <div className={styles.application_section_divider}>
        <h3>Personal Links:</h3>
        <div className="thin-divider" />
      </div>

      <div className={styles.application_section}>
        <div className={styles.input_label_wrapper}>
          <label htmlFor="portfolio">
            Portfolio
          </label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            placeholder="https://your-portfolio.com"
            className={`${styles.input_field} gradient-container`}
          />
        </div>

        <div className={styles.input_label_wrapper}>
          <label htmlFor="linkedIn">
            LinkedIn
          </label>
          <input
            type="url"
            id="linkedIn"
            name="linkedIn"
            placeholder="https://linkedin.com/in/your-profile"
            className={`${styles.input_field} gradient-container`}
          />
        </div>

        <div className={`${styles.input_label_wrapper} ${styles.text_area_wrapper}`}>
          <label htmlFor="other">
            Other
          </label>
          <textarea
            id="other"
            name="other"
            placeholder="Additional link or information"
            className={`${styles.input_field} gradient-container`}
          />
        </div>

      </div>

      <div className={`${styles.input_label_wrapper} ${styles.resume_upload}`}>
        <label htmlFor="resume" style={{ color: "var(--color-secondary)", fontSize: "large" }}>
          Resume *
        </label>
        <input
          type="file"
          id="resume"
          name="resume"
          accept=".pdf,.doc,.docx"
          required
        />
        {state?.errors?.resume && (
          <div style={{ color: "indianRed", fontSize: "0.875rem" }}>
            {state.errors.resume[0]}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={styles.submit_app_button}
      >
        <span>{isPending ? "Submitting..." : "Submit Application"}</span>
      </button>

      {state?.message && (
        <div style={{
          color: state.success ? "forestGreen" : "indianRed",
          marginTop: "1rem",
          padding: "0.5rem",
          border: `1px solid ${state.success ? "forestGreen" : "indianRed"}`,
          borderRadius: "4px",
          backgroundColor: "transparent"
        }}>
          {state.message}
        </div>
      )}
    </form>
  );
}