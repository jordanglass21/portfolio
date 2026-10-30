"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  label: string;
};

export function CopyButton({ text, label }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard can be blocked; the address is still visible to select by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className="rounded border border-border px-2 py-0.5 text-[0.8em] text-text-muted transition-colors hover:text-text"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
