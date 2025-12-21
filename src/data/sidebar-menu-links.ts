import {
  BellIcon,
  BookmarkIcon,
  CircleUserRoundIcon,
  HomeIcon,
  MessageCircleIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";

export const sidebarMenuLinks = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Explore", href: "/explore", icon: SearchIcon },
  { name: "Notifications", href: "/notifications", icon: BellIcon },
  { name: "Chat", href: "/chat", icon: MessageCircleIcon },
  { name: "Bookmarks", href: "/bookmarks", icon: BookmarkIcon },
  { name: "Profile", href: "/profile", icon: CircleUserRoundIcon },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
] as const;
