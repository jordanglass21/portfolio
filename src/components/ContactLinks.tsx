import { CopyButton } from "@/components/CopyButton";
import { ExternalLink } from "@/components/ExternalLink";
import { profile } from "@/content/profile";

const linkClass =
  "underline decoration-border underline-offset-4 transition-colors hover:decoration-field";

export function ContactLinks({ className }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 ${className ?? ""}`}>
      <li>
        <ExternalLink href={profile.githubUrl} className={linkClass}>
          GitHub
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={profile.linkedinUrl} className={linkClass}>
          LinkedIn
        </ExternalLink>
      </li>
      <li className="flex items-center gap-2">
        {/* Show the address: mailto does nothing without a configured mail app. */}
        <a href={`mailto:${profile.email}`} className={linkClass}>
          {profile.email}
        </a>
        <CopyButton text={profile.email} label="Copy email address" />
      </li>
      {profile.resumeUrl && (
        <li>
          <ExternalLink href={profile.resumeUrl} className={linkClass}>
            Résumé
          </ExternalLink>
        </li>
      )}
    </ul>
  );
}
