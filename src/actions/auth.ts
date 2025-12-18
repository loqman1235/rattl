"use server";
import { auth } from "@/lib/auth/config";
import { headers } from "next/headers";
// import { redirect } from "next/navigation";

export async function signOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Better Auth signOut error:", error);
  }

  // redirect("/");
}
