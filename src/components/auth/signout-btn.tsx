"use client";

import { authClient } from "@/lib/auth/client";
import { Button } from "../ui/button";
import { toast } from "sonner";

export const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (!error) {
        window.location.href = "/";
      } else {
        console.error(error);
        toast.error("Failed to sign out");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <Button className="w-fit" onClick={handleSignOut}>
      Sign out
    </Button>
  );
};
