import { cn } from "@/lib/utils";

type HomeFilledIconProps = {
  className?: string;
};

export const SearchFilledIcon = ({ className }: HomeFilledIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className="lucide lucide-search-filled"
    >
      <path d="M11 2a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 16a7 7 0 1 1 7-7 7 7 0 0 1-7 7z" />
      <rect
        x="18.1"
        y="16.7"
        width="2.5"
        height="6"
        rx="1"
        transform="rotate(-45 19.35 19.7)"
      />
    </svg>
  );
};
