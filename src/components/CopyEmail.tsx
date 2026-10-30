"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "copied" | "failed";

/**
 * The email address as a button that copies it. A mailto link does nothing
 * on desktops without a configured mail app, so copying works everywhere.
 */
export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timeout = setTimeout(() => setStatus("idle"), 2500);
    return () => clearTimeout(timeout);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      // Clipboard can be blocked; the address is still visible to select by hand.
      setStatus("failed");
    }
  };

  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-3">
      <button type="button" onClick={copy} className={`cursor-pointer ${className ?? ""}`}>
        {email}
        <span className="sr-only"> (copy to clipboard)</span>
      </button>
      <span aria-live="polite" className="text-[0.85em] text-text-muted">
        {status === "copied" && "Copied to clipboard"}
        {status === "failed" && "Couldn't copy. Select the address instead."}
      </span>
    </span>
  );
}
