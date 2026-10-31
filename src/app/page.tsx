import Image from "next/image";
import Link from "next/link";
import { ContactLinks } from "@/components/ContactLinks";
import { FieldLines } from "@/components/FieldLines";
import { profile } from "@/content/profile";
import { featuredProjects } from "@/content/projects";

export default function Home() {
  return (
    <main>
      <section
        aria-labelledby="hero-heading"
        className="grid md:min-h-[min(80svh,46rem)] md:grid-cols-[38fr_62fr]"
      >
        <div className="relative aspect-[4/3] bg-surface md:aspect-auto">
          {profile.headshot && (
            <Image
              src={profile.headshot.src}
              alt={profile.headshot.alt}
              fill
              priority
              sizes="(min-width: 768px) 38vw, 100vw"
              className="object-cover object-[50%_20%]"
            />
          )}
        </div>

        <div className="relative flex items-center overflow-hidden">
          <FieldLines />
          <div className="relative w-full px-6 py-14 sm:px-10 md:py-20 lg:px-16">
            <div data-field-dim className="max-w-2xl">
              <p className="text-lg font-semibold text-accent">Hi, I&apos;m</p>
              <h1
                id="hero-heading"
                className="mt-2 text-5xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
              >
                {profile.name}
              </h1>
              <p className="mt-6 max-w-xl text-xl leading-snug sm:text-2xl">{profile.headline}</p>
              <p className="mt-4 text-text-muted">
                {profile.role} · {profile.location}
              </p>
              <ContactLinks className="mt-8" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-heading" className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-[14rem_1fr] md:gap-16">
          <h2 id="about-heading" className="text-2xl font-bold tracking-[-0.02em]">
            About
          </h2>
          <div className="max-w-[65ch] space-y-5 text-lg text-text-muted">
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="work-heading" className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-20 md:grid-cols-[14rem_1fr] md:gap-16">
          <h2 id="work-heading" className="text-2xl font-bold tracking-[-0.02em]">
            Selected work
          </h2>
          <div>
            <ul className="divide-y divide-border border-y border-border">
              {featuredProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects#${project.slug}`}
                    className="group grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8"
                  >
                    <span className="text-lg font-bold group-hover:text-accent">
                      {project.name}
                    </span>
                    <span className="text-text-muted">{project.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link
                href="/projects"
                className="font-semibold text-accent underline decoration-transparent underline-offset-4 transition-colors hover:decoration-accent"
              >
                See all projects and how they were built
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
