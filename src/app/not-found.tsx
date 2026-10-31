import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

const linkClass =
  "underline decoration-border underline-offset-4 transition-colors hover:decoration-field";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-32">
      <h1 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">Page not found</h1>
      <p className="mt-4 text-lg text-text-muted">
        That page doesn&apos;t exist. Try the{" "}
        <Link href="/" className={linkClass}>
          About page
        </Link>{" "}
        or{" "}
        <Link href="/projects" className={linkClass}>
          Projects
        </Link>
        .
      </p>
    </main>
  );
}
