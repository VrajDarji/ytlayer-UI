"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import { Users, Trash, PlusCircle, UserPlus, Settings } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { Channels, Member, MemberRole } from "@prisma/client";

interface ChannelsSwitchProps {
  Channels: Channels[];
  Members: Member[];
  role: MemberRole;
}

const ChannelSwitch: React.FC<ChannelsSwitchProps> = ({
  Channels,
  Members,
  role,
}) => {
  const params = useParams();
  const router = useRouter();
  const isCreator = role === "CREATOR";
  const isManager = isCreator || role === "MANAGER";
  const formattedItems = Channels.map((channel) => ({
    label: channel.name,
    value: channel.channelId,
    image: channel.imageUrl,
  }));
  const currentItem = formattedItems.find(
    (item) => item.value === params.channelId
  );
  const { onOpen } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const otherChannels = Channels.filter(
    (channel) => channel.id != params.channelId
  );
  const onChannelSelect = (channel: Channels) => {
    setIsOpen(false);
    router.push(`/channels/${channel.channelId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 gap-x-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md">
          <Image
            src={currentItem?.image as string}
            alt=""
            width={30}
            height={30}
            className="rounded-full"
          />
          {currentItem?.label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isManager && (
          <DropdownMenuItem
            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
            onClick={() => onOpen("inviteModal", { channel: Channels[0] })}
          >
            Invite Members
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {otherChannels.map((channel) => (
          <DropdownMenuItem
            key={channel.id}
            onSelect={() => onChannelSelect(channel)}
          >
            <Image
              src={channel?.imageUrl as string}
              alt=""
              width={30}
              height={30}
              className="rounded-full mr-5"
            />
            {channel.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChannelSwitch;
