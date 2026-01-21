"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { UserAvatar } from "./user-avatar";
import { formatDistanceToNow } from "date-fns";

import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import {
  MapPinIcon,
  CalendarIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { formatCount } from "@/lib/utils";

type ProfileHoverCardProps = {
  children: React.ReactNode;
  user: {
    id: string;
    name: string;
    username: string;
    image: string | null;
    isVerified: boolean;
    bio?: string;
    location?: string;
    website?: string;
    createdAt: Date;
    stats: {
      followers: number;
      following: number;
      posts: number;
    };
    isFollowing?: boolean;
  };
};

export function ProfileHoverCard({ children, user }: ProfileHoverCardProps) {
  return (
    <HoverCard openDelay={300} closeDelay={200}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        onClick={(e) => e.stopPropagation()}
        className="w-80 rounded-2xl"
        sideOffset={5}
        side="bottom"
        align="center"
      >
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <Link href={`/${user.username}`}>
              <UserAvatar url={user.image} className="size-16" />
            </Link>
            {!user.isFollowing && (
              <Button className="rounded-full">Follow</Button>
            )}
          </div>

          {/* Name & Username */}
          <div>
            <Link href={`/${user.username}`} className="group">
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-base group-hover:underline">
                  {user.name}
                </h4>
                {user.isVerified && (
                  <CheckBadgeIcon className="size-5 text-accent" />
                )}
              </div>
              <p className=" text-muted-foreground">@{user.username}</p>
            </Link>
          </div>

          {/* Bio */}
          {user.bio && <p className=" leading-relaxed">{user.bio}</p>}

          {/* Metadata */}
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPinIcon className="size-4" />
                <span>{user.location}</span>
              </div>
            )}
            {user.website && (
              <div className="flex items-center gap-1">
                <LinkIcon className="size-4" />

                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {new URL(user.website).hostname}
                </a>
              </div>
            )}
            <div className="flex items-center gap-1">
              <CalendarIcon className="size-4" />

              <span>
                Joined{" "}
                {formatDistanceToNow(user.createdAt, { addSuffix: true })}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 text-sm">
            <div>
              <span className="font-bold">
                {formatCount(user.stats.following)}
              </span>
              <span className="text-muted-foreground ml-1">Following</span>
            </div>
            <div>
              <span className="font-bold">
                {formatCount(user.stats.followers)}
              </span>
              <span className="text-muted-foreground ml-1">Followers</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
