import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import {
  BookmarkIcon,
  HeartIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  RepeatIcon,
  UploadIcon,
} from "lucide-react";

export const PostCard = () => {
  return (
    <Link
      href="/"
      className="flex gap-3 p-4 border-t border-t-border transition-all duration-300 ease-in-out hover:bg-muted/70"
    >
      {/* AVATAR */}

      <div>
        <Link href="/loqmanedj">
          <Avatar className="size-10 flex-shrink-0">
            <AvatarFallback>
              <Image
                src="/avatar_light.svg"
                alt="User"
                width={40}
                height={40}
              />
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>

      {/* DETAILS */}
      <div className="flex-1 flex flex-col gap-2">
        {/* INFO */}
        <Link href="/" className="flex items-center gap-1 flex-wrap w-fit">
          <h3 className="text-sm font-semibold leading-none text-foreground">
            Loqmane Djefafla
          </h3>
          {/* HANDLER */}
          <p className="text-sm text-muted-foreground">@loqmanedj</p>
          <span className="text-sm text-muted-foreground">&bull;</span>
          <p className="text-sm text-muted-foreground">15h</p>
        </Link>
        {/* POST CONTENT */}
        <p className="leading-relaxed w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          non fugit animi quidem necessitatibus possimus minima eveniet, officia
          praesentium eum dignissimos aliquam fugiat nesciunt magnam libero
          quibusdam voluptas, molestiae cupiditate?
        </p>
        {/* ACTIONS */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5 md:gap-10">
            {/* COMMENTS */}
            <button className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <MessageCircleIcon className="size-5" />
              <span>122</span>
            </button>
            {/* RETWEET */}
            <button className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <RepeatIcon className="size-5" />
              <span>220</span>
            </button>

            {/* LIKE */}
            <button className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <HeartIcon className="size-5" />
              <span>20k</span>
            </button>
          </div>

          <div className="flex items-center gap-5">
            <button className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <BookmarkIcon className="size-5" />
            </button>
            <button className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <UploadIcon className="size-5" />
            </button>
            <button className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <MoreHorizontalIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
