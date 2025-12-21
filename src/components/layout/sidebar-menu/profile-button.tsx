import { SignOutButton } from "@/components/auth/signout-btn";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/lib/auth/session";
import {
  MoreHorizontal,
  Palette,
  SettingsIcon,
  UserCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProfileButtonProps = {
  user: Awaited<ReturnType<typeof getCurrentUser>>;
};

export const ProfileButton = async ({ user }: ProfileButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-3 p-3 w-full rounded-full justify-center
      hover:bg-secondary cursor-pointer mt-auto transition-all duration-300 ease-in-out
      focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        >
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>
              <Image
                src="/avatar_light.svg"
                alt={user?.name || ""}
                width={40}
                height={40}
              />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 hidden lg:flex items-center justify-between">
            <div className="flex-1 text-left min-w-0">
              <p className="font-semibold text-sm truncate">{user?.name}</p>
              <p className="text-sm text-muted-foreground truncate">
                @{user?.username}
              </p>
            </div>
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        {/* <DropdownMenuItem asChild>
          <Link
            href={`/${user?.username}`}
            className="flex items-center gap-2 !p-3 cursor-pointer !text-base "
          >
            <UserCircleIcon className="size-5 text-primary" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="flex items-center gap-2 !p-3 cursor-pointer !text-base "
          >
            <SettingsIcon className="size-5 text-primary" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator /> */}

        {/* THEME TOGGLE */}
        <DropdownMenuLabel className="flex items-center gap-2 px-3 py-2">
          {/* <Palette className="size-4 text-primary" /> */}
          Theme
        </DropdownMenuLabel>
        <div className="px-2 py-1">
          <ThemeToggle />
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="p-3" asChild>
          <SignOutButton username={user?.username} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
