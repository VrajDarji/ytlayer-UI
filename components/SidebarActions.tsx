"use client";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Calendar,
  FileText,
  LayoutGrid,
  MessageSquare,
  Settings,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { it } from "node:test";
import React from "react";

const SidebarActions = () => {
  const pathaame = usePathname();
  const params = useParams();
  const SidebarActionItems = [
    {
      icon: <LayoutGrid size={20} />,
      tag: "Dashboard",
      href: `/channels/${params.channelId}`,
      isActive: pathaame === `/channels/${params.channelId}`,
    },
    {
      icon: <BarChart size={20} />,
      tag: "Analytics",
      href: `/channels/${params.channelId}/analytics`,
      isActive: pathaame === `/channels/${params.channelId}/analytics`,
    },
    {
      icon: <VideoIcon size={20} />,
      tag: "Uploads",
      href: `/channels/${params.channelId}/uploads`,
      isActive: pathaame === `/channels/${params.channelId}/uploads`,
    },
    {
      icon: <FileText size={20} />,
      tag: "Schedule",
      href: `/channels/${params.channelId}/schedule`,
      isActive: pathaame === `/channels/${params.channelId}/schedule`,
    },
    {
      icon: <Calendar size={20} />,
      tag: "Calendar",
      href: `/channels/${params.channelId}/calender`,
      isActive: pathaame === `/channels/${params.channelId}/calender`,
    },
    {
      icon: <MessageSquare size={20} />,
      tag: "Messages",
      href: `/channels/${params.channelId}/messages`,
      isActive: pathaame === `/channels/${params.channelId}/messages`,
    },
    {
      icon: <Settings size={20} />,
      tag: "Settings",
      href: `/channels/${params.channelId}/settings`,
      isActive: pathaame === `/channels/${params.channelId}/settings`,
    },
  ];
  return (
    <div className="flex flex-col w-full gap-y-1 py-6">
      {SidebarActionItems.map((item) => (
        <Link
          key={item.tag}
          href={item.href}
          className={cn(
            "flex flex-row items-center gap-x-4 text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-600 px-3 py-2 rounded-md",
            item.isActive &&
              "text-indigo-500 bg-gray-200 dark:bg-zinc-800 font-mediu hover:bg-gray-200 dark:hover:bg-gray-800"
          )}
        >
          {item.icon}
          <p>{item.tag}</p>
        </Link>
      ))}
    </div>
  );
};

export default SidebarActions;
