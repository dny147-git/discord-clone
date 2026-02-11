import ServerSidebar from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function ServerIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}) {
  const { serverId } = await params;

  const profile = await currentProfile();
  const { redirectToSignIn } = await auth();
  if (!profile) {
    return redirectToSignIn();
  }
  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (!server) {
    redirect("/");
  }
  return (
    <div className="h-full">
      <div className="hidden md:flex! h-full w-60 fixed z-20 flex-col inset-y-0">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full md:pl-60"> {children}</main>
    </div>
  );
}
