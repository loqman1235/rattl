"use client";

import { Controller, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "./form-field";
import { SignUpStepOne } from "@/validators/auth";
import { useRouter } from "next/navigation";
import { DateOfBirthInput } from "@/components/ui/date-of-birth-input";

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

      <Controller
        control={form.control}
        name="dob"
        render={({ field, fieldState }) => (
          <DateOfBirthInput
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          className="text-foreground underline cursor-pointer hover:no-underline"
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
        Next
      </Button>
    </form>
  );
}
