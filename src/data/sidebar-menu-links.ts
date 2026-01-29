import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  BellIcon as BellIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  UserIcon as UserIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
} from "@heroicons/react/24/solid";

export const sidebarMenuLinks = [
  {
    name: "Home",
    href: "/home",
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
    icon: UserIcon,
    activeIcon: UserIconSolid,
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
    icon: UserIcon,
    activeIcon: UserIconSolid,
  },
] as const;
