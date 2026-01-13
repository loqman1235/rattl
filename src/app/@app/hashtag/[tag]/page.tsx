import { PostCard } from "@/components/post/post-card";
import { Button } from "@/components/ui/button";
import { ArrowLeftStroke } from "@lineiconshq/free-icons";
import Lineicons from "@lineiconshq/react-lineicons";
import Link from "next/link";
type HashtagPageProps = {
  params: { tag: string };
};

const HashtagPage = ({ params }: HashtagPageProps) => {
  const tag = decodeURIComponent(params.tag);
  return (
    <div>
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b px-2">
        <div className="flex items-center ">
          <Button size="icon-lg" variant="ghost" asChild>
            <Link href="/">
              <Lineicons
                className="size-5"
                icon={ArrowLeftStroke}
                size={24}
                strokeWidth={2}
              />
            </Link>
          </Button>
          <h1 className="text-xl font-bold p-4">#{tag}</h1>
        </div>
      </div>

      {/* Posts with this hashtag */}
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};
export default HashtagPage;
