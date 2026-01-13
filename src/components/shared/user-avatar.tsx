import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  url?: string | null;
  className?: string;
};

export const UserAvatar = ({ url, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("size-10 flex-shrink-0", className)}>
      {url ? (
        <AvatarImage src={url} />
      ) : (
        <AvatarFallback>
          <Image src="/avatar_light.svg" alt="User" width={80} height={80} />
        </AvatarFallback>
      )}
    </Avatar>
  );
};
