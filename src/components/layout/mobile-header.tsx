"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Brand } from "@/components/shared/brand";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SignOutButton } from "@/components/auth/signout-btn";
import { Settings, UserCircle, Palette } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface MobileHeaderProps {
  user: {
    name: string;
    username: string | null;
    image: string | null;
  };
}

export function MobileHeader({ user }: MobileHeaderProps) {
  return (
    <div className="md:hidden sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
      <div className="flex items-center justify-between p-4">
        {/* User Avatar/Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image || ""} />
                <AvatarFallback>
                  <Image
                    src="/avatar_light.svg"
                    alt={user.name}
                    width={32}
                    height={32}
                  />
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60">
            <div className="px-3 py-2">
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={`/${user.username}`}
                className="flex items-center gap-2 !p-3 cursor-pointer"
              >
                <UserCircle className="size-4 text-accent" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/settings"
                className="flex items-center gap-2 !p-3 cursor-pointer"
              >
                <Settings className="size-4 text-accent" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="flex items-center gap-2 px-3 py-2">
              <Palette className="size-4 text-accent" />
              Theme
            </DropdownMenuLabel>
            <div className="px-2 py-1">
              <ThemeToggle />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-3" asChild>
              <SignOutButton username={user.username} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Logo */}
        <Brand />

        {/* Empty div for balance */}
        <div className="w-8" />
      </div>
    </div>
  );
}
