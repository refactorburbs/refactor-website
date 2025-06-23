import { Credentials } from "../types/auth.types";

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