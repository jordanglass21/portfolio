export type Project = {
  slug: string;
  name: string;
  summary: string; // one sentence, what it does
  details: string[]; // how it was built, key decisions
  stack: string[];
  context?: string; // e.g. "Team project", shown under the name
  liveUrl?: string;
  repoUrl?: string;
  image?: { src: string; alt: string };
};

// To add a project, append an entry here. Screenshots go in public/images/ at a 16:10 ratio.
export const projects: Project[] = [
  {
    slug: "asl-drill",
    name: "ASL Drill",
    summary:
      "A fingerspelling trainer: it shows a word, you spell it to your webcam, and it grades each letter in real time.",
    details: [
      "Hand tracking runs entirely in the browser with MediaPipe. Video never leaves the device; only 21 hand landmarks per frame are processed.",
      "Letters are recognized by a small neural network trained in Python with scikit-learn, exported as JSON weights, and run in plain TypeScript with no ML runtime. Shared fixtures keep the Python and TypeScript pipelines in exact agreement.",
      "Motion letters (J, Z) and double letters are detected with geometric checks on a one-second landmark buffer, tuned against my own recorded samples.",
      "Letter confirmation is a pure, unit-tested state machine, and CI runs lint, typecheck, and Jest on every pull request.",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "MediaPipe",
      "Python",
      "scikit-learn",
      "Jest",
      "Tailwind CSS",
      "Vercel",
    ],
    liveUrl: "https://asldrill.jordanglass.dev",
    repoUrl: "https://github.com/jordanglass21/asl-drill",
    image: {
      src: "/images/asl-drill.jpg",
      alt: "ASL Drill home page: the title on split-flap tiles, a Play button, and hand-drawn reference handshapes for the alphabet.",
    },
  },
  {
    slug: "shopping-list",
    name: "Shopping List",
    summary:
      "A grocery list app that turns recipes into shopping lists and sorts items by supermarket aisle.",
    details: [
      "Per-user access is enforced in the database with PostgreSQL Row Level Security, so the client can safely talk to Supabase with a publishable key.",
      "Recipe import is rule-based parsing with a review step before anything is added, favoring accuracy over cleverness.",
      "Data logic lives in custom hooks (useItems, useLists, useRecipeImport), keeping components presentational. The schema is versioned as Supabase CLI migrations.",
      "Sign-in is one-tap Google OAuth with a magic-link email fallback.",
    ],
    stack: [
      "TypeScript",
      "Next.js",
      "React",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Vercel",
    ],
    liveUrl: "https://list.jordanglass.dev",
    repoUrl: "https://github.com/jordanglass21/shopping-list",
    image: {
      src: "/images/shopping-list.jpg",
      alt: "The Shopping List app: My List with 15 items left, an Add an item field, and produce items each tagged with the recipe it came from.",
    },
  },
  {
    slug: "qa-platform",
    name: "Q&A Platform",
    context: "Team project with Matthew Hodges · CS 5500, Northeastern",
    summary:
      "A Stack Overflow–style site where people ask and answer questions, vote on answers, and moderate reported content.",
    details: [
      "We extended the course's starter app into five Express services (users, questions, answers, tags, and profiles), each running independently with its own MongoDB database behind a React client.",
      "Every service validates requests and responses against its own OpenAPI spec and publishes interactive Swagger docs.",
      "Jest unit and integration tests cover 100% of server statements, branches, and functions, and Cypress end-to-end tests cover the core flows: asking, answering, voting, moderation, and account management.",
      "GitHub Actions runs both suites on every merge to main, and we scanned the codebase with CodeQL for security issues.",
    ],
    stack: [
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "OpenAPI",
      "Jest",
      "Cypress",
      "GitHub Actions",
    ],
  },
  {
    slug: "neudfs",
    name: "NEUDFS",
    context: "Four-person team project · CS 6650, Northeastern",
    summary:
      "A distributed file system for university courses, where professors and students share class folders with role-based permissions, deployed on AWS.",
    details: [
      "A Go server exposes every file operation over gRPC behind an AWS Network Load Balancer, so it scales by adding servers. File data lives in S3, and metadata and permissions live in DynamoDB, all provisioned with Terraform.",
      "Role-based access keeps student work private while professors manage shared class folders. Load tests that tried six kinds of unauthorized access never got through.",
      "My share: the S3 infrastructure in Terraform, renaming files and folders, delete (including fixing a race condition), and the permission checks for creating folders.",
      "We load-tested it with 19 k6 scenarios, including concurrent renames, upload races, streaming files up to 50 MB, and a 10-minute soak test.",
    ],
    stack: [
      "Go",
      "gRPC",
      "Protocol Buffers",
      "AWS",
      "S3",
      "DynamoDB",
      "Terraform",
      "Docker",
      "k6",
    ],
    repoUrl: "https://github.com/jordanglass21/NEUDFS",
  },
  {
    slug: "assetsync",
    name: "AssetSync",
    summary:
      "A reconciliation tool that compares a modern inventory database against a legacy system and flags records that have drifted apart.",
    details: [
      "Three services talk over HTTP and JSON: a C# .NET 8 API with Entity Framework Core and SQLite, a Java Spring Boot service that simulates the legacy database, and a React dashboard.",
      "The comparison engine indexes legacy records in a dictionary keyed by item, year, and month, so each of about 300,000 rows of real public sales data is matched in constant time.",
      "Sales figures are compared with a one-cent tolerance, so floating-point noise isn't reported as a discrepancy.",
      "The legacy service can corrupt rows on demand, and an end-to-end script injects drift, checks that the audit catches it, and resets.",
    ],
    stack: [
      "C#",
      ".NET 8",
      "Entity Framework Core",
      "SQLite",
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
    ],
    repoUrl: "https://github.com/jordanglass21/AssetSync",
  },
];
