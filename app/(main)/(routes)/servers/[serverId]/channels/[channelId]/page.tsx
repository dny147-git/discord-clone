import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type ChannelIdPageProps = {
  params: Promise<{
    serverId: string;
    channelId: string;
  }>;
};
export default async function ChannelIdPage({ params }: ChannelIdPageProps) {
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth();
  const { channelId, serverId } = await params;
  if (!profile) {
    return redirectToSignIn();
  }
  const channel = await prisma.channel.findUnique({
    where: {
      id: channelId,
    },
  });
  const member = await prisma.member.findFirst({
    where: {
      serverId,
      profileId: profile.id,
    },
  });
  if (!channel || !member) {
    redirect(`/`);
  }
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
      <ChatMessages
        member={member}
        name={channel.name}
        chatId={channel.id}
        type="channel"
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
        paramKey="channelId"
        paramValue={channelId}
      />
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{ channelId: channel.id, serverId: channel.serverId }}
      />
    </div>
  );
}
