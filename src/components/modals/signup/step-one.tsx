"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "./form-field";
import { SignUpStepOne } from "@/validators/auth";
import { useRouter } from "next/navigation";

interface StepOneProps {
  form: UseFormReturn<SignUpStepOne>;
  onSubmit: (data: SignUpStepOne) => Promise<void>;
}

export function StepOne({ form, onSubmit }: StepOneProps) {
  const router = useRouter();

  const handleSignInClick = () => {
    router.replace("/auth/signin");
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FormField control={form.control} name="name" label="Name" />
      <FormField
        control={form.control}
        name="email"
        label="Email"
        type="email"
      />
      <FormField
        control={form.control}
        name="dob"
        label="Date of Birth"
        type="date"
      />

      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          className="text-foreground underline cursor-pointer"
          onClick={handleSignInClick}
        >
          Sign in
        </button>
      </p>

      <Button
        disabled={form.formState.isSubmitting}
        className="w-full"
        size="lg"
      >
        {form.formState.isSubmitting ? "Sending verification code..." : "Next"}
      </Button>
    </form>
  );
}
