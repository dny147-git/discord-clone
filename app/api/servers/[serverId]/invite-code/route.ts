import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ serverId: string }> },
) {
  try {
    const profile = await currentProfile();
    const { serverId } = await params;
    console.log(serverId);
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }
    const server = await prisma.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
      include: {
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
    revalidatePath(`/servers/${serverId}`);
    return NextResponse.json(server);
  } catch (error) {
    console.log("[SERVER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
