"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AuthUser } from "@/lib/auth/config";
import {
  GlobeEuropeAfricaIcon as GlobeEuropeAfricaIconSolid,
  LockClosedIcon as LockClosedIconSolid,
  UsersIcon as UsersIconSolid,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

import {
  GlobeEuropeAfricaIcon,
  LockClosedIcon,
  UsersIcon,
  PhotoIcon,
  FaceSmileIcon,
  GifIcon,
} from "@heroicons/react/24/outline";
import { UserAvatar } from "../shared/user-avatar";

interface PostComposerProps {
  user: AuthUser | null;
  initialHeight?: number;
  isModal?: boolean;
}

type Visibility = "everyone" | "followers" | "private";

export function PostComposer({
  user,
  initialHeight,
  isModal,
}: PostComposerProps) {
  const [visibility, setVisibility] = useState<Visibility>("everyone");
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = initialHeight ? `${initialHeight}px` : "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content, initialHeight]);

  const handlePost = () => {
    if (!content.trim()) return;
    // Handle post submission
    console.log("Posting:", content);
    setContent("");
  };

  const isDisabled = !content.trim();

  const visibilityOptions = {
    everyone: {
      icon: GlobeEuropeAfricaIconSolid,
      label: "Everyone",
      color: "text-blue-500",
    },
    followers: {
      icon: UsersIconSolid,
      label: "Followers",
      color: "text-green-500",
    },
    private: {
      icon: LockClosedIconSolid,
      label: "Private",
      color: "text-orange-500",
    },
  };

  const currentVisibility = visibilityOptions[visibility];

  return (
    <div className="flex flex-col">
      <div className="flex gap-3 p-4 pb-0">
        {/* Avatar */}
        <UserAvatar url={user?.image} />

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's in your mind?"
            rows={1}
            className="
            w-full resize-none overflow-hidden
            bg-transparent border-none outline-none
            text-xl placeholder:text-muted-foreground
            focus:ring-0 focus:outline-none
            min-h-[24px] max-h-[400px]
          "
            style={{
              height: initialHeight ? `${initialHeight}px` : "auto",
              lineHeight: "1.5",
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        className={`flex flex-col p-4 pt-0  ${
          isModal ? "!pl-4" : "!pl-[68px]"
        }`}
      >
        {/* Post Visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-1.5 px-2 py-1 -ml-2 rounded-full text-xs font-medium bg-accent/10 text-accent transition-all w-fit cursor-pointer active:scale-95">
              <currentVisibility.icon className="size-3" />
              <span>{currentVisibility.label}</span>
              <ChevronDownIcon className="size-3 text-accent" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setVisibility("everyone")}>
              <GlobeEuropeAfricaIcon className="size-5 text-muted-foreground mr-2" />
              <div className="flex flex-col">
                <span className="font-medium">Everyone</span>
                <span className="text-xs text-muted-foreground">
                  Anyone can see & reply
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setVisibility("followers")}>
              <UsersIcon className="size-5 text-muted-foreground mr-2" />
              <div className="flex flex-col">
                <span className="font-medium">Followers</span>
                <span className="text-xs text-muted-foreground">
                  Only your followers
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setVisibility("private")}>
              <LockClosedIcon className="size-5 text-muted-foreground mr-2" />
              <div className="flex flex-col">
                <span className="font-medium">Private</span>
                <span className="text-xs text-muted-foreground">
                  Only you can see
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="w-full bg-border h-[0.5px] my-4" />
        {/* Left - Action Icons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 -ml-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="p-2 rounded-full hover:bg-primary/20 text-primary transition-colors cursor-pointer"
                  aria-label="Add image"
                >
                  <PhotoIcon className="size-5 stroke-2" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={4}>
                <p>Media</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="p-2 rounded-full hover:bg-primary/20 text-primary transition-colors cursor-pointer"
                  aria-label="Add GIF"
                >
                  <GifIcon className="size-5 stroke-2" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={4}>
                <p>GIF</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="p-2 rounded-full hover:bg-primary/20 text-primary transition-colors cursor-pointer"
                  aria-label="Add emoji"
                >
                  <FaceSmileIcon className="size-5 stroke-2" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={4}>
                <p>Emoji</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Right - Character count + Post button */}
          <div className="flex items-center gap-3">
            {/* Character count */}
            {content.length > 0 && (
              <span
                className={`text-sm ${
                  content.length > 280
                    ? "text-destructive font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {content.length}/280
              </span>
            )}

            {/* Post Button */}
            <Button
              className="!p-5"
              onClick={handlePost}
              disabled={isDisabled}
              size="sm"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
