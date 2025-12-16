"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { authClient } from "@/lib/auth/client";
import {
  signUpStepOneSchema,
  signUpStepTwoSchema,
  signUpStepThreeSchema,
  SignUpStepOne,
  SignUpStepTwo,
  SignUpStepThree,
} from "@/validators/auth";
import { StepOne } from "./signup/step-one";
import { StepTwo } from "./signup/step-two";
import { StepThree } from "./signup/step-three";
import { authApi } from "@/lib/api/auth";
import { XIcon } from "lucide-react";

export function SignUpModal() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const infoForm = useForm<SignUpStepOne>({
    resolver: zodResolver(signUpStepOneSchema),
    defaultValues: { name: "", email: "", dob: "" },
  });

  const codeForm = useForm<SignUpStepTwo>({
    resolver: zodResolver(signUpStepTwoSchema),
    defaultValues: { code: "" },
  });

  const passwordForm = useForm<SignUpStepThree>({
    resolver: zodResolver(signUpStepThreeSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const handleStep1Submit = async (data: SignUpStepOne) => {
    try {
      setError("");
      await authApi.sendOtp(data.email);
      setCurrentStep(2);
    } catch (error) {
      console.error(error);
      setError("Failed to send verification code");
    }
  };

  const handleStep2Submit = async (data: SignUpStepTwo) => {
    try {
      setError("");
      const result = await authApi.verifyOtp(
        infoForm.getValues("email"),
        data.code
      );

      if (result.error) {
        setError(result.error);
        codeForm.setError("code", { message: result.error });
      } else {
        setCurrentStep(3);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to verify code");
    }
  };

  const handleStep3Submit = async () => {
    try {
      setError("");
      const { data: user, error: userError } = await authClient.signUp.email({
        email: infoForm.getValues("email"),
        password: passwordForm.getValues("password"),
        name: infoForm.getValues("name"),
        dob: infoForm.getValues("dob"),
        emailVerified: true,
      });

      if (userError) {
        setError(userError.message as string);
        return;
      }

      if (!user?.user?.email) {
        setError("Failed to create account");
        return;
      }

      const result = await authApi.updateEmailVerified(user.user.email);

      if (!result.success) {
        setError(`Account created, but: ${result.error}`);
        return;
      }

      const { error: signInError } = await authClient.signIn.email({
        email: infoForm.getValues("email"),
        password: passwordForm.getValues("password"),
      });

      if (signInError) {
        setError(
          "Account created but failed to sign in. Please sign in manually."
        );
        return;
      }

      window.location.href = "/onboarding/username";
    } catch (error) {
      console.error(error);
      setError("Failed to create account");
    }
  };

  const handleResendOtp = async () => {
    const email = infoForm.getValues("email");
    await authApi.sendOtp(email);

    codeForm.reset();
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[480px] [&>button]:hidden">
        <DialogTitle className="sr-only">Sign up</DialogTitle>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground font-medium">
              Step {currentStep} of 3
            </p>
            <h2 className="font-bold text-2xl">Create an account</h2>
          </div>

          <button
            className="self-start rounded-full p-2 flex items-center justify-center hover:bg-secondary transition-all cursor-pointer"
            onClick={handleClose}
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {currentStep === 1 && (
          <StepOne form={infoForm} onSubmit={handleStep1Submit} />
        )}
        {currentStep === 2 && (
          <StepTwo
            form={codeForm}
            onSubmit={handleStep2Submit}
            onResend={handleResendOtp}
          />
        )}
        {currentStep === 3 && (
          <StepThree form={passwordForm} onSubmit={handleStep3Submit} />
        )}
      </DialogContent>
    </Dialog>
  );
}
