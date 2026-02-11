import { cn } from "@/lib/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";

type UserAvatarProps = {
  src: string;
  className?: string;
};
export default function UserAvatar({ src, className }: UserAvatarProps) {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
}
