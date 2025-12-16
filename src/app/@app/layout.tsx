import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <main>
      <div className="min-h-screen">{children}</div>
    </main>
  );
};
export default AppLayout;
