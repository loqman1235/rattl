import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export const PostButton = () => {
  return (
    <>
      {/* DESKTOP */}
      <Button className="w-full lg:block hidden text-center" size="lg" asChild>
        <Link href="/compose/post">Post</Link>
      </Button>

      {/* MOBILE */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className=" lg:hidden flex items-center justify-center p-6"
            size="icon-lg"
            asChild
          >
            <Link href="/compose/post">
              <PencilIcon className="size-5" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={4}>
          <p>Post</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};
