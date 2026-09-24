"use client";

import { useSyncExternalStore } from "react";

function greetingForHour(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const subscribe = () => () => {};

/**
 * Time-of-day greeting resolved in the viewer's browser. The app is a static
 * export, so a Server Component would freeze the greeting at build time; the
 * neutral server snapshot avoids a hydration mismatch.
 */
export function TimeGreeting() {
  const greeting = useSyncExternalStore(
    subscribe,
    () => greetingForHour(new Date().getHours()),
    () => "Welcome",
  );

  return <>{greeting}</>;
}
