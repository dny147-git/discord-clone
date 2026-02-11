"use client";
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";
import ActionTooltip from "../action-tooltip";

export default function NavigationAction() {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button
          className="group cursor-pointer flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div
            className="group-hover:bg-emerald-500! flex mx-3 h-12 w-12 rounded-[24px]
            transition-all overflow-hidden items-center justify-center
          bg-background dark:bg-neutral-700 "
          >
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}
