import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const FloatingPostButton = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="flex items-center justify-center p-6 fixed bottom-20 right-4 z-40 md:hidden"
          size="icon-lg"
          asChild
        >
          <Link href="/compose/post">
            <PencilSquareIcon className="size-5 stroke-2" />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={4}>
        <p>New Post</p>
      </TooltipContent>
    </Tooltip>
  );
};
