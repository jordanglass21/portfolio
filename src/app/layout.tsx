import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ContactLinks } from "@/components/ContactLinks";
import { Copyright } from "@/components/Copyright";
import { NavLinks } from "@/components/NavLinks";
import { profile } from "@/content/profile";
import { siteUrl } from "@/content/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

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
    <html lang="en" className={`${jakarta.variable} antialiased`}>
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
            className="mx-auto flex h-16 max-w-6xl items-center justify-end px-6"
          >
            <NavLinks />
          </nav>
        </header>
        <div id="main" className="flex-1">
          {children}
        </div>
        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
            <Copyright />
            <ContactLinks variant="plain" />
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
