"use client";

import { useActionState } from "react";
import { signup } from "@/app/actions";
import Link from "next/link";

import styles from "../auth.module.css";

export default function SignUp() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className={styles.auth_form_wrapper}>
      <h2>Create an Account</h2>
      <form action={action} className={styles.auth_form}>
        <input id="name" name="name" placeholder="Name" />
        {state?.errors?.name && <span className={styles.error_msg}>{state.errors.name}</span>}

        <input id="email" name="email" type="email" placeholder="Email" />
        {state?.errors?.email && <span className={styles.error_msg}>{state.errors.email}</span>}

        <input id="password" name="password" type="password" placeholder="Password"/>
        {state?.errors?.password && <span className={styles.error_msg}>{state.errors.password}</span>}

        <input id="confirmpassword" name="confirmpassword" type="password" placeholder="Confirm Password"/>
        {state?.errors?.confirmpassword && <span className={styles.error_msg}>{state.errors.confirmpassword}</span>}

        <input id="code" name="code" type="password" placeholder="Admin Code"/>
        {state?.errors?.code && <span className={styles.error_msg}>{state.errors.code}</span>}

        {state?.message && (
          <span className={styles.error_msg}>
            {state.message}
          </span>
        )}

        <button disabled={pending} type="submit">
          <span>Sign Up</span>
        </button>
      </form>
      <div className={styles.alt_auth_link}>
        <span>Already have an account?</span>
        <Link href="/login">Sign in</Link>
      </div>
    </div>
  );
}