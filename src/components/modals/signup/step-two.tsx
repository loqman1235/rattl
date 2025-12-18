"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "./form-field";
import { SignUpStepTwo } from "@/validators/auth";

interface StepTwoProps {
  form: UseFormReturn<SignUpStepTwo>;
  onSubmit: (data: SignUpStepTwo) => Promise<void>;
  onResend: () => void;
}

export function StepTwo({ form, onSubmit, onResend }: StepTwoProps) {
  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="code"
        label="Verification Code"
        placeholder="000000"
      />

      <p className="text-sm text-muted-foreground">
        Didn&apos;t receive the code?{" "}
        <button
          type="button"
          onClick={onResend}
          className="text-foreground underline cursor-pointer"
        >
          Resend
        </button>
      </p>

      <Button
        disabled={form.formState.isSubmitting}
        type="submit"
        className="w-full"
        size="lg"
      >
        {form.formState.isSubmitting ? "Verifying..." : "Next"}
      </Button>
    </form>
  );
}
