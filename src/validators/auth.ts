import z from "zod";

export const signUpStepOneSchema = z.object({
  email: z.email("Invalid email address"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, { message: "Name must be less than 50 characters" }),
  dob: z.string().min(1, "Date of birth is required"),
});

export const signUpStepTwoSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

export const signUpStepThreeSchema = z
  .object({
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[a-z]/, "Add a lowercase letter")
      .regex(/[A-Z]/, "Add an uppercase letter")
      .regex(/[0-9]/, "Add a number")
      .regex(/[^A-Za-z0-9]/, "Add a special character"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export const resetPasswordSchema = z
  .object({
    code: z.string().length(6, "Code must be 6 digits"),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[a-z]/, "Add a lowercase letter")
      .regex(/[A-Z]/, "Add an uppercase letter")
      .regex(/[0-9]/, "Add a number")
      .regex(/[^A-Za-z0-9]/, "Add a special character"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpStepOne = z.infer<typeof signUpStepOneSchema>;
export type SignUpStepTwo = z.infer<typeof signUpStepTwoSchema>;
export type SignUpStepThree = z.infer<typeof signUpStepThreeSchema>;
export type SignIn = z.infer<typeof signInSchema>;
export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
export type ResetPassword = z.infer<typeof resetPasswordSchema>;
