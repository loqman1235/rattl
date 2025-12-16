"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { useState } from "react";

const stepOneSchema = z.object({
  email: z.email(),
  name: z.string().min(1, { message: "Name is required" }),
  dob: z.string(),
});

const stepTwoSchema = z.object({
  code: z.string().min(1, { message: "Code is required" }).length(6),
});

const stepThreeSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "At least 8 characters" })
      .regex(/[a-z]/, { message: "Add a lowercase letter" })
      .regex(/[A-Z]/, { message: "Add an uppercase letter" })
      .regex(/[0-9]/, { message: "Add a number" })
      .regex(/[^A-Za-z0-9]/, { message: "Add a special character" }),
    confirmPassword: z.string().min(1, { message: "Confirm your password" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

type infoForm = z.infer<typeof stepOneSchema>;
type codeForm = z.infer<typeof stepTwoSchema>;
type passwordForm = z.infer<typeof stepThreeSchema>;

export const SignUpModal = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const infoForm = useForm<infoForm>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      name: "",
      email: "",
      dob: "",
    },
  });

  const codeForm = useForm<codeForm>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      code: "",
    },
  });

  const passwordForm = useForm<passwordForm>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleStep1Submit = async (data: infoForm) => {
    try {
      setError("");

      //  call api "/api/auth/send-top"
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            type: "email-verification",
          }),
        }
      );

      const result = await response.json();
      console.log(result);

      setCurrentStep(2);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleStep2Submit = async (data: codeForm) => {
    try {
      setError("");

      //  call api "/api/auth/verify-otp"
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: infoForm.getValues("email"),
            otp: data.code,
          }),
        }
      );

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        codeForm.setError("code", { message: result.error });
      } else {
        setCurrentStep(3);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error);
      console.error(error);
      throw error;
    }
  };

  const handleStep3Submit = async () => {
    try {
      const { data: user, error: userError } = await authClient.signUp.email({
        email: infoForm.getValues("email"),
        password: passwordForm.getValues("password"),
        name: infoForm.getValues("name"),
        dob: infoForm.getValues("dob"),
        emailVerified: true,
      });

      if (userError) {
        setError(userError.message as string);
      }

      if (user && user.user && user.user.email) {
        const updateUserReponse = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/update-email-verified`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.user.email,
            }),
          }
        );

        const updateUserResult = await updateUserReponse.json();

        if (updateUserResult.success) {
          console.log("✅ User created and emailVerified updated!");
          router.push("/i/flow/signin"); // Redirect after success
        } else {
          setError(`Account created, but: ${updateUserResult.error}`);
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const renderStepOne = () => {
    return (
      <form
        className="space-y-4"
        onSubmit={infoForm.handleSubmit(handleStep1Submit)}
      >
        <Controller
          control={infoForm.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="Email"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={infoForm.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="Name"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={infoForm.control}
          name="dob"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>
              <Input
                {...field}
                id="dob"
                type="date"
                aria-invalid={fieldState.invalid}
                placeholder="Date of Birth"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link className="text-foreground underline" href="/i/flow/signin">
            Sign in
          </Link>
        </p>
        <Button
          disabled={infoForm.formState.isSubmitting}
          className="w-full"
          size="lg"
        >
          Next
        </Button>
      </form>
    );
  };

  const renderStepTwo = () => {
    return (
      <form
        className="space-y-4"
        onSubmit={codeForm.handleSubmit(handleStep2Submit)}
      >
        <Controller
          control={codeForm.control}
          name="code"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="code">Verification Code</FieldLabel>

              <Input
                {...field}
                id="code"
                aria-invalid={fieldState.invalid}
                placeholder="Code"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the code?{" "}
          <button className="text-foreground underline cursor-pointer">
            Resend
          </button>
        </p>

        <Button
          disabled={codeForm.formState.isSubmitting}
          type="submit"
          className="w-full"
          size="lg"
        >
          {codeForm.formState.isSubmitting ? "Verifying..." : "Next"}
        </Button>

        {/* <Button
          type="button"
          onClick={() => setCurrentStep(1)}
          className="w-full"
          size="lg"
          variant="secondary"
        >
          Back
        </Button> */}
      </form>
    );
  };

  const renderStepThree = () => {
    return (
      <form
        className="space-y-4"
        onSubmit={passwordForm.handleSubmit(handleStep3Submit)}
      >
        <Controller
          control={passwordForm.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Password"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={passwordForm.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                {...field}
                id="confirmPassword"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Confirm Password"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          disabled={passwordForm.formState.isSubmitting}
          className="w-full"
          size="lg"
        >
          Finish
        </Button>
      </form>
    );
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent
        aria-describedby="modal-title"
        className="sm:max-w-[480px] [&>button]:hidden"
      >
        <DialogTitle className="sr-only">Sign up</DialogTitle>
        <div className="flex flex-col gap-1">
          <p className="text-muted-foreground font-medium">
            Step {currentStep} of 3
          </p>
          <h2 className="font-bold text-2xl">Create an account</h2>
        </div>

        {currentStep === 1 && <>{renderStepOne()}</>}
        {currentStep === 2 && <>{renderStepTwo()}</>}
        {currentStep === 3 && <>{renderStepThree()}</>}
      </DialogContent>
    </Dialog>
  );
};
