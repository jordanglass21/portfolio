export type Profile = {
  name: string;
  role: string;
  headline: string;
  bio: string[];
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  headshot?: { src: string; alt: string };
  resumeUrl?: string;
};

export const profile: Profile = {
  name: "Jordan Glass",
  role: "Software engineer",
  // TODO(jordan): edit the hero headline
  headline:
    "I build software and work directly with the people who use it.",
  // TODO(jordan): edit the bio
  bio: [
    "I'm a software engineer finishing my MS in Computer Science at Northeastern. Most recently I built production REST APIs in TypeScript, NestJS, and PostgreSQL at Hydrow, shipping weekly through CI/CD.",
    "Before engineering, I spent four years running operations for an $8M/yr retail business, where I built an online sales channel and worked directly with customers and vendors every day.",
    "I'm looking for roles where I build software and work directly with the people who use it, whether that's on a product team or as a forward-deployed, solutions, or sales engineer.",
  ],
  email: "jordanglass421@gmail.com",
  githubUrl: "https://github.com/jordanglass21",
  linkedinUrl: "https://www.linkedin.com/in/jordan-glass-one",
  // TODO(jordan): add public/images/headshot.jpg, then uncomment. Initials show until then.
  // headshot: { src: "/images/headshot.jpg", alt: "Jordan Glass" },
  // TODO(jordan): add public/resume.pdf and set resumeUrl: "/resume.pdf"
};
