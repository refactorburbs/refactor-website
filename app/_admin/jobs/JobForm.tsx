"use client";

import { useActionState, useState, useEffect } from "react";
import { JobPostingFormState } from "@/lib/types/forms.types";
import ArrayField from "./ArrayField";
import Link from "next/link";

import styles from "./jobForm.module.css";

interface JobPosting {
  id: number
  title: string
  summary: string
  tags: string[]
  aboutTheJob: string[]
  experience: string[]
  responsibilities: string[]
  requirements: string[]
  pluses: string[]
}

interface JobPostingFormProps {
  mode: "create" | "edit";
  jobPosting?: JobPosting | null;
  action: (state: JobPostingFormState, formData: FormData) => Promise<JobPostingFormState>;
}

export default function JobPostingForm({ mode, jobPosting, action }: JobPostingFormProps) {
  const [state, formAction, isPending] = useActionState<JobPostingFormState, FormData>(action, undefined);

  const [formData, setFormData] = useState({
    title: jobPosting?.title || "",
    summary: jobPosting?.summary || "",
    tags: jobPosting?.tags || [],
    aboutTheJob: jobPosting?.aboutTheJob || [],
    experience: jobPosting?.experience || [],
    responsibilities: jobPosting?.responsibilities || [],
    requirements: jobPosting?.requirements || [],
    pluses: jobPosting?.pluses || [],
  })

  // Update form data when jobPosting prop changes (for edit mode)
  useEffect(() => {
    if (jobPosting) {
      setFormData({
        title: jobPosting.title,
        summary: jobPosting.summary,
        tags: jobPosting.tags || [],
        aboutTheJob: jobPosting.aboutTheJob || [],
        experience: jobPosting.experience || [],
        responsibilities: jobPosting.responsibilities || [],
        requirements: jobPosting.requirements || [],
        pluses: jobPosting.pluses || [],
      })
    }
  }, [jobPosting]);

  // Clear form only on successful submission
  useEffect(() => {
    if (!state?.errors && !state?.message && mode === "create") {
      setFormData({
        title: "",
        summary: "",
        tags: [],
        aboutTheJob: [],
        experience: [],
        responsibilities: [],
        requirements: [],
        pluses: [],
      })
    }
  }, [state, mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className={styles.job_form_wrapper}>
      <div className={styles.form_header}>
        <Link href="/admin/jobs">
          ← Back to Job Posts
        </Link>
        <h2>{mode === "create" ? "Add New Job Posting" : `Edit ${jobPosting?.title || "Job Posting"}`}</h2>
      </div>

      <form action={formAction} className={styles.job_form}>
        {/* Basic Fields */}
        <div className={styles.form_group}>
          <label htmlFor="title">Job Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Senior Game Designer - UE5"
            value={formData.title}
            onChange={handleInputChange}
            className={state?.errors?.title ? "error" : ""}
          />
          {state?.errors?.title && (
            <span className={styles.error_message}>{state.errors.title[0]}</span>
          )}
        </div>

        <div className={styles.form_group}>
          <label htmlFor="summary">Job Summary *</label>
          <textarea
            id="summary"
            name="summary"
            placeholder="Brief description of the role, about 150 characters or less..."
            value={formData.summary}
            onChange={handleInputChange}
            className={state?.errors?.summary ? "error" : ""}
            rows={3}
          />
          {state?.errors?.summary && (
            <span className={styles.error_message}>{state.errors.summary[0]}</span>
          )}
        </div>

        {/* Array Fields - All optional except as noted */}
        <ArrayField
          label="Tags"
          name="tags"
          items={formData.tags}
          onChange={(items) => setFormData(prev => ({ ...prev, tags: items }))}
          placeholder="e.g. Unreal Engine 5"
          errors={state?.errors?.tags}
          required={false}
        />

        <ArrayField
          label="About The Job"
          name="aboutTheJob"
          items={formData.aboutTheJob}
          onChange={(items) => setFormData(prev => ({ ...prev, aboutTheJob: items }))}
          placeholder="One paragraph about the company or role..."
          errors={state?.errors?.aboutTheJob}
          required={false}
        />

        <ArrayField
          label="Experience"
          name="experience"
          items={formData.experience}
          onChange={(items) => setFormData(prev => ({ ...prev, experience: items }))}
          placeholder="e.g. 3+ years developing games for console..."
          errors={state?.errors?.experience}
          required={false}
        />

        <ArrayField
          label="Responsibilities"
          name="responsibilities"
          items={formData.responsibilities}
          onChange={(items) => setFormData(prev => ({ ...prev, responsibilities: items }))}
          placeholder="e.g. Design wireframes and prototypes..."
          errors={state?.errors?.responsibilities}
          required={false}
        />

        <ArrayField
          label="Requirements"
          name="requirements"
          items={formData.requirements}
          onChange={(items) => setFormData(prev => ({ ...prev, requirements: items }))}
          placeholder="e.g. 3+ years of experience with..."
          errors={state?.errors?.requirements}
          required={false}
        />

        <ArrayField
          label="Pluses"
          name="pluses"
          items={formData.pluses}
          onChange={(items) => setFormData(prev => ({ ...prev, pluses: items }))}
          placeholder="e.g. Experience with sports games..."
          errors={state?.errors?.pluses}
          required={false}
        />

        {state?.message && (
          <div className={styles.error_message}>
            {state.message}
          </div>
        )}

      <button type="submit" disabled={isPending} className={styles.submit_button}>
          <span>
            {isPending
              ? (mode === "create" ? "Creating..." : "Updating...")
              : (mode === "create" ? "Create Job Posting" : "Update Job Posting")
            }
          </span>
        </button>
      </form>

      <style jsx>{`

        .remove-btn:hover:not(:disabled) {
          background-color: #c82333;
        }

        .remove-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}