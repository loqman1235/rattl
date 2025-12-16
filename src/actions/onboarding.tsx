"use server";

import { getSession } from "@/lib/auth/session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const checkUsernameAvailability = async (username: string) => {
  const existing = await prisma.user.findUnique({ where: { username } });

  return { available: !existing };
};

export const updateUsername = async (username: string) => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const existing = await prisma.user.findUnique({ where: { username } });

  if (existing && existing.id !== session.user.id) {
    return { success: false, error: "Username already taken" };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { username },
  });

  revalidatePath("/onboarding");
  return { success: true };
};

export const updateProfile = async (data: {
  bio?: string;
  location?: string;
  website?: string;
}) => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      bio: data.bio || null,
      location: data.location || null,
      website: data.website || null,
    },
  });

  revalidatePath("/");
  return { success: true };
};

export const updateAvatar = async (imageUrl: string) => {
  const session = await getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: imageUrl },
  });

  revalidatePath("/");
  return { success: true };
};

export async function updateInterests(interests: string[]) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { interests },
  });

  revalidatePath("/");
  redirect("/");
}
