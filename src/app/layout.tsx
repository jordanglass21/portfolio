import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { ContactLinks } from "@/components/ContactLinks";
import { NavLinks } from "@/components/NavLinks";
import { profile } from "@/content/profile";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Canonical domain. Vercel's VERCEL_PROJECT_PRODUCTION_URL reports www, which only redirects here.
const siteUrl = "https://jordanglass.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name}, ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.headline,
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: `${profile.name}, ${profile.role}`,
    description: profile.headline,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-bg focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <header className="border-b border-border">
          <nav
            aria-label="Main"
            className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6"
          >
            <Link href="/" className="font-semibold tracking-[-0.01em]">
              {profile.name}
            </Link>
            <NavLinks />
          </nav>
        </header>
        <div id="main" className="flex-1">
          {children}
        </div>
        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>{profile.name}</p>
            <ContactLinks />
          </div>
        </footer>
      </body>
    </html>
  );
}
