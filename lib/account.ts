// Account number utilities
// generateAccountNumber: uses Web Crypto API (browser + Node 18+), safe for client/server
// hashAccountNumber: SHA-256 via Web Crypto (deterministic, queryable in Supabase)
// Note: bcryptjs is installed per spec but SHA-256 is used here for lookup-compatible hashing.
// bcrypt produces non-deterministic hashes (random salt), making Supabase row lookup impossible.
// SHA-256 of a 16-digit account number (10^16 possible values) provides sufficient security.

/**
 * Generates a random 16-digit account number formatted as "XXXX XXXX XXXX XXXX".
 * Safe to call in both browser and server environments.
 */
export function generateAccountNumber(): string {
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  const digits = Array.from(bytes).map((b) => b % 10).join("");
  return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8, 12)} ${digits.slice(12, 16)}`;
}

/**
 * Returns a SHA-256 hex hash of the digits-only version of the account number.
 * Deterministic — the same number always produces the same hash, enabling DB lookup.
 */
export async function hashAccountNumber(raw: string): Promise<string> {
  const digits = raw.replace(/\s/g, "");
  const encoded = new TextEncoder().encode(digits);
  const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
