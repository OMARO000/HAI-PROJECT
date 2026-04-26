/**
 * Shared email validation utilities.
 * Used by both client components and server-side API routes.
 */

export const FREE_EMAIL_DOMAINS: readonly string[] = [
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com",
  "aol.com", "mail.com", "protonmail.com", "pm.me", "tutanota.com",
  "gmx.com", "zoho.com", "yandex.com", "live.com", "msn.com",
];

/**
 * Returns true if the email domain is not in the personal-domain blocklist.
 * Returns false if the email is malformed, missing a domain, or on the blocklist.
 */
export function isWorkEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.includes(domain);
}
