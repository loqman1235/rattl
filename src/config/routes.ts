export const RESERVED_ROUTES = new Set([
  // App routes
  "home",
  "explore",
  "notifications",
  "messages",
  "bookmarks",
  "settings",
  "profile",

  // Auth routes
  "auth",
  "onboarding",

  // System routes
  "api",
  "compose",

  // Public routes
  "tos",
  "privacy",
  "cookie",
  "support",
  "status",
  "about",
  "blog",
]);

export const isReservedRoute = (path: string): boolean => {
  return RESERVED_ROUTES.has(path.toLowerCase());
};
