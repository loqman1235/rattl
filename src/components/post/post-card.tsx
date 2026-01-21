import Link from "next/link";

import { UserAvatar } from "../shared/user-avatar";
import { PostHeader } from "./post-header";
import { PostActions } from "./post-actions";
import { PostContent } from "./post-content";
import { ProfileHoverCard } from "../shared/profile-hover-card";
import { Post } from "@/types/post";
// import { user } from "@/data/user";

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="flex gap-3 p-4 border-t border-t-border transition-all duration-300 ease-in-out hover:bg-secondary/40">
      {/* AVATAR */}
      <div>
        <Link href={`/${post.author.username}`}>
          <ProfileHoverCard user={post.author}>
            <UserAvatar url={post.author.image} />
          </ProfileHoverCard>
        </Link>
      </div>

      {/* DETAILS */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <PostHeader post={post} />
        <PostContent
          post={post}
          // truncate
        />
        {/* FOOTER  */}
        <PostActions post={post} />
      </div>
    </article>
  );
};
