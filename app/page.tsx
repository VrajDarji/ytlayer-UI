import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();
  if (userId) {
    return redirect("/channels/ab123");
  }
  return null;
}
