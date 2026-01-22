import Link from "next/link";

type WidgetProps = {
  title: string;
  href?: string;
  children: React.ReactNode;
};

export const Widget = ({ title, href, children }: WidgetProps) => {
  return (
    <div className="flex flex-col border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-bold flex items-center gap-2">{title}</h2>
        {href && (
          <Link href={href} className="text-sm text-accent hover:underline">
            Show all
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col">{children}</div>
    </div>
  );
};
