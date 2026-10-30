import { profile } from "@/content/profile";

// Cached with the default cache life: pages stay static but revalidate in the
// background (15 min), so the year rolls over without a redeploy.
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Copyright() {
  return (
    <p>
      © {await currentYear()} {profile.name}
    </p>
  );
}
