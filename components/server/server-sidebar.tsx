import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { ChannelType, MemberRole } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { redirect } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import ServerChannel from "./server-channel";
import ServerHeader from "./server-header";
import ServerMember from "./server-member";
import ServerSearch from "./server-search";
import ServerSection from "./server-section";
const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 w-4 h-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 w-4 h-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 w-4 h-4" />,
};
const roleIconMap = {
  [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 mr-2 text-indigo-500" />,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="w-4 h-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.GUEST]: null,
};
export default async function ServerSidebar({
  serverId,
}: {
  serverId: string;
}) {
  const profile = await currentProfile();
  if (!profile) {
    redirect("/");
  }
  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
  const textChannels = server?.channels.filter(
    (s) => s.type === ChannelType.TEXT,
  );
  const audioChannels = server?.channels.filter(
    (s) => s.type === ChannelType.AUDIO,
  );
  const videoChannels = server?.channels.filter(
    (s) => s.type === ChannelType.VIDEO,
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id,
  );
  if (!server) {
    redirect("/");
  }
  const role = server.members.find(
    (member) => member.profileId === profile.id,
  )?.role;
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2 ">
          <ServerSearch
            data={[
              {
                label: "Text channels",
                type: "channel",
                data: textChannels?.map((channel) => {
                  return {
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                  };
                }),
              },
              {
                label: "Voice channels",
                type: "channel",
                data: audioChannels?.map((channel) => {
                  return {
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                  };
                }),
              },
              {
                label: "Video channels",
                type: "channel",
                data: videoChannels?.map((channel) => {
                  return {
                    id: channel.id,
                    name: channel.name,
                    icon: iconMap[channel.type],
                  };
                }),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => {
                  return {
                    id: member.id,
                    name: member.profile.name,
                    icon: roleIconMap[member.role],
                  };
                }),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
              server={server}
            />
            {textChannels.map((channel) => {
              return (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              );
            })}
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
              server={server}
            />
            {audioChannels.map((channel) => {
              return (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              );
            })}
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Voice Channels"
              server={server}
            />
            {videoChannels.map((channel) => {
              return (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                  role={role}
                />
              );
            })}
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Member"
              server={server}
            />
            {members.map((member) => {
              return (
                <ServerMember member={member} server={server} key={member.id} />
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
