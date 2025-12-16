import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth/config";

export async function POST(req: Request) {
  try {
    const { email, otp, newPassword } = await req.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: "Email, OTP and new password are required" },
        { status: 400 }
      );
    }

    // Verify OTP again
    const verification = await prisma.verification.findFirst({
      where: {
        identifier: `reset:${email}`,
        value: otp,
        expiresAt: { gte: new Date() },
      },
    });

    if (!verification) {
      return NextResponse.json(
        { error: "Invalid or expired code" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find creds account
    const account = await prisma.account.findFirst({
      where: {
        userId: user.id,
        providerId: "credential",
      },
    });

    if (!account) {
      return NextResponse.json(
        { error: "No password account found" },
        { status: 404 }
      );
    }

    const ctx = await auth.$context;
    const hashedPassword = await ctx.password.hash(newPassword);

    await prisma.account.update({
      where: {
        id: (await prisma.account.findFirst({
          where: {
            userId: user.id,
            providerId: "credential",
          },
        }))!.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    // Delete verfication code
    await prisma.verification.delete({
      where: { id: verification.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
