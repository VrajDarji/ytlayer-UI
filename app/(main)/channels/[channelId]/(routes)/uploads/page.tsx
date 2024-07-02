import React from "react";
import VideoTableClient from "../../components/client";
import getVideoStats from "@/actions/getVideoStats";
import { VideoColumnProps } from "../../components/columns";
import { youtube_v3 } from "googleapis";

const page = async ({ params }: { params: { channelId: string } }) => {
  const videoStats = await (await getVideoStats(params.channelId)).VideoStats;
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

  return (
    <div>
      <VideoTableClient data={formattedVideoStats} />
    </div>
  );
};

export default page;
