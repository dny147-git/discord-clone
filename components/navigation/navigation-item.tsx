"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import ActionTooltip from "../action-tooltip";

type NavigationItemProps = {
  id: string;
  imageUrl: string;
  name: string;
};
export default function NavigationItem({
  id,
  imageUrl,
  name,
}: NavigationItemProps) {
  const params = useParams();
  const router = useRouter();
  function onClick() {
    router.push(`/servers/${id}`);
  }
  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        className="group relative flex items-center cursor-pointer"
        onClick={onClick}
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-1",
            params?.serverId !== id && "group-hover:h-5",
            params?.serverId === id ? "h-9" : "h-2",
          )}
        ></div>
        <div
          className={cn(
            "relative group flex mx-3 h-12 w-12 rounded-[24px] group-hover:rounded-3xl transition-all overflow-hidden",
            params?.serverId === id && "bg-primary/10 text-primary rounded-3xl",
          )}
        >
          <Image fill src={imageUrl} alt="Channel" />
        </div>
      </button>
    </ActionTooltip>
  );
}
