import {
  Home2Stroke,
  Home2Solid,
  Search1Stroke,
  Search1Solid,
  Bell1Stroke,
  Bell1Solid,
  Envelope1Stroke,
  Envelope1Solid,
  Bookmark1Stroke,
  Bookmark1Solid,
  User4Stroke,
  User4Solid,
  Gear1Stroke,
  Gear1Solid,
} from "@lineiconshq/free-icons";

export const sidebarMenuLinks = [
  {
    name: "Home",
    href: "/",
    icon: Home2Stroke,
    activeIcon: Home2Solid,
  },
  {
    name: "Explore",
    href: "/explore",
    icon: Search1Stroke,
    activeIcon: Search1Solid,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell1Stroke,
    activeIcon: Bell1Solid,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: Envelope1Stroke,
    activeIcon: Envelope1Solid,
  },
  {
    name: "Bookmarks",
    href: "/bookmarks",
    icon: Bookmark1Stroke,
    activeIcon: Bookmark1Solid,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User4Stroke,
    activeIcon: User4Solid,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Gear1Stroke,
    activeIcon: Gear1Solid,
  },
] as const;
