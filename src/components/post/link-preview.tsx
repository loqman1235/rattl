interface LinkPreviewProps {
  url: string;
}

export const LinkPreview = ({ url }: LinkPreviewProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="border rounded-2xl overflow-hidden hover:bg-accent/50 transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-3 flex flex-col gap-2">
        <p className="text-sm text-muted-foreground truncate">{url}</p>
      </div>
    </a>
  );
};
