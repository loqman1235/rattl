"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mobileNavLinks } from "@/data/sidebar-menu-links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileNavDrawer } from "./mobile-nav-drawer";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { AuthUser } from "@/lib/auth/config";

interface MobileNavProps {
  user: AuthUser;
}

export function MobileNav({ user }: MobileNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-t safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {/* Quick access icons */}
        {mobileNavLinks.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              {isActive ? (
                <item.activeIcon className="size-6 stroke-2" />
              ) : (
                <Icon className="size-6 stroke-2" />
              )}

              {isActive && (
                <div className="absolute bottom-0 w-1 h-1 rounded-full bg-accent" />
              )}
            </Link>
          );
        })}

        {/* Menu button - opens drawer with all links */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center flex-1 h-full cursor-pointer">
              <Bars3Icon className="size-6 stroke-2" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="h-screen p-0">
            <SheetTitle className="" />
            <MobileNavDrawer user={user} onClose={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
