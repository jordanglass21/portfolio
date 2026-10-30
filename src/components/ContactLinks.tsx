import { CopyEmail } from "@/components/CopyEmail";
import { ExternalLink } from "@/components/ExternalLink";
import { profile } from "@/content/profile";

const linkClass =
  "underline decoration-border underline-offset-4 transition-colors hover:decoration-field";

export function ContactLinks({ className }: { className?: string }) {
  return (
    <div className={`space-y-3 ${className ?? ""}`}>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
        {profile.resumeUrl && (
          <li>
            <ExternalLink href={profile.resumeUrl} className={linkClass}>
              Résumé
            </ExternalLink>
          </li>
        )}
      </ul>
      <p>
        <CopyEmail email={profile.email} className={linkClass} />
      </p>
    </div>
  );
}
