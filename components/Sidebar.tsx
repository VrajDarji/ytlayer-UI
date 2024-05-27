import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import SidebarActions from "./SidebarActions";
import { ModeToggle } from "./ui/ModeToggle";
import ChannelSwitch from "./ui/channelSwitch";
import { db } from "@/lib/db";
import currentProfile from "@/lib/currentProfile";
import { useLocation } from "@/hooks/useLocation";
interface SidebarProps {
  channelId: string;
}
const Sidebar: React.FC<SidebarProps> = async ({ channelId }) => {
  const user = await currentProfile();
  let userId = user?.id;
  if (user) {
    userId = user.id;
  }
  const channels = await db.channels.findMany({
    where: {
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
  });
  const currentChannnel = await db.channels.findFirst({
    where: {
      channelId: channelId,
    },
  });
  const members = await db.member.findMany({
    where: {
      channelId: currentChannnel?.id,
    },
  });
  const memberRole = members.filter((member) => member.userId === userId);
  return (
    <div className="p-6 flex flex-col gap-y-6 fixed top-0 left-0 h-[100vh] w-1/6 border-r-2 ">
      <div className="flex w-fulxl items-center juustify-center flex-row gap-x-3">
        <ChannelSwitch
          Channels={channels}
          Members={members}
          role={memberRole?.[0].role}
        />
      </div>
      <div>
        <SidebarActions />
      </div>
      <div className="mt-auto flex flex-col gap-y-4">
        <ModeToggle />
        <div className="p-4 max-h-16 rounded-md bg-[#FAFAFB] dark:bg-zinc-800 flex flex-row gap-x-4">
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col gap-x-1">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">
              {memberRole?.[0].role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
