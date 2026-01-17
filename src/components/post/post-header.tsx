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
import {
  CheckBadgeIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";

import {
  PencilSquareIcon,
  FlagIcon,
  TrashIcon,
  SpeakerXMarkIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";

export const PostHeader = () => {
  return (
    <div className="flex items-start justify-between">
      <Link
        href="/loqmanedj"
        className="flex items-center gap-1 flex-wrap w-fit"
      >
        <ProfileHoverCard user={user}>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              <h3 className="text-[15px] font-semibold leading-none text-foreground hover:underline">
                Loqmane Djefafla
              </h3>

              {/*  VERIFIED ICON */}
              <CheckBadgeIcon className="size-4 text-accent" />
            </div>
            {/* HANDLER */}
            <p className="text-[15px] text-muted-foreground">@loqmanedj</p>
            <span className="text-[8px] text-muted-foreground">&bull;</span>
            <p className="text-[15px] text-muted-foreground">15h</p>
          </div>
        </ProfileHoverCard>
      </Link>

      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <DropdownMenu>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-muted-foreground cursor-pointer hover:bg-accent/20 hover:!text-accent p-2 rounded-full transition-all duration-300 ease-in-out focus:outline-none -mr-2 -mt-2">
                  <EllipsisHorizontalIcon className="size-5 stroke-2" />
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            {/* OPTIONS */}

            <DropdownMenuContent className="mr-2" align="end">
              <DropdownMenuItem>
                <button className="flex items-center gap-2 cursor-pointer text-lg w-full">
                  <PencilSquareIcon className="size-5" />

                  <span>Edit post</span>
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button className="flex items-center gap-2 cursor-pointer text-lg w-full text-destructive">
                  <TrashIcon className="size-5" />

                  <span>Delete post</span>
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button className="flex items-center gap-2 cursor-pointer text-lg w-full">
                  <SpeakerXMarkIcon className="size-5" />

                  <span>Mute @loqmanedj</span>
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button className="flex items-center gap-2 cursor-pointer text-lg w-full">
                  <NoSymbolIcon className="size-5" />

                  <span>Block @loqmanedj</span>
                </button>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <button className="flex items-center gap-2 cursor-pointer text-lg w-full">
                  <FlagIcon className="size-5" />

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
