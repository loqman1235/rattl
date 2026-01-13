import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { Pencil1Stroke } from "@lineiconshq/free-icons";
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
              <Lineicons
                className="size-5"
                icon={Pencil1Stroke}
                strokeWidth={2}
              />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={4}>
          <p>Compose</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
};
