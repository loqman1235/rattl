import { SidebarMenu } from "@/components/layout/sidebar-menu";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <main className="flex max-w-7xl mx-auto min-h-screen">
      <SidebarMenu />

      {/* Main content */}
      <div className="flex-1 min-w-0 p-5">{children}</div>

      {/* Right sidebar */}
      <aside className="md:block hidden w-[var(--right-sidebar-width)] transition-all duration-300 ease-in-out border-l border-l-border p-5">
        <div className="sticky top-5">Right sidebar</div>
      </aside>
    </main>
  );
};
export default AppLayout;
