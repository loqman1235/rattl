import { PostCard } from "@/components/post/post-card";
import { PostComposer } from "@/components/post/post-composer";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const FeedPage = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/");
  }

  if (!session.user.onboardingCompleted) {
    redirect("/onboarding/username");
  }

  // TODO: Work on feed
  return (
    <div className="pb-20">
      {/* HEADER */}
      <nav className="flex sticky top-0 z-10">
        <button className="w-1/2 p-3 flex items-center justify-center border-b border-b-border bg-background/80 backdrop-blur-sm font-semibold hover:bg-secondary cursor-pointer text-primary transition-all duration-300 ease-in-out relative after:absolute after:bottom-0 after:w-[100px] after:h-1 after:bg-primary after:rounded-full after:transition-all after:duration-300 after:ease-in-out">
          Discover
        </button>
        <button className="w-1/2 p-3 flex items-center justify-center border-b border-b-border bg-background/80 backdrop-blur-sm font-semibold hover:bg-secondary cursor-pointer text-muted-foreground transition-all duration-300 ease-in-out">
          Following
        </button>
      </nav>
      {/* POST INPUT */}
      <PostComposer user={session.user} />
      {/* FEED POSTS */}
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};
export default FeedPage;
