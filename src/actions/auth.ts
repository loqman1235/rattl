"use server";
import { auth } from "@/lib/auth/config";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Better Auth signOut error:", error);
  }

  const cookieStore = await cookies();
  const cookieNames = [
    "better-auth.session_token",
    "__Secure-better-auth.session_token",
    "__Host-better-auth.session_token",
  ];

  for (const name of cookieNames) {
    try {
      cookieStore.delete({
        name,
        path: "/",
        domain:
          process.env.NODE_ENV === "production"
            ? new URL(process.env.NEXT_PUBLIC_APP_URL!).hostname
            : "localhost",
      });
    } catch (error) {
      console.error(`Failed to delete cookie ${name}:`, error);
    }
  }

  redirect("/");
}
