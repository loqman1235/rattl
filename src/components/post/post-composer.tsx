"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ImageIcon, SmileIcon, MapPinIcon, BarChart3Icon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { User } from "better-auth";

interface PostComposerProps {
  user: User | null;
  initialHeight?: number;
}

export function PostComposer({ user, initialHeight }: PostComposerProps) {
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

  return (
    // TODO: Remove border bottom after adding posts
    <div className="flex gap-3 p-4">
      {/* Avatar */}
      <Avatar className="size-10 flex-shrink-0">
        <AvatarImage src={user?.image || ""} />
        <AvatarFallback>
          <Image
            src="/avatar_light.svg"
            alt={user?.name || "User"}
            width={40}
            height={40}
          />
        </AvatarFallback>
      </Avatar>

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

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t">
          {/* Left - Action Icons */}
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors cursor-pointer"
                  aria-label="Add image"
                >
                  <ImageIcon className="size-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={4}>
                <p>Media</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors cursor-pointer"
                  aria-label="Add emoji"
                >
                  <SmileIcon className="size-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={4}>
                <p>Emoji</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors cursor-pointer"
                  aria-label="Add location"
                >
                  <MapPinIcon className="size-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={4}>
                <p>Location</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors cursor-pointer"
                  aria-label="Add poll"
                >
                  <BarChart3Icon className="size-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={4}>
                <p>Poll</p>
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
