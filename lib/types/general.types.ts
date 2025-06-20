export interface IActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export type TFormState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    confirmpassword?: string[]
    code?: string[]
  }
  message?: string
} | undefined

export type SessionPayload = {
  userId: string
  expiresAt: Date
}