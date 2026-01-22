import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parsePostContent(
  content: string,
): Array<{ type: string; value: string }> {
  // Regex patterns
  const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
  const mentionRegex = /@[\w]+/g;
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const parts: Array<{
    type: "text" | "hashtag" | "mention" | "url";
    value: string;
    display: string;
  }> = [];

  let lastIndex = 0;
  const allMatches: Array<{
    index: number;
    length: number;
    type: string;
    value: string;
  }> = [];

  // Find all hashtags
  let match;
  while ((match = hashtagRegex.exec(content)) !== null) {
    allMatches.push({
      index: match.index,
      length: match[0].length,
      type: "hashtag",
      value: match[0],
    });
  }

  // Find all mentions
  while ((match = mentionRegex.exec(content)) !== null) {
    allMatches.push({
      index: match.index,
      length: match[0].length,
      type: "mention",
      value: match[0],
    });
  }

  // Find all URLs
  while ((match = urlRegex.exec(content)) !== null) {
    allMatches.push({
      index: match.index,
      length: match[0].length,
      type: "url",
      value: match[0],
    });
  }

  // Sort by index
  allMatches.sort((a, b) => a.index - b.index);

  // Build parts array
  allMatches.forEach((m) => {
    // Add text before match
    if (m.index > lastIndex) {
      parts.push({
        type: "text",
        value: content.slice(lastIndex, m.index),
        display: content.slice(lastIndex, m.index),
      });
    }

    // Add match
    parts.push({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: m.type as any,
      value: m.value,
      display: m.value,
    });

    lastIndex = m.index + m.length;
  });

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: "text",
      value: content.slice(lastIndex),
      display: content.slice(lastIndex),
    });
  }

  return parts;
}

export const formatPostDate = (date: Date | null): string => {
  if (date === null) {
    throw new Error("Cannot format null date");
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInSeconds / (60 * 60));

  try {
    if (diffInSeconds < 60) {
      return "just now";
    }

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    }

    if (diffInHours < 24) {
      return `${diffInHours}h`;
    }

    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays < 7) {
      return `${diffInDays}d`;
    }

    if (diffInDays < 30) {
      const diffInWeeks = Math.floor(diffInDays / 7);
      return `${diffInWeeks}w`;
    }

    if (diffInDays < 365) {
      const diffInMonths = Math.floor(diffInDays / 30);
      return `${diffInMonths}mo`;
    }

    // For very old posts, show full date
    return format(date, "MMM d, yyyy");
  } catch (error) {
    console.error("Error formatting post date:", error);
    return "";
  }
};

export const formatCount = (count: number | null): string => {
  if (count === null) {
    throw new Error("Cannot format null count");
  }

  try {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(count);
  } catch (error) {
    console.error("Error formatting count:", error);
    return "";
  }
};
