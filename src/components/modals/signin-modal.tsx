"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Loader2Icon, XIcon } from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { toast } from "sonner";
import { SignIn, signInSchema } from "@/validators/auth";

export const SignInModal = () => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleForgotPasswordClick = () => {
    router.replace("/auth/forgot-password");
  };

  const handleSignupClick = () => {
    router.replace("/auth/signup");
  };

  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignIn) => {
    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

      if (error) {
        console.error(error?.message);
        toast.error(error?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[480px] [&>button]:hidden">
        <div className="flex items-center justify-between">
          <DialogTitle className="font-bold text-2xl">Sign in</DialogTitle>
          <button
            className="rounded-full p-2 flex items-center justify-center hover:bg-secondary transition-all cursor-pointer"
            onClick={handleClose}
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            control={form.control}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="text-foreground underline cursor-pointer"
              onClick={handleSignupClick}
            >
              Sign up
            </button>
          </p>
          <Button
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            className="w-full"
            size="lg"
          >
            {form.formState.isSubmitting && (
              <Loader2Icon className="mr-2 size-4 animate-spin" />
            )}
            {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
          </Button>

          <Button
            type="button"
            className="w-full"
            size="lg"
            variant="secondary"
            onClick={handleForgotPasswordClick}
          >
            Forgot Password?
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
