const DEFAULT_APP_URL = "http://localhost:3000";
const DEFAULT_API_BASE_URL = "http://localhost:8080/api/v1";

function asUrl(value: string | undefined, fallback: string): string {
  try {
    return new URL(value ?? fallback).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

export const publicConfig = {
  appUrl: asUrl(process.env.NEXT_PUBLIC_APP_URL, DEFAULT_APP_URL),
  apiBaseUrl: asUrl(process.env.NEXT_PUBLIC_API_BASE_URL, DEFAULT_API_BASE_URL),
} as const;
