"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ResetPassword } from "@/validators/auth";
import { UseFormReturn } from "react-hook-form";

interface StepTwoProps {
  form: UseFormReturn<ResetPassword>;
  onSubmit: (data: ResetPassword) => Promise<void>;
}

export const StepTwo = ({ form, onSubmit }: StepTwoProps) => {
  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel htmlFor="code">Reset Code</FieldLabel>
        <Input
          {...form.register("code")}
          id="code"
          placeholder="000000"
          maxLength={6}
        />

        {form.formState.errors.code && (
          <FieldError errors={[form.formState.errors.code]} />
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="password">New Password</FieldLabel>
        <Input
          {...form.register("password")}
          id="password"
          type="password"
          placeholder="••••••••"
        />

        {form.formState.errors.password && (
          <FieldError errors={[form.formState.errors.password]} />
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        <Input
          {...form.register("confirmPassword")}
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
        />

        {form.formState.errors.confirmPassword && (
          <FieldError errors={[form.formState.errors.confirmPassword]} />
        )}
      </Field>

      {/* <p className="text-sm text-muted-foreground">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          // onClick={handleResend}
          className="text-foreground underline cursor-pointer"
        >
          Resend
        </button>
      </p> */}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={form.formState.isSubmitting || !form.formState.isValid}
      >
        {form.formState.isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
};
