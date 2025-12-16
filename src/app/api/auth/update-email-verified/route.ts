import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        emailVerified: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: { id: user.id, emailVerified: user.emailVerified },
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
}
