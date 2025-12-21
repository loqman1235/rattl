import Image from "next/image";
import Link from "next/link";

export const Brand = () => {
  return (
    <Link
      className="flex items-center justify-center lg:justify-start gap-2"
      href="/"
    >
      {/* ✅ Light mode logo (hidden in dark mode) */}
      <Image
        src="/rattl_dark.svg"
        width={120}
        height={120}
        alt="Rattl"
        className="size-8 max-w-none block dark:hidden"
        priority
      />

      {/* ✅ Dark mode logo (hidden in light mode) */}
      <Image
        src="/rattl_light.svg"
        width={120}
        height={120}
        alt="Rattl"
        className="size-8 max-w-none hidden dark:block"
        priority
      />
    </Link>
  );
};
