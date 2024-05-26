"use client";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { VideoColumnProps, columns } from "./columns";

interface VideoTableClientProps {
  data: VideoColumnProps[];
}

const VideoTableClient: React.FC<VideoTableClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold tracking-tight">
          Videos ({data.length})
        </p>
      </div>
      <Separator className="" />
      <DataTable data={data} columns={columns} searchKey="title" />
    </>
  );
};

export default VideoTableClient;
