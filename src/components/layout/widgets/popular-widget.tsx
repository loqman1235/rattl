import { Widget } from "@/components/shared/widget";
import Link from "next/link";

// TODO: Fetch from API
const trendingTopics = [
  {
    id: 1,
    title: "#Science",
    postsCount: "12.5K",
    data: [10, 20, 15, 25, 30],
  },
  {
    id: 2,
    title: "#WorldCup",
    postsCount: "45.2K",
    data: [50, 60, 100, 70, 80],
  },
  {
    id: 3,
    title: "#NewAlbumRelease",
    postsCount: "8.9K",
    data: [5, 10, 8, 15, 20],
  },
  { id: 4, title: "#GTA6", postsCount: "125K", data: [80, 90, 100, 110, 125] },
];

export const PopularWidget = () => {
  return (
    <Widget title="Popular" href="/trending">
      {trendingTopics.map((topic) => (
        <Link
          key={topic.id}
          href={`/search?q=${encodeURIComponent(topic.title)}`}
          className="flex items-center justify-between hover:bg-secondary/40 transition-colors px-4 py-3 group"
        >
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold text-sm truncate group-hover:underline">
              {topic.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {topic.postsCount} posts
            </p>
          </div>

          {/* RIGHT SIDE */}
          <Sparkline data={topic.data} />
        </Link>
      ))}
    </Widget>
  );
};

function Sparkline({ data }: { data: number[] }) {
  const width = 48;
  const height = 28;
  const padding = 2;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
      const y =
        height - padding - ((value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="flex-shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-accent"
      />
    </svg>
  );
}
