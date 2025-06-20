export type TContactUsFormState = {
  success: boolean;
  message?: string;
  errors?: {
    user_name?: string;
    user_email?: string;
    message?: string;
  };
} | undefined;