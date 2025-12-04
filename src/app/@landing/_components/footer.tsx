import { footerLinks } from "@/data/footer";

export const Footer = () => {
  const year = new Date().getFullYear();
  const items = [...footerLinks, { title: `© ${year} Rattl`, href: null }];

  return (
    <footer className="flex flex-col items-center gap-4 md:flex-row md:justify-center flex-wrap">
      <nav className="flex items-center justify-center gap-2 flex-wrap">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-border">|</span>}

            {item.href ? (
              <a
                href={item.href}
                className="text-xs text-muted-foreground hover:underline"
              >
                {item.title}
              </a>
            ) : (
              <span className="text-xs text-muted-foreground">
                {item.title}
              </span>
            )}
          </div>
        ))}
      </nav>
    </footer>
  );
};
