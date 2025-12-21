import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const AppPage = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  if (!session.user.onboardingCompleted) {
    redirect("/onboarding/username");
  }

  // TODO: Work on main app
  return (
    <div>
      <h1 className="text-3xl font-bold">Feed</h1>
    </div>
  );
};
export default AppPage;
