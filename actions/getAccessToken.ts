"use server";
import currentProfile from "@/lib/currentProfile";
import { clerkClient } from "@clerk/nextjs/server";
const getAccessToken = async () => {
  try {
    const profile = await currentProfile();
    console.log(profile?.userId);
    const userId = profile?.userId as string;
    const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
      userId,
      "oauth_google"
    );
    console.log(clerkResponse);

    return clerkResponse[0].token;
  } catch (err) {
    console.log(err);
    throw new Error("Error retriving token");
  }
};

export default getAccessToken;
