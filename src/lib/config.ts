const DEFAULT_APP_URL = "http://localhost:3000";
const DEFAULT_API_BASE_URL = "http://localhost:8080/api/v1";

function asUrl(value: string | undefined, fallback: string): string {
  try {
    return new URL(value ?? fallback).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

const appUrl = asUrl(process.env.NEXT_PUBLIC_APP_URL, DEFAULT_APP_URL);

export const publicConfig = {
  appUrl,
  /** `appUrl` without its protocol, for display, e.g. `localhost:3000`. */
  publicHost: appUrl.replace(/^https?:\/\//, ""),
  apiBaseUrl: asUrl(process.env.NEXT_PUBLIC_API_BASE_URL, DEFAULT_API_BASE_URL),
} as const;

/**
 * Canonical public invitation address. The platform slug is not a custom
 * domain; custom domains are a separate, later concept.
 */
export function publicInvitationUrl(slug: string): string {
  return `${publicConfig.appUrl}/${slug}`;
}

export function publicInvitationDisplayUrl(slug: string): string {
  return `${publicConfig.publicHost}/${slug}`;
}
