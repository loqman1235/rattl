// Verify OTP code

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, otp, type = "email-verification" } = await req.json();
    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const identifier = type === "password-reset" ? `reset:${email}` : email;

    const verification = await prisma.verification.findFirst({
      where: {
        identifier,
        value: otp,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!verification) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    if (type === "email-verification") {
      await prisma.verification.delete({
        where: { id: verification.id },
      });
    }

    return NextResponse.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
