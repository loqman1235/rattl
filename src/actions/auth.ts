"use server";
import { auth } from "@/lib/auth/config";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });

  (await cookies()).delete(
    process.env.NODE_ENV === "production"
      ? "__Secure-better-auth.session_token"
      : "better-auth.session_token"
  );

  redirect("/");
}
