"use client";

import { Lineicons } from "@lineiconshq/react-lineicons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { sidebarMenuLinks } from "@/data/sidebar-menu-links";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarMenuNav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center justify-center lg:justify-start mx-6 flex-1 md:flex-none">
      <ul className="flex flex-col gap-2 md:gap-0">
        {/* LINKS */}
        {sidebarMenuLinks.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className="flex items-center gap-5 px-3 py-3 rounded-full transition-all duration-300 hover:bg-secondary w-full"
                    href={item.href}
                  >
                    <span>
                      {isActive ? (
                        <Lineicons icon={item.activeIcon} size={24} />
                      ) : (
                        <Lineicons icon={item.icon} size={24} strokeWidth={2} />
                      )}
                    </span>
                    <span
                      className={`hidden md:hidden lg:block text-xl  ${
                        isActive ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </TooltipTrigger>

                <TooltipContent
                  className="lg:hidden"
                  sideOffset={5}
                  side="bottom"
                >
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
