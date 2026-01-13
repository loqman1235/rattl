import {
  Ban2Stroke,
  Flag1Stroke,
  MenuMeatballs1Solid,
  Pencil1Stroke,
  Trash3Stroke,
  VolumeMuteStroke,
} from "@lineiconshq/free-icons";
import Lineicons from "@lineiconshq/react-lineicons";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ProfileHoverCard } from "../shared/profile-hover-card";
import { user } from "@/data/user";
// import { BotIcon } from "lucide-react";

export const PostHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <Link
        href="/loqmanedj"
        className="flex items-center gap-1 flex-wrap w-fit"
      >
        <ProfileHoverCard user={user}>
          <div className="flex items-center gap-0.5">
            <h3 className="text-sm font-semibold leading-none text-foreground hover:underline">
              Loqmane Djefafla
            </h3>

            {/*  VERIFIED ICON */}
            <Image
              src="/verified-badge.svg"
              alt="Verified Business"
              width={16}
              height={16}
              title="Verified"
            />
            {/* HANDLER */}
            <p className="text-sm text-muted-foreground">@loqmanedj</p>
            <span className="text-sm text-muted-foreground">&bull;</span>
            <p className="text-sm text-muted-foreground">15h</p>
          </div>
        </ProfileHoverCard>
      </Link>

      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <DropdownMenu>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-muted-foreground cursor-pointer hover:bg-accent/20 hover:!text-accent p-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none -mr-2">
                  <Lineicons
                    strokeWidth={2}
                    icon={MenuMeatballs1Solid}
                    size={20}
                  />
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            {/* OPTIONS */}

            <DropdownMenuContent className="mr-2" align="end">
              <DropdownMenuItem>
                <button className="flex items-center gap-1 cursor-pointer text-lg w-full">
                  <Lineicons
                    className="mr-1 size-5"
                    icon={Pencil1Stroke}
                    strokeWidth={2}
                  />

                  <span>Edit post</span>
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button className="flex items-center gap-1 cursor-pointer text-lg w-full text-destructive">
                  <Lineicons
                    className="mr-1 size-5 text-destructive"
                    icon={Trash3Stroke}
                    strokeWidth={2}
                  />

                  <span>Delete post</span>
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button className="flex items-center gap-1 cursor-pointer text-lg w-full">
                  <Lineicons
                    className="size-5"
                    icon={VolumeMuteStroke}
                    strokeWidth={2}
                  />

                  <span>Mute @loqmanedj</span>
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button className="flex items-center gap-1 cursor-pointer text-lg w-full">
                  <Lineicons
                    className="mr-1 size-5"
                    icon={Ban2Stroke}
                    strokeWidth={2}
                  />

                  <span>Block @loqmanedj</span>
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button className="flex items-center gap-1 cursor-pointer text-lg w-full">
                  <Lineicons
                    className="mr-1 size-5"
                    icon={Flag1Stroke}
                    strokeWidth={2}
                  />

                  <span>Report post</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <TooltipContent side="bottom" sideOffset={4}>
            <p>More</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
