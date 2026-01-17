import { SignOutButton } from "@/components/auth/signout-btn";
import { UserAvatar } from "@/components/shared/user-avatar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/lib/auth/session";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

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
          <UserAvatar url={user?.image} />
          <div className="flex-1 flex items-center justify-between">
            <div className="flex-1 text-left min-w-0">
              <p className="font-semibold text-sm truncate">{user?.name}</p>
              <p className="text-sm text-muted-foreground truncate">
                @{user?.username}
              </p>
            </div>
            <EllipsisHorizontalIcon className="size-5" />
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
