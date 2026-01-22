"use client";

import { Post } from "@/types/post";
import { PostMedia } from "./post-media";
// import { LinkPreview } from "./link-preview";
import { parsePostContent } from "@/lib/utils";
import Link from "next/link";

type PostContentProps = {
  post: Post;
  truncate?: boolean;
};

export const PostContent = ({ post, truncate }: PostContentProps) => {
  const contentParts = parsePostContent(post.content);
  // const urlRegex = /(https?:\/\/[^\s]+)/g;
  // const links = post.content.match(urlRegex) || [];
  return (
    <div className="flex flex-col gap-3">
      {/* Text Content with Hashtags & Mentions */}
      {post.content && (
        <div
          className={`whitespace-pre-wrap break-words text-[15px] -mt-1 ${
            truncate ? "line-clamp-3" : ""
          }`}
        >
          {contentParts.map((part, i) => {
            if (part.type === "hashtag") {
              return (
                <Link
                  key={i}
                  href={`/hashtag/${part.value.slice(1)}`}
                  className="text-accent hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {part.value}
                </Link>
              );
            }

            if (part.type === "mention") {
              return (
                <Link
                  key={i}
                  href={`/${part.value.slice(1)}`}
                  className="text-accent hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {part.value}
                </Link>
              );
            }

            if (part.type === "url") {
              return (
                <a
                  key={i}
                  href={part.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {part.value}
                </a>
              );
            }

            return <span key={i}>{part.value}</span>;
          })}
        </div>
      )}

      {/* Media */}
      {post.media && post.media.length > 0 && (
        <div className="mb-2">
          <PostMedia media={post.media} />
        </div>
      )}
    </div>
  );
};
