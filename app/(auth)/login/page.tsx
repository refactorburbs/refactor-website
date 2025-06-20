"use client";

import { useActionState } from "react";
import { login } from "@/app/actions";
import Link from "next/link";

import styles from "../auth.module.css";

export default function Login() {
    const [state, action, pending] = useActionState(login, undefined);
  return (
    <div className={styles.auth_form_wrapper}>
      <h2>Welcome Back!</h2>
      <form action={action} className={styles.auth_form}>
        <input id="email" name="email" type="email" placeholder="Email" />
        {state?.errors?.email && <span className={styles.error_msg}>{state.errors.email}</span>}

        <input id="password" name="password" type="password" placeholder="Password"/>
        {state?.errors?.password && <span className={styles.error_msg}>{state.errors.password}</span>}

        {state?.message && (
          <span className={styles.error_msg}>
            {state.message}
          </span>
        )}

        <button disabled={pending} type="submit">
          <span>Sign In</span>
        </button>
      </form>
      <div className={styles.alt_auth_link}>
        <span>{"Don't have an account?"}</span>
        <Link href="/sign-up">Create Account</Link>
      </div>
    </div>
  );
}