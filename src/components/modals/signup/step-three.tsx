"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "./form-field";
import { SignUpStepThree } from "@/validators/auth";

interface StepThreeProps {
  form: UseFormReturn<SignUpStepThree>;
  onSubmit: () => Promise<void>;
}

export function StepThree({ form, onSubmit }: StepThreeProps) {
  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="password"
        label="Password"
        type="password"
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        label="Confirm Password"
        type="password"
      />

      <Button
        disabled={form.formState.isSubmitting || !form.formState.isValid}
        className="w-full"
        size="lg"
      >
        {form.formState.isSubmitting ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  );
}
