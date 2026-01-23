import { rightSidebarFooterLinks } from "@/data/footer";
import Link from "next/link";

export const FooterWidget = () => {
  return (
    <div className="px-4 py-3">
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {rightSidebarFooterLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:underline">
            {link.label}
          </Link>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        © {new Date().getFullYear()} Rattl.
      </p>
    </div>
  );
};
