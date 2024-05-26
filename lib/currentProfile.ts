import { auth, currentUser } from "@clerk/nextjs";

const currentProfile = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  console.log("FROM LIB : ", userId);
  const profile = await currentUser();
  return profile;
};

export default currentProfile;
