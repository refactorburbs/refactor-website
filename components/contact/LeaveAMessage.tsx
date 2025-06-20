"use client";

import { useActionState } from "react";
import AnimatedHeader from "../AnimatedHeader";
import { submitContactUsEmail } from "@/app/actions";

import styles from "./leaveAMessage.module.css";

export default function LeaveAMessage() {
  const [state, action, isPending] = useActionState(submitContactUsEmail, {
    success: false,
    message: "",
    errors: {
      user_name: "",
      user_email: "",
      message: ""
    }
  });

  return (
    <div className={styles.contact_us}>
      <AnimatedHeader title="LEAVE US A MESSAGE" hasIcon={false} isAnimatingUnderline={true}/>
      <div className={`gradient-container ${styles.contact_wrapper}`}>
        <form action={action} className={styles.contact_form}>
          <div className={styles.form_section_wrapper}>
            <label className={styles.form_label}>
              Name *
            </label>
            <input className={styles.form_input} type="text" name="user_name" required/>
            {state?.errors?.user_name && (
              <span className={styles.error}>{state.errors.user_name}</span>
            )}
          </div>

          <div className={styles.form_section_wrapper}>
            <label className={styles.form_label}>
              Email *
            </label>
            <input className={styles.form_input} type="email" name="user_email" required/>
            {state?.errors?.user_email && (
              <span className={styles.error}>{state.errors.user_email}</span>
            )}
          </div>

          <div className={styles.form_section_wrapper}>
            <label className={`${styles.form_label} ${styles.textarea_label}`}>
              Message *
            </label>
            <textarea id="message" name="message" rows={8} className={styles.form_textarea} required/>
            {state?.errors?.message && (
              <span className={styles.error}>{state.errors.message}</span>
            )}
          </div>

          {state?.success && (
            <div className={styles.success}>✓ {state.message}</div>
          )}

          {state?.message && !state.success && (
            <div className={styles.error}>{state.message}</div>
          )}

          <button className={styles.contact_us_button} type="submit" disabled={isPending}>
            <span>{isPending ? "Sending..." : "Submit"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}