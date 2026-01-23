"use client";

import { Widget } from "@/components/shared/widget";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserAvatar } from "@/components/shared/user-avatar";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

// TODO: Fetch from API
const suggestedUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "sarahj",
    image: null,
    bio: "Software engineer @ Google",
    isVerified: true,
    followers: 15200,
  },
  {
    id: 2,
    name: "Tech Daily",
    username: "techdaily",
    image: null,
    bio: "Latest tech news and updates",
    isVerified: true,
    followers: 89500,
  },
  {
    id: 3,
    name: "Alex Chen",
    username: "alexchen",
    image: null,
    bio: "Product Designer • UI/UX",
    isVerified: false,
    followers: 4200,
  },
];

export const SuggestedForYouWidget = () => {
  return (
    <Widget title="Suggested for you" href="/explore/people">
      {suggestedUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Widget>
  );
};

function UserCard({ user }: { user: (typeof suggestedUsers)[0] }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    setIsFollowing(!isFollowing);
    // TODO: Call API
  };

  return (
    <Link
      href={`/${user.username}`}
      className="flex items-start gap-3 hover:bg-secondary/40 transition-colors px-4 py-3"
    >
      <UserAvatar url={user.image} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <p className="font-semibold text-sm truncate hover:underline">
            {user.name}
          </p>
          {user.isVerified && <CheckBadgeIcon className="size-4 text-accent" />}
        </div>
        <p className="text-sm text-muted-foreground truncate">
          @{user.username}
        </p>
      </div>

      <Button
        onClick={handleFollow}
        variant={isFollowing ? "outline" : "default"}
        size="sm"
        className="flex-shrink-0 rounded-full px-4"
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </Link>
  );
}
