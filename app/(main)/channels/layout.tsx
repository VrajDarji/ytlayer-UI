import React from "react";
import Sidebar from "@/components/Sidebar";
import { currentUser } from "@clerk/nextjs";
const layout = async ({ children }: { children: React.ReactNode }) => {
  const userFromClerk = await currentUser();
  const UserName = `${userFromClerk?.firstName} ${userFromClerk?.lastName}`;
  return (
    <div className="flex w-full">
      <div className="w-1/6">
        <Sidebar user={{ name: UserName, role: "Creator" }} />
      </div>
      <div className="w-5/6 bg-[#FAFAFB] dark:bg-[#1A1A1A] p-6 overflow-y-auto h-[100vh]">
        {children}
      </div>
    </div>
  );
};

export default layout;
