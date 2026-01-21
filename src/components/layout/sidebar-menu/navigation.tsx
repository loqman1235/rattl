"use client";

import { sidebarMenuLinks } from "@/data/sidebar-menu-links";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarMenuNav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex ml-6 pr-8 flex-1">
      <ul className="flex flex-col w-full">
        {/* LINKS */}
        {sidebarMenuLinks.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.name}>
              <Link
                className="flex items-center gap-5 px-3 py-3 rounded-full transition-all duration-300 hover:bg-secondary w-full"
                href={item.href}
              >
                <span>
                  {isActive ? (
                    <item.activeIcon className="size-6 stroke-2" />
                  ) : (
                    <item.icon className="size-6 stroke-2" />
                  )}
                </span>
                <span
                  className={`text-xl  ${
                    isActive ? "font-bold" : "font-normal"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
