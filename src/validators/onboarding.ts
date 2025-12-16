import { z } from "zod";

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .refine(
      (val) => !val.startsWith("_"),
      "Username cannot start with underscore"
    ),
});

export const profileSchema = z.object({
  bio: z.string().max(160, "Bio must be less than 160 characters").optional(),
  location: z.string().max(50).optional(),
  website: z.url().optional().or(z.literal("")),
});

export const interestsSchema = z.object({
  interests: z
    .array(z.string())
    .min(3, "Select at least 3 interests")
    .max(10, "Select no more than 10 interests"),
});

export type UsernameInput = z.infer<typeof usernameSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type InterestsInput = z.infer<typeof interestsSchema>;
