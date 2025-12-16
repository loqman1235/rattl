import { signOut } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const AppPage = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  // TODO: Work on main app
  return (
    <div className="container mx-auto p-4 flex flex-col gap-10">
      <h1 className="text-3xl font-bold">Feed</h1>
      <p>Welcome, @{session.user.username}!</p>

      <form action={signOut}>
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
};
export default AppPage;
