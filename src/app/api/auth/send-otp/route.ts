import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Prisma client
import { nanoid } from "nanoid"; // for secure random OTP
import { sendEmail } from "@/lib/email";
import { formatDistanceToNow } from "date-fns";

export async function POST(req: Request) {
  try {
    const { email, type = "email-verfication" } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists for password reset
    if (type === "password-reset") {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json({ ok: true });
      }
    }

    // generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // expiry time (15 min)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const identifier = type === "password-reset" ? `reset:${email}` : email;

    const existing = await prisma.verification.findFirst({
      where: { identifier },
    });

    if (existing) {
      await prisma.verification.update({
        where: { id: existing.id },
        data: {
          value: otp,
          expiresAt,
        },
      });
    } else {
      await prisma.verification.create({
        data: {
          id: nanoid(),
          identifier,
          value: otp,
          expiresAt,
        },
      });
    }

    const subject =
      type === "password-reset" ? "Reset your password" : "Verify your email";

    const heading =
      type === "password-reset"
        ? "Reset your password"
        : "Confirm your email address";

    const message =
      type === "password-reset"
        ? `Use this verification code to reset your password for ${process.env.APP_NAME}:`
        : `Let's make sure this is the right email address for you. Please enter this verification code to continue using ${process.env.APP_NAME}:`;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
        <div style="text-align: left; margin-bottom: 20px;">
          <img src="${
            process.env.NEXT_PUBLIC_APP_URL
          }/logo_dark.svg" alt="Logo" style="height: 20px;"> 
        </div>
        <h2 style="text-align: left; color: #111; font-size: 24px; font-family: sans-serif;">${heading}</h2>
        <p style="text-align: left; color: #555; font-size: 16px;">
          ${message}
        </p>
        <div style="text-align: left; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; color: #000;">${otp}</span>
        </div>
        <p style="text-align: left; color: #555; font-size: 14px;">Verification codes expire after ${formatDistanceToNow(
          expiresAt
        )}.</p>
        ${
          type === "password-reset"
            ? `
          <p style="text-align: left; color: #555; font-size: 14px;">
            If you didn't request a password reset, please ignore this email.
          </p>
        `
            : ""
        }
        <p style="text-align: left; color: #555; font-size: 14px;">Thanks,<br>${
          process.env.APP_NAME
        }</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eaeaea;">
        <p style="text-align: left; font-size: 12px; color: #999;">
          ${
            process.env.APP_NAME
          } may use your email address for account security and service updates. 
          <a href="#" style="color: #555; text-decoration: underline;">Learn more</a>
        </p>
      </div>
    `;

    // send email
    await sendEmail({
      to: email,
      subject,
      text: `Your verification code is ${otp}. It expires in ${formatDistanceToNow(
        expiresAt
      )}.`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
