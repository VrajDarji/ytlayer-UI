"use server";
import { oauth, youtube } from "@/lib/google";
import getAccessToken from "./getAccessToken";
const getChannelStats = async (channelId: string) => {
  const accessToken = await getAccessToken();
  oauth.setCredentials({
    access_token: accessToken,
  });
  try {
    const channelList = await youtube.channels.list({
      part: ["contentDetails", "snippet", "statistics"],
      id: [channelId],
    });
    return {
      channelStats: channelList.data.items,
    };
  } catch (err) {
    console.log("Server Error", err);
    throw new Error("Error");
  }
};

export default getChannelStats;
