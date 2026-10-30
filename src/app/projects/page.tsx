import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "@/components/ExternalLink";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software I've designed, built, and shipped.",
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: `Projects | ${profile.name}`,
    description: "Software I've designed, built, and shipped.",
  },
};

const linkClass =
  "underline decoration-border underline-offset-4 transition-colors hover:decoration-field";

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">Projects</h1>
      <p className="mt-4 max-w-[65ch] text-lg text-text-muted">
        Things I&apos;ve designed, built, and shipped, and the engineering decisions behind them.
      </p>

      <ul className="mt-16 divide-y divide-border border-t border-border">
        {projects.map((project) => (
          <li key={project.slug}>
            <article
              id={project.slug}
              aria-labelledby={`${project.slug}-heading`}
              className="grid scroll-mt-8 gap-6 py-12 md:grid-cols-[14rem_1fr] md:gap-16"
            >
              <div>
                <h2
                  id={`${project.slug}-heading`}
                  className="text-2xl font-semibold tracking-[-0.02em]"
                >
                  {project.name}
                </h2>
                {project.context && (
                  <p className="mt-2 text-sm text-text-muted">{project.context}</p>
                )}
                {(project.liveUrl || project.repoUrl) && (
                  <ul className="mt-4 space-y-2">
                    {project.liveUrl && (
                      <li>
                        <ExternalLink href={project.liveUrl} className={linkClass}>
                          View live site
                        </ExternalLink>
                      </li>
                    )}
                    {project.repoUrl && (
                      <li>
                        <ExternalLink href={project.repoUrl} className={linkClass}>
                          Source on GitHub
                        </ExternalLink>
                      </li>
                    )}
                  </ul>
                )}
              </div>

              <div className="max-w-[65ch]">
                <p className="text-lg">{project.summary}</p>
                {project.image && (
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={1280}
                    height={800}
                    sizes="(min-width: 768px) 40rem, 100vw"
                    className="mt-6 rounded-lg border border-border"
                  />
                )}
                <ul className="mt-6 list-disc space-y-3 pl-5 text-text-muted marker:text-border">
                  {project.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <h3 className="sr-only">Built with</h3>
                <ul className="mt-6 flex flex-wrap gap-2 text-sm">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-border px-2 py-0.5 text-text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
