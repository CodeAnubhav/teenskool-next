"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as Provider } from "posthog-js/react";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export default function PostHogProvider({ children }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!KEY) return;
    if (!posthog.__loaded) {
      posthog.init(KEY, {
        api_host: HOST,
        capture_pageview: false,
        capture_pageleave: true,
      });
    }
    setReady(true);
  }, []);

  // Reading the URL here rather than via useSearchParams keeps this out of the
  // Suspense/dynamic-rendering path, so static routes stay static.
  useEffect(() => {
    if (!ready) return;
    posthog.capture("$pageview", { $current_url: window.location.href });
  }, [pathname, ready]);

  if (!KEY) return children;
  return <Provider client={posthog}>{children}</Provider>;
}
