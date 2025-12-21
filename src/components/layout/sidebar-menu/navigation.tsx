"use client";

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
    <nav className="flex items-center justify-center lg:justify-start mx-6">
      <ul className="flex flex-col">
        {/* LINKS */}
        {sidebarMenuLinks.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <li key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className="flex items-center gap-5 px-3 py-3 rounded-full transition-all duration-300 hover:bg-secondary"
                    href={item.href}
                  >
                    <span className="size-6">
                      <Icon className={isActive ? "stroke-[2.5]" : ""} />
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
                  side="right"
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
