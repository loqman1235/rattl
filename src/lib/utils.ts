import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parsePostContent(content: string) {
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
