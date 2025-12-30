import { Brand } from "@/components/shared/brand";
import { SidebarMenuNav } from "./navigation";
import { ProfileButton } from "./profile-button";
import { getCurrentUser } from "@/lib/auth/session";
import { PostButton } from "./post-button";

export const SidebarMenu = async () => {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <aside className="w-[var(--sidebar-menu-width-mobile)] md:w-[var(--sidebar-menu-width-mobile)] lg:w-[var(--sidebar-menu-width)] transition-all duration-300 ease-in-out border-r border-r-border">
      <div className="sticky top-5 flex flex-col gap-4 min-h-screen pb-5">
        <div className="flex-1 flex flex-col gap-2">
          {/* LOGO */}
          <div className="px-9">
            <Brand />
          </div>

          {/* NAVIGATION */}
          <SidebarMenuNav />

          {/* POST BUTTON */}
          <div className="px-6 flex items-center justify-center">
            <PostButton />
          </div>
        </div>

        {/* PROFILE BUTTON */}
        <div className="px-3 md:px-6 mt-auto flex items-center justify-center w-full">
          <ProfileButton user={user} />
        </div>
      </div>
    </aside>
  );
};
