"use client";

import { useState } from "react";
import Image from "next/image";
import { PostMedia as PostMediaType } from "@/types/post";
import { Play, Volume2, VolumeX } from "lucide-react";

interface PostMediaProps {
  media: PostMediaType[];
}

export function PostMedia({ media }: PostMediaProps) {
  const count = media.length;

  // Single image/video
  if (count === 1) {
    return (
      <div className="rounded-2xl overflow-hidden border">
        <MediaItem media={media[0]} />
      </div>
    );
  }

  // Two images - side by side
  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-0.5 rounded-2xl overflow-hidden border">
        <MediaItem media={media[0]} />
        <MediaItem media={media[1]} />
      </div>
    );
  }

  // Three images - 1 large left, 2 stacked right
  if (count === 3) {
    return (
      <div className="grid grid-cols-2 gap-0.5 rounded-2xl overflow-hidden border h-[400px]">
        <div className="row-span-2">
          <MediaItem media={media[0]} fill />
        </div>
        <MediaItem media={media[1]} />
        <MediaItem media={media[2]} />
      </div>
    );
  }

  // Four images - 2x2 grid
  if (count === 4) {
    return (
      <div className="grid grid-cols-2 gap-0.5 rounded-2xl overflow-hidden border">
        {media.map((item, i) => (
          <MediaItem key={i} media={item} />
        ))}
      </div>
    );
  }

  // 5+ images - Show 4, with "+N more" overlay on last
  return (
    <div className="grid grid-cols-2 gap-0.5 rounded-2xl overflow-hidden border">
      {media.slice(0, 3).map((item, i) => (
        <MediaItem key={i} media={item} />
      ))}
      <div className="relative">
        <MediaItem media={media[3]} />
        {count > 4 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white text-3xl font-bold">+{count - 4}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Media Item Wrapper
// ============================================
interface MediaItemProps {
  media: PostMediaType;
  fill?: boolean;
}

function MediaItem({ media, fill = false }: MediaItemProps) {
  if (media.type === "image") {
    return <MediaImage media={media} fill={fill} />;
  }
  if (media.type === "video") {
    return <MediaVideo media={media} fill={fill} />;
  }
  if (media.type === "gif") {
    return <MediaGif media={media} fill={fill} />;
  }
  return null;
}

// ============================================
// Image Component
// ============================================
function MediaImage({
  media,
  fill = false,
}: {
  media: Extract<PostMediaType, { type: "image" }>;
  fill?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative bg-muted ${fill ? "h-full" : "aspect-square"}`}>
      {isLoading && <div className="absolute inset-0 bg-muted animate-pulse" />}
      <Image
        src={media.url}
        alt={media.alt || "Post image"}
        fill
        className="object-cover cursor-pointer hover:opacity-95 transition-opacity"
        onLoad={() => setIsLoading(false)}
        sizes="(max-width: 768px) 100vw, 600px"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // TODO: Open lightbox
        }}
      />
    </div>
  );
}

// ============================================
// Video Component
// ============================================
function MediaVideo({
  media,
  fill = false,
}: {
  media: Extract<PostMediaType, { type: "video" }>;
  fill?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div
      className={`relative bg-black group ${fill ? "h-full" : "aspect-video"}`}
    >
      <video
        src={media.url}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const video = e.currentTarget;
          if (video.paused) {
            video.play();
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        }}
      />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-8 h-8 text-black ml-1" fill="black" />
          </div>
        </div>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsMuted(!isMuted);
        }}
        className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-white" />
        ) : (
          <Volume2 className="w-4 h-4 text-white" />
        )}
      </button>

      <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-xs font-medium">
        {formatDuration(media.duration)}
      </div>
    </div>
  );
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// ============================================
// GIF Component
// ============================================
function MediaGif({
  media,
  fill = false,
}: {
  media: Extract<PostMediaType, { type: "gif" }>;
  fill?: boolean;
}) {
  return (
    <div className={`relative bg-muted ${fill ? "h-full" : "aspect-square"}`}>
      <Image
        src={media.url}
        alt="GIF"
        fill
        className="object-cover"
        unoptimized
      />
      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-xs font-bold">
        GIF
      </div>
    </div>
  );
}
