"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { usernameSchema, UsernameInput } from "@/validators/onboarding";
// import { onboardingApi } from "@/lib/api/onboarding";
import { CheckCircle2, XCircle } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import {
  checkUsernameAvailability,
  updateUsername,
} from "@/actions/onboarding";

export default function UsernamePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const form = useForm<UsernameInput>({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username: "" },
  });

  const checkUsername = useDebouncedCallback(async (username: string) => {
    if (username.length < 3) {
      setIsAvailable(null);
      return;
    }

    setIsChecking(true);

    try {
      const result = await checkUsernameAvailability(username);
      setIsAvailable(result.available);
    } catch (error) {
      console.log(error);
      setIsAvailable(null);
    } finally {
      setIsChecking(false);
    }
  });

  const onSubmit = async (data: UsernameInput) => {
    startTransition(async () => {
      try {
        const result = await updateUsername(data.username);

        if (result.success) {
          router.push("/onboarding/profile");
        } else {
          form.setError("username", { message: result.error });
        }
      } catch (error) {
        console.log(error);
        form.setError("username", { message: "Failed to set username" });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Choose your username</h1>
        <p className="text-muted-foreground mt-2">
          This is how others will find you. You can change it later.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <div className="relative">
            <Input
              {...form.register("username")}
              id="username"
              placeholder="johndoe"
              className="pr-10"
              onChange={(e) => {
                form.setValue("username", e.target.value);
                checkUsername(e.target.value);
              }}
            />
            {isChecking && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            )}
            {!isChecking && isAvailable === true && (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
            )}
            {!isChecking && isAvailable === false && (
              <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
            )}
          </div>
          {form.formState.errors.username && (
            <FieldError errors={[form.formState.errors.username]} />
          )}
          {isAvailable === false && (
            <p className="text-sm text-destructive">
              Username is already taken
            </p>
          )}
          {isAvailable === true && (
            <p className="text-sm text-green-500">Username is available!</p>
          )}
        </Field>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isPending || isAvailable !== true}
        >
          {isPending ? "Saving..." : "Continue"}
        </Button>
      </form>
    </div>
  );
}
