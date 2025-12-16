export const INTERESTS = [
  "Technology",
  "Sports",
  "Music",
  "Art",
  "Gaming",
  "Food",
  "Travel",
  "Fashion",
  "Photography",
  "Fitness",
  "Books",
  "Movies",
  "Science",
  "Politics",
  "Business",
  "Health",
  "Nature",
  "Pets",
  "Comedy",
  "News",
] as const;

export type Interest = (typeof INTERESTS)[number];
