import { NextResponse } from "next/server";
import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { id, name, imageUrl } = await req.json();
    if (!id && !name && !imageUrl) {
      return new NextResponse("Field Missing", { status: 422 });
    }
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const channel = await db.channels.create({
      data: {
        channelId: id,
        userId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        members: {
          create: [{ role: MemberRole.CREATOR, userId: profile.id }],
        },
      },
    });
    return NextResponse.json(channel);
  } catch (err) {
    console.log("Server", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
