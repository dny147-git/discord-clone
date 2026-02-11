"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function InviteModal() {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const isModalOpen = isOpen && type === "invite";
  const origin = useOrigin();
  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  function onCopy() {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }
  async function onNew() {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
      );
      onOpen("invite", { server: response.data });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden left-4 md:left-[50%] md:-translate-x-1/2! top-[20%]">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50! border-0 focus-visible:ring-0 
            text-black focus-visible:ring-offset-0"
              disabled={isLoading}
              value={inviteUrl}
              onChange={onNew}
            />
            <Button
              size="icon"
              variant="outline"
              className="hover:text-black cursor-pointer"
              onClick={onCopy}
              disabled={isLoading}
            >
              {copied ? <Check /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <Button
            variant="link"
            onClick={onNew}
            size="sm"
            className="text-xs text-zinc-500 mt-4 cursor-pointer"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
