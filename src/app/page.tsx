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
        className="relative flex min-h-[78svh] items-center overflow-hidden"
      >
        <FieldLines />
        <div className="relative mx-auto w-full max-w-5xl px-6 py-24">
          <div data-field-dim className="max-w-4xl">
            <h1
              id="hero-heading"
              className="text-5xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-7xl lg:text-8xl"
            >
              {profile.name}
            </h1>
            <p className="mt-6 max-w-2xl text-2xl leading-snug sm:text-3xl">{profile.headline}</p>
            <ContactLinks className="mt-10 text-lg" />
          </div>
        </div>
      </section>

      <section aria-labelledby="about-heading" className="border-t border-border">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-[14rem_1fr] md:gap-16">
          <div className="relative aspect-[4/5] w-40 overflow-hidden rounded-lg bg-border md:w-full">
            {profile.headshot ? (
              <Image
                src={profile.headshot.src}
                alt={profile.headshot.alt}
                fill
                sizes="(min-width: 768px) 14rem, 10rem"
                className="object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center text-4xl font-semibold text-text-muted"
              >
                {profile.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
            )}
          </div>
          <div className="max-w-[65ch]">
            <h2 id="about-heading" className="text-2xl font-semibold tracking-[-0.02em]">
              About
            </h2>
            <div className="mt-6 space-y-5 text-lg text-text-muted">
              {profile.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="work-heading" className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 id="work-heading" className="text-2xl font-semibold tracking-[-0.02em]">
            Selected work
          </h2>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {featuredProjects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects#${project.slug}`}
                  className="group grid gap-1 py-6 sm:grid-cols-[14rem_1fr] sm:gap-16"
                >
                  <span className="text-lg font-semibold group-hover:underline group-hover:decoration-field group-hover:underline-offset-4">
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
              className="underline decoration-border underline-offset-4 transition-colors hover:decoration-field"
            >
              See all projects and how they were built
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
