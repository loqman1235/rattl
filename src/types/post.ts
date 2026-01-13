export interface Post {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    username: string;
    image: string | null;
    isVerified: boolean;
  };
  media?: PostMedia[];
  stats: {
    comments: number;
    reposts: number;
    likes: number;
  };
  isLiked: boolean;
  isReposted: boolean;
  isBookmarked: boolean;
}

export type PostMedia =
  | { type: "image"; url: string; alt?: string; width: number; height: number }
  | { type: "video"; url: string; thumbnail?: string; duration: number }
  | { type: "gif"; url: string; width: number; height: number }
  | {
      type: "link";
      url: string;
      title: string;
      description?: string;
      image?: string;
    };
