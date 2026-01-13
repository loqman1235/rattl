import Link from "next/link";

import { UserAvatar } from "../shared/user-avatar";
import { PostHeader } from "./post-header";
import { PostActions } from "./post-actions";
import { PostContent } from "./post-content";
import { ProfileHoverCard } from "../shared/profile-hover-card";
import { user } from "@/data/user";

export const PostCard = () => {
  return (
    <article className="flex gap-3 p-4 border-t border-t-border transition-all duration-300 ease-in-out hover:bg-muted/40">
      {/* AVATAR */}
      <div>
        <Link href="/loqmanedj">
          <ProfileHoverCard user={user}>
            <UserAvatar url={null} />
          </ProfileHoverCard>
        </Link>
      </div>

      {/* DETAILS */}
      <div className="flex-1 flex flex-col gap-2">
        {/* HEADER */}
        <PostHeader />
        <PostContent
          post={{
            id: "1",
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
            author: {
              id: "1",
              name: "Loqmane Djefafla",
              username: "loqmanedj",
              image: null,
              isVerified: true,
            },
            stats: {
              comments: 122,
              reposts: 220,
              likes: 20000,
            },
            isLiked: false,
            isReposted: false,
            isBookmarked: false,
            content:
              "Happy new year 2026 @loqmanedj \n #newyear #happynewyear ",
            // media: [
            //   {
            //     url: "https://i.pinimg.com/736x/59/08/8a/59088ad849c8e7c9323a113f6598de67.jpg",
            //     type: "image",
            //     width: 1920,
            //     height: 1080,
            //   },
            //   {
            //     url: "https://i.ytimg.com/vi/iJdUYpaA4kc/maxresdefault.jpg",
            //     type: "image",
            //     width: 1920,
            //     height: 1080,
            //   },
            //   // {
            //   //   url: "https://www.adorama.com/alc/wp-content/uploads/2021/05/bird-wings-flying-feature.gif",
            //   //   type: "gif",
            //   //   width: 480,
            //   //   height: 480,
            //   // },
            // ],
          }}
          truncate
        />
        {/* FOOTER  */}
        <PostActions />
      </div>
    </article>
  );
};
