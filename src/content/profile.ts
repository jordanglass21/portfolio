export type Profile = {
  name: string;
  role: string;
  location: string;
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
  location: "New York City area",
  // TODO(jordan): edit the hero headline
  headline:
    "I build software and work directly with the people who use it.",
  // TODO(jordan): edit the bio
  bio: [
    "I'm a software engineer with an MS in Computer Science from Northeastern. Most recently I built production REST APIs in TypeScript, NestJS, and PostgreSQL at Hydrow, shipping weekly through CI/CD.",
    "Before engineering, I spent four years running operations for an $8M/yr retail business, where I built an online sales channel and worked directly with customers and vendors every day.",
    "I'm looking for roles where I build software and work directly with the people who use it, whether that's on a product team or as a forward-deployed, solutions, or sales engineer.",
  ],
  email: "jordanglass421@gmail.com",
  githubUrl: "https://github.com/jordanglass21",
  linkedinUrl: "https://www.linkedin.com/in/jordan-glass-one",
  headshot: {
    src: "/images/headshot-studio.jpg",
    alt: "Jordan Glass, smiling, in a navy suit and red tie against a plain grey background.",
  },
  resumeUrl: "/resume.pdf",
};
