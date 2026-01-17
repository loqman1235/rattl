"use client";

import { XIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { PostComposer } from "../post/post-composer";
import { useRouter } from "next/navigation";
import { AuthUser } from "@/lib/auth/config";

type ComposePostModalProps = {
  user: AuthUser;
};

export const ComposePostModal = ({ user }: ComposePostModalProps) => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };
  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[576px] [&>button]:hidden !p-0 !gap-0">
        <div className="flex items-center justify-between pt-4 pl-2 ">
          <DialogTitle className="sr-only" />
          <button
            className="rounded-full p-2 flex items-center justify-center hover:bg-secondary transition-all cursor-pointer"
            onClick={handleClose}
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <PostComposer user={user} initialHeight={80} isModal />
      </DialogContent>
    </Dialog>
  );
};
