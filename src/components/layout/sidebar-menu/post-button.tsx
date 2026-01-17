import { Button } from "@/components/ui/button";

import Link from "next/link";

export const PostButton = () => {
  return (
    <>
      {/* DESKTOP */}
      <Button
        className="w-full md:flex lg:flex hidden text-center"
        size="lg"
        asChild
      >
        <Link href="/compose/post">
          <span>Post</span>
        </Link>
      </Button>
    </>
  );
};
