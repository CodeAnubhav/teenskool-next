"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as Provider } from "posthog-js/react";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

if (typeof window !== "undefined" && KEY && !posthog.__loaded) {
  posthog.init(KEY, {
    api_host: HOST,
    capture_pageview: false,
    capture_pageleave: true,
  });
}

// Reading the URL at capture time rather than via useSearchParams keeps this
// out of the Suspense/dynamic-rendering path, so static routes stay static.
function useTrackPageViews() {
  const pathname = usePathname();

  useEffect(() => {
    if (!KEY) return;
    posthog.capture("$pageview", { $current_url: window.location.href });
  }, [pathname]);
}

export default function PostHogProvider({ children }) {
  useTrackPageViews();

  if (!KEY) return children;
  return <Provider client={posthog}>{children}</Provider>;
}
