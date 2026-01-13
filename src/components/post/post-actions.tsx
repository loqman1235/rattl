import {
  Bookmark1Stroke,
  Comment1Stroke,
  HeartStroke,
  Upload1Stroke,
  RefreshCircle1ClockwiseStroke,
} from "@lineiconshq/free-icons";
import Lineicons from "@lineiconshq/react-lineicons";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const PostActions = () => {
  const buttonStyles =
    "flex items-center text-muted-foreground cursor-pointer group";

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 md:gap-10 -ml-3">
        {/* COMMENTS */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={`${buttonStyles} group-hover:!text-accent`}>
              <span className="p-2 group-hover:!bg-accent/20 group-hover:!text-accent rounded-full transition-all duration-300">
                <Lineicons
                  className="size-5"
                  strokeWidth={2}
                  icon={Comment1Stroke}
                />
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
        {/* RETWEET */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={`${buttonStyles} group-hover:!text-repost`}>
              <span className="p-2 group-hover:!bg-repost/20 group-hover:!text-repost rounded-full transition-all duration-300">
                <Lineicons
                  className="size-5"
                  strokeWidth={2}
                  icon={RefreshCircle1ClockwiseStroke}
                />
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

        {/* LIKE */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={`${buttonStyles}  group-hover:!text-like`}>
              <span className="p-2 group-hover:!bg-like/20 group-hover:!text-like rounded-full transition-all duration-300">
                <Lineicons
                  className="size-5"
                  strokeWidth={2}
                  icon={HeartStroke}
                />
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
      </div>

      <div className="flex items-center -mr-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="flex items-center justify-center p-2 rounded-full text-muted-foreground cursor-pointer hover:bg-accent/20 hover:text-accent">
              <Lineicons
                className="size-5"
                strokeWidth={2}
                icon={Bookmark1Stroke}
              />
            </button>
          </TooltipTrigger>

          <TooltipContent side="bottom" sideOffset={4}>
            <p>Bookmark</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="flex items-center justify-center p-2 rounded-full text-muted-foreground cursor-pointer hover:bg-accent/20 hover:text-accent">
              <Lineicons
                className="size-5"
                strokeWidth={2}
                icon={Upload1Stroke}
              />
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
