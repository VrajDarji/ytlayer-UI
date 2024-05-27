import CalendarData from "@/components/dashboard/CalendarData";
import ChartComponent from "@/components/dashboard/ChartComponent";
import GridColumns from "@/components/dashboard/GridColumns";
import { VideoColumnProps } from "./components/columns";
import React from "react";
import VideoTableClient from "./components/client";
import getVideoStats from "@/actions/getVideoStats";
import { youtube_v3 } from "googleapis";
import getChannelStats from "@/actions/getChannelStats";
import getReport from "@/actions/getReport";
import Sidebar from "@/components/Sidebar";

const Page = async ({ params }: { params: { channelId: string } }) => {
  const videoStats = await (await getVideoStats()).VideoStats;
  const formattedVideoStats: VideoColumnProps[] = videoStats.map(
    (e: youtube_v3.Schema$Video) => ({
      id: e.id,
      title: e?.snippet?.localized?.title,
      thumbnailUrl: e?.snippet?.thumbnails?.standard?.url,
      views: e?.statistics?.viewCount,
      Stats: {
        likes: e?.statistics?.likeCount,
        dislikes: e?.statistics?.dislikeCount,
      },
    })
  );
  const channelStats = (await getChannelStats()).channelStats;
  const estimatedMinutesWatchedRows = await getReport(
    "estimatedMinutesWatched",
    "allTime"
  );
  const averageViewDurationRows = await getReport(
    "averageViewDuration",
    "allTime"
  );
  let estimatedMinutesWatched = 0;
  let averageViewDuration = 0;
  estimatedMinutesWatchedRows.rows?.forEach(
    (row) => estimatedMinutesWatched + row[1]
  );
  averageViewDurationRows.rows?.forEach((row) => averageViewDuration + row[1]);

  const data = [
    {
      tag: "subscribers",
      value: channelStats?.[0]?.statistics?.subscriberCount as string,
    },
    { tag: "views", value: channelStats?.[0]?.statistics?.viewCount as string },
    {
      tag: "estimated Minutes Watched",
      value: estimatedMinutesWatched.toString(),
    },
    { tag: "average View Duration", value: averageViewDuration.toString() },
  ];
  return (
    <>
      <div className="flex flex-col gap-y-6 w-full">
        <div className="flex flex-row items-center">
          <h1 className="text-2xl font-bold text-[#100F34] dark:text-white">
            Dashboard
          </h1>
          {/* <div className="ml-auto">
          <CalendarData />
        </div> */}
        </div>
        <div>
          <GridColumns data={data} />
        </div>
        <div className="grid w-full md:grid-cols-3 grid-cols-1  gap-x-6 gap-y-4">
          <div className="md:col-span-2">
            <ChartComponent />
          </div>
          <div className="w-full h-full bg-white dark:bg-black rounded-md shadow-md p-6"></div>
        </div>
        <div className="grid w-full md:grid-cols-3 grid-cols-1 gap-x-6 gap-y-4">
          <div className="md:col-span-2 w-full rounded-md shadow-md p-6 flex flex-col bg-white dark:bg-black">
            <VideoTableClient data={formattedVideoStats} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
