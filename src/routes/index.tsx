import { createFileRoute, redirect } from "@tanstack/react-router";

// The portfolio is a standalone HTML/CSS/JS site in public/portfolio/.
// Opening "/" sends visitors straight to it.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "/portfolio/index.html" });
  },
  component: () => null,
});
