import { Credentials } from "../types/auth.types";

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

/**
 * Ensures a URL uses HTTPS instead of HTTP.
 *
 * This is useful for avoiding mixed content errors when loading assets
 * (e.g., from the Steam API) in production environments where HTTPS is required.
 *
 * @param url - The input URL string to secure.
 * @returns The same URL, but with 'http://' replaced by 'https://' if applicable.
 */
export function forceHttps(url: string): string {
  if (url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
}

/**
 * Removes HTML tags and decodes common HTML entities from a string.
 *
 * This is helpful for cleaning up rich text (like Steam API long descriptions)
 * that include HTML or Markdown formatting and displaying them as plain text.
 *
 * @param string - The encoded or HTML-formatted input string.
 * @returns A plain text string with HTML tags and entities removed or decoded.
 */
export function scrubHTMLEncodedString(string: string): string {
  const parsed = JSON.parse(JSON.stringify(string));
  const decoded = parsed.replace(/<[^>]*>/g, ''); // remove HTML tags
  // Decode common HTML entities that should be symbols in the string
  const entityMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' '
  };
  const decodedEntities = decoded.replace(/&[a-zA-Z#0-9]+;/g, (entity: string) => entityMap[entity] || entity);
  return decodedEntities
    .replace(/([.:!?])(?=\S)(?!\s|[A-Z]\.)/g, '$1 ') // Ensure space after ., :, !, or ? unless it's an abbreviation like U.S.A.
    .trim();
}

/**
 * Converts a date into a human-readable relative time string like "2 days ago".
 *
 * Useful for UI elements that show how recently something was updated.
 *
 * @param date - The date (or ISO date string) to compare to the current time.
 * @returns A string describing the elapsed time since the given date.
 */
export function timeAgo(date: Date | string): string {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export function availabilityIn(app: JobApplication): string {
  const AUTO_FILLED_START_DATE = new Date("2025-12-11T02:13:38.871Z");
  const start = new Date(app.startDate);
  const now = new Date();

  // 1. If startDate was auto-filled (from updating the database)
  if (start.getTime() === AUTO_FILLED_START_DATE.getTime()) {
    return "not specified";
  }

  // 2. Compute time difference (future)
  const diffMs = start.getTime() - now.getTime();

  // If it's already passed or within ~1 week
  const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
  if (diffMs <= oneWeekMs) {
    return "now";
  }

  // 3. Convert the future difference
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30); // approximation is ok for UI

  // If under 1 month → use weeks
  if (diffDays < 30) {
    return `in ${diffWeeks} week${diffWeeks > 1 ? "s" : ""}`;
  }

  // 4. Otherwise → use months
  const months = diffMonths;
  return `in ${months} month${months > 1 ? "s" : ""}`;
}

export function getCredentials(): Credentials {
  return {
    github: {
      email: process.env.GITHUB_EMAIL || "",
      password: process.env.GITHUB_PASS || ""
    },
    prisma: {
      email: process.env.PRISMA_EMAIL || "",
      password: process.env.PRISMA_PASS || ""
    },
    pinata: {
      email: process.env.PINATA_EMAIL || "",
      password: process.env.PINATA_PASS || ""
    },
    emailjs: {
      email: process.env.EMAILJS_EMAIL || "",
      password: process.env.EMAILJS_PASS || ""
    }
  }
}