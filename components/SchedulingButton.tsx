"use client";

const SCHEDULING_URL =
  "https://app.onecal.io/b/dwight-davis/boise-marketing-guy";

export function SchedulingButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <a
      href={SCHEDULING_URL}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
