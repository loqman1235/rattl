import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // TODO: Set to true in production
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
    },
  },

  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"],
});

export type Session = typeof auth.$Infer.Session;
