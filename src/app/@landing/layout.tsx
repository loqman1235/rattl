import { getSession } from "@/lib/auth/session";
import { Footer } from "./_components/footer";
import { redirect } from "next/navigation";

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="px-10 py-5 flex flex-col min-h-screen gap-20">
      <main className="flex-1 grid place-items-center">{children}</main>
      <Footer />
    </div>
  );
};
export default LandingLayout;
