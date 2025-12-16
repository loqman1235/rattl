import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { emailOTP } from "better-auth/plugins";
// import { Resend } from "resend";
import prisma from "../prisma";

// const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // TODO: Set to true in production
    autoSignIn: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  user: {
    additionalFields: {
      username: {
        type: "string",
        required: false,
        unique: true,
        returned: true,
      },

      bio: {
        type: "string",
        required: false,
      },

      coverImage: {
        type: "string",
        required: false,
      },

      website: {
        type: "string",
        required: false,
      },

      location: {
        type: "string",
        required: false,
      },

      dob: {
        type: "string",
        required: true,
        input: true,
      },

      emailVerified: {
        type: "boolean",
        required: false,
      },

      interests: {
        type: "string[]",
        required: false,
      },
    },
  },

  plugins: [
    // emailOTP({
    //   // This gets called when verification OTP is sent
    //   async sendVerificationOTP({ email, otp, type }) {
    //     console.log("🔥 sendVerificationOTP FIRED!");
    //     console.log("Email:", email);
    //     console.log("OTP:", otp);
    //     console.log("Type:", type);
    //     if (type === "email-verification") {
    //       const { data, error } = await resend.emails.send({
    //         from: "onboarding@resend.dev",
    //         to: email,
    //         subject: "Verify your email",
    //         html: `<p>Verify your email by entering the following code: <b>${otp}</b></p>`,
    //       });
    //       if (error) {
    //         console.error("❌ Resend Error:", error);
    //         throw error;
    //       }
    //       console.log("✅ Email sent successfully!", data);
    //     }
    //   },
    //   sendVerificationOnSignUp: true,
    //   otpLength: 6,
    //   expiresIn: 300,
    // }),
  ],

  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"],
});

export type Session = typeof auth.$Infer.Session;
