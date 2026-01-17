import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  BellIcon as BellIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  UserCircleIcon as UserCircleIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
} from "@heroicons/react/24/solid";

export const sidebarMenuLinks = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
    activeIcon: HomeIconSolid,
  },
  {
    name: "Explore",
    href: "/explore",
    icon: MagnifyingGlassIcon,
    activeIcon: MagnifyingGlassIconSolid,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: BellIcon,
    activeIcon: BellIconSolid,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: EnvelopeIcon,
    activeIcon: EnvelopeIconSolid,
  },
  {
    name: "Bookmarks",
    href: "/bookmarks",
    icon: BookmarkIcon,
    activeIcon: BookmarkIconSolid,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserCircleIcon,
    activeIcon: UserCircleIconSolid,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Cog6ToothIcon,
    activeIcon: Cog6ToothIconSolid,
  },
] as const;

export const mobileNavLinks = [
  { name: "Home", href: "/", icon: HomeIcon, activeIcon: HomeIconSolid },
  {
    name: "Explore",
    href: "/explore",
    icon: MagnifyingGlassIcon,
    activeIcon: MagnifyingGlassIconSolid,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: BellIcon,
    activeIcon: BellIconSolid,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: EnvelopeIcon,
    activeIcon: EnvelopeIconSolid,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserCircleIcon,
    activeIcon: UserCircleIconSolid,
  },
] as const;
