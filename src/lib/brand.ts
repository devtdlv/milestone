// Shared Taskora brand tokens. The mark geometry matches src/app/icon.svg
// and public/brand/taskora-mark.svg: dark rounded square, white T, indigo dot.

export const BRAND = {
  name: "Taskora",
  shortName: "Taskora",
  description:
    "Organize workspaces, manage projects, assign tasks, track progress with Kanban boards, and collaborate through task comments.",
  tagline: "Project management for focused teams",
  colors: {
    mark: "#18181b",
    markForeground: "#ffffff",
    accent: "#6366f1",
    app: "#fafafa",
    surface: "#ffffff",
    ink: "#18181b",
    muted: "#71717a",
  },
} as const;
