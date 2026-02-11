import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type InviteCodePageProps = {
  params: Promise<{
    inviteCode: string;
  }>;
};
export default async function InviteCodePage({ params }: InviteCodePageProps) {
  const { inviteCode } = await params;
  const { redirectToSignIn } = await auth();
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  if (!inviteCode) {
    redirect("/");
  }
  const existingServer = await prisma.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (existingServer) {
    redirect(`/servers/${existingServer.id}`);
  }
  const server = await prisma.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: [{ profileId: profile.id }],
      },
    },
  });
  if (server) {
    redirect(`/servers/${server.id}`);
  }
  return null;
}
