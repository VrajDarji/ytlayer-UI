import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import SidebarActions from "./SidebarActions";
import Logo from "./logo";
import { ModeToggle } from "./ui/ModeToggle";
interface SidebarProps {
  user: {
    name: string;
    role: "Creator" | "Editor" | "Manager";
  };
}
const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <div className="p-6 flex flex-col gap-y-6 fixed top-0 left-0 h-[100vh] w-1/6 border-r-2 ">
      <div className="flex w-full items-center juustify-center flex-row gap-x-3">
        <div className="h-4">
          <Logo />
        </div>
        <p className="text-2xl tracking-tight font-medium">YTLayer</p>
      </div>
      <div>
        <SidebarActions />
      </div>
      <div className="mt-auto flex flex-col gap-y-4">
        <ModeToggle />
        <div className="p-4 max-h-16 rounded-md bg-[#FAFAFB] dark:bg-zinc-800 flex flex-row gap-x-4">
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col gap-x-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
