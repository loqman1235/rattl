"use client";

import { XIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StepOne } from "./forgot-password/step-one";
import { useForm } from "react-hook-form";
import {
  ForgotPassword,
  forgotPasswordSchema,
  ResetPassword,
  resetPasswordSchema,
} from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepTwo } from "./forgot-password/step-two";
import { authApi } from "@/lib/api/auth";
import { toast } from "sonner";

export const ForgotPasswordModal = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const emailForm = useForm<ForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetForm = useForm<ResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleEmailSubmit = async (data: ForgotPassword) => {
    try {
      await authApi.sendOtp(data.email, "password-reset");
      setEmail(data.email);
      setStep(2);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset code");
    }
  };

  const handleResetSubmit = async (data: ResetPassword) => {
    try {
      const verifyResult = await authApi.verifyOtp(
        email,
        data.code,
        "password-reset"
      );
      if (verifyResult.error) {
        toast.error(verifyResult.error);
        return;
      }

      //  Reset password
      const result = await authApi.resetPassword(
        email,
        data.code,
        data.password
      );
      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Password reset successful! Redirecting to sign in...");
      setTimeout(() => {
        window.location.href = "/auth/signin";
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to reset password");
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[480px] [&>button]:hidden">
        <div className="flex items-center justify-between">
          <DialogTitle className="font-bold text-2xl">
            Reset your password
          </DialogTitle>
          <button
            className="rounded-full p-2 flex items-center justify-center hover:bg-secondary transition-all cursor-pointer"
            onClick={handleClose}
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {step === 1 && (
          <StepOne form={emailForm} onSubmit={handleEmailSubmit} />
        )}

        {step === 2 && (
          <StepTwo form={resetForm} onSubmit={handleResetSubmit} />
        )}
      </DialogContent>
    </Dialog>
  );
};
