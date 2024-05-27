import React from "react";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    channelId: string;
  };
}

const Layout: React.FC<LayoutProps> = async ({ children, params }) => {
  return (
    <div className="flex w-full">
      <div className="hidden md:flex w-1/6">
        <Sidebar channelId={params.channelId} />
      </div>
      <div className="w-full md:w-5/6 bg-[#FAFAFB] dark:bg-[#1A1A1A] p-6 overflow-y-auto h-[100vh]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
