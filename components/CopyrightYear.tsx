"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Read on the client so prerendered pages don't freeze the year at build time.
export function CopyrightYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <span>{year}</span>;
}
