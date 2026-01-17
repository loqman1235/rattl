import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  BookmarkIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

export const PostActions = () => {
  const buttonStyles =
    "flex items-center text-muted-foreground cursor-pointer group";

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 md:gap-10 -ml-3">
        {/* LIKE */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={`${buttonStyles}  group-hover:!text-like`}>
              <span className="p-2 group-hover:!bg-like/20 group-hover:!text-like rounded-full transition-all duration-300">
                <HeartIcon className="size-5 stroke-2 group-active:scale-95" />
              </span>
              <span className="group-hover:text-like transition-all duration-300 -ml-1">
                265K
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={4}>
            <p>Like</p>
          </TooltipContent>
        </Tooltip>

        {/* RETWEET */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={`${buttonStyles} group-hover:!text-repost`}>
              <span className="p-2 group-hover:!bg-repost/20 group-hover:!text-repost rounded-full transition-all duration-300">
                <ArrowPathRoundedSquareIcon className="size-5 stroke-2" />
              </span>
              <span className="group-hover:text-repost transition-all duration-300 -ml-1">
                220
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={4}>
            <p>Repost</p>
          </TooltipContent>
        </Tooltip>

        {/* COMMENTS */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={`${buttonStyles} group-hover:!text-accent`}>
              <span className="p-2 group-hover:!bg-accent/20 group-hover:!text-accent rounded-full transition-all duration-300">
                <ChatBubbleOvalLeftIcon className="size-5 stroke-2" />
              </span>
              <span className="group-hover:text-accent transition-all duration-300 -ml-1">
                122
              </span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={4}>
            <p>Comments</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex items-center -mr-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="flex items-center justify-center p-2 rounded-full text-muted-foreground cursor-pointer hover:bg-accent/20 hover:text-accent">
              <BookmarkIcon className="size-5 stroke-2" />
            </button>
          </TooltipTrigger>

          <TooltipContent side="bottom" sideOffset={4}>
            <p>Bookmark</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="flex items-center justify-center p-2 rounded-full text-muted-foreground cursor-pointer hover:bg-accent/20 hover:text-accent">
              <ArrowUpTrayIcon className="size-5 stroke-2" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={4}>
            <p>Share</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
