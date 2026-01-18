"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SignOutButton } from "@/components/auth/signout-btn";

import { sidebarMenuLinks } from "@/data/sidebar-menu-links";
import { AuthUser } from "@/lib/auth/config";
import { UserAvatar } from "@/components/shared/user-avatar";

interface MobileNavDrawerProps {
  user: AuthUser;
  onClose: () => void;
}

export function MobileNavDrawer({ user, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full max-h-screen overflow-hidden">
      {/* User Section */}
      <div className="p-6 border-b flex-shrink-0">
        <div className="flex items-center gap-3">
          <UserAvatar url={user?.image} />
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{user.name}</p>
            <p className="text-sm text-muted-foreground truncate">
              @{user.username}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {sidebarMenuLinks.map((item) => {
            const isActive = pathname === item.href;
            const href =
              item.href === "/profile" ? `/${user.username}` : item.href;

            return (
              <li key={item.name}>
                <Link
                  href={href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-full
                    transition-colors hover:bg-secondary
                    ${isActive && "font-semibold"}
                  `}
                >
                  {isActive ? (
                    <item.activeIcon className="size-6 stroke-2" />
                  ) : (
                    <item.icon className="size-6 stroke-2" />
                  )}
                  <span className="text-lg">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="border-t p-4 space-y-4">
        {/* Theme Toggle */}
        <div>
          <div className="flex items-center gap-2 px-2 mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Theme
            </span>
          </div>
          <ThemeToggle />
        </div>

        <Separator />

        {/* Sign Out */}
        <SignOutButton username={user.username} />
      </div>
    </div>
  );
}
