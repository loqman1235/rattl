"use client";

import { authClient } from "@/lib/auth/client";
import { toast } from "sonner";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

type SignOutButtonProps = {
  username?: string | null;
};

export const SignOutButton = ({ username }: SignOutButtonProps) => {
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
    <button
      className="w-full cursor-pointer flex items-center gap-2 p-3 hover:bg-destructive/10 hover:text-destructive transition-all duration-300 ease-in-out rounded-sm"
      onClick={handleSignOut}
    >
      <ArrowLeftStartOnRectangleIcon className="size-5 stroke-2" /> Sign out{" "}
      {username ? `@${username}` : ""}
    </button>
  );
};
