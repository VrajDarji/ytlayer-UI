import { db } from "@/lib/db";
import { intitialProfile } from "@/lib/initialProfile";
import { redirect } from "next/navigation";
import IntiailModal from "@/components/Modals/InitialModal";
export default async function Home() {
  const profile = await intitialProfile();
  const channel = await db.channels.findFirst({
    where: {
      members: {
        some: {
          userId: profile.id,
        },
      },
    },
  });
  if (channel) {
    return redirect(`/channels/${channel.channelId}`);
  }
  return (
    <div>
      <IntiailModal />
    </div>
  );
}
