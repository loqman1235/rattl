"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ForgotPassword } from "@/validators/auth";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

interface StepOneProps {
  form: UseFormReturn<ForgotPassword>;
  onSubmit: (data: ForgotPassword) => Promise<void>;
}

export const StepOne = ({ form, onSubmit }: StepOneProps) => {
  const router = useRouter();

  const handleSignInClick = () => {
    router.replace("/auth/signin");
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>

        <Input
          {...form.register("email")}
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />

        {form.formState.errors.email && (
          <FieldError errors={[form.formState.errors.email]} />
        )}
      </Field>

      <p className="text-sm text-muted-foreground">
        Remember your password?{" "}
        <button
          type="button"
          className="text-foreground underline cursor-pointer"
          onClick={handleSignInClick}
        >
          Sign in
        </button>
      </p>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={form.formState.isSubmitting || !form.formState.isValid}
      >
        {form.formState.isSubmitting ? "Sending..." : "Send Reset Code"}
      </Button>
    </form>
  );
};
