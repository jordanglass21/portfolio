import { CopyEmail } from "@/components/CopyEmail";
import { ExternalLink } from "@/components/ExternalLink";
import { profile } from "@/content/profile";

type Variant = "pills" | "plain";

const plainLink =
  "underline decoration-border underline-offset-4 transition-colors hover:decoration-accent";

const styles: Record<Variant, { primary: string; link: string; list: string }> = {
  pills: {
    primary:
      "inline-flex rounded-full border border-accent bg-accent px-4 py-1.5 font-semibold text-accent-text transition-opacity hover:opacity-90",
    link: "inline-flex rounded-full border border-border px-4 py-1.5 transition-colors hover:border-accent",
    list: "flex flex-wrap gap-2.5",
  },
  plain: { primary: plainLink, link: plainLink, list: "flex flex-wrap gap-x-6 gap-y-2" },
};

export function ContactLinks({
  variant = "pills",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const s = styles[variant];
  return (
    <div className={`space-y-3 ${className ?? ""}`}>
      <ul className={s.list}>
        {profile.resumeUrl && (
          <li>
            <ExternalLink href={profile.resumeUrl} className={s.primary}>
              Résumé
            </ExternalLink>
          </li>
        )}
        <li>
          <ExternalLink href={profile.githubUrl} className={s.link}>
            GitHub
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={profile.linkedinUrl} className={s.link}>
            LinkedIn
          </ExternalLink>
        </li>
      </ul>
      <p>
        <CopyEmail email={profile.email} className={s.link} />
      </p>
    </div>
  );
}
