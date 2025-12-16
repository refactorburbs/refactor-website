export const ADMIN_CODE = process.env.ADMIN_CODE || "admin123"
export const ALLOWED_EMAILS = new Set(
  (process.env.ADMIN_ALLOWED_EMAILS ?? "")
  .split(",")
  .map(e => e.trim().toLowerCase())
)