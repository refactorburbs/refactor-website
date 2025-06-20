export type AuthFormState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    confirmpassword?: string[]
    code?: string[]
  }
  message?: string
} | undefined;

export type ContactFormState = {
  success: boolean;
  message?: string;
  errors?: {
    user_name?: string;
    user_email?: string;
    message?: string;
  };
} | undefined;

export type GameFormState = {
  errors?: {
    steamId?: string[]
    name?: string[]
    storePage?: string[]
  }
  message?: string
} | undefined;

export type JobPostingFormState = {
  errors?: {
    title?: string[]
    summary?: string[]
    tags?: string[]
    aboutTheJob?: string[]
    experience?: string[]
    responsibilities?: string[]
    requirements?: string[]
    pluses?: string[]
  }
  message?: string
} | undefined;

export type SubmitJobApplicationActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};