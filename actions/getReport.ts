"use server";
import { oauth, youtubeAnalytics } from "@/lib/google";
import getAccessToken from "./getAccessToken";
const getReport = async (
  metrics: string,
  dateString: string,
  channelId: string
) => {
  const accessToken = await getAccessToken();
  oauth.setCredentials({
    access_token: accessToken,
  });
  const endDate = new Date();
  const startDate = new Date();
  if (dateString === "Last Week") {
    startDate.setDate(endDate.getDate() - 7);
  } else if (dateString === "Last Month") {
    startDate.setMonth(endDate.getMonth() - 1);
  } else if (dateString == "Last Year") {
    startDate.setFullYear(endDate.getFullYear() - 1);
  } else {
    startDate.setFullYear(endDate.getFullYear() - 20);
  }
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];
  console.log(formattedStartDate);

  try {
    const { data } = await youtubeAnalytics.reports.query({
      ids: `channel==mine`,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      metrics: metrics,
      dimensions: "day",
      sort: "day",
    });
    return data;
  } catch (err) {
    console.log("Server Error", err);
    throw new Error("Error");
  }
};

export default getReport;
