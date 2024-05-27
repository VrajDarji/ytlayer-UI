import currentProfile from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { inviteId: string } }) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/sign-in");
  }
  if (!params.inviteId) {
    return redirect("/");
  }
  const existingChannel = await db.channels.findFirst({
    where: {
      inviteCode: params.inviteId,
      members: {
        some: {
          id: profile.id,
        },
      },
    },
  });
  if (existingChannel) {
    return redirect(`channels/${existingChannel.channelId}`);
  }
  const channel = await db.channels.update({
    where: {
      inviteCode: params.inviteId,
    },
    data: {
      members: {
        create: [{ userId: profile.id }],
      },
    },
  });
  if (channel) {
    return redirect(`/channels/${channel.channelId}`);
  }
  return null;
};

export default page;
