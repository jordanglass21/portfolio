"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
] as const;

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex gap-6 text-sm">
      {links.map(({ href, label }) => {
        const current = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={current ? "page" : undefined}
              className={
                current
                  ? "font-semibold text-accent"
                  : "text-text-muted transition-colors hover:text-text"
              }
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
