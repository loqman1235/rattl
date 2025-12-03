import { cache } from "react";
import "server-only";
import { auth } from "./config";
import { headers } from "next/headers";

export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  return session?.user ?? null;
});
