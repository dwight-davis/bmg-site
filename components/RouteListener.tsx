"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function RouteListenerInner({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    const qs = searchParams.toString();
    const url = pathname + (qs ? `?${qs}` : "");
    window.gtag("config", measurementId, { page_path: url });
    window.gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams, measurementId]);

  return null;
}

// useSearchParams needs Suspense in Next.js 15.
export function RouteListener({ measurementId }: { measurementId: string }) {
  if (!measurementId) return null;
  return (
    <Suspense fallback={null}>
      <RouteListenerInner measurementId={measurementId} />
    </Suspense>
  );
}
