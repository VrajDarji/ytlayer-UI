import getReport from "@/actions/getReport";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { metrics, dateString } = await req.json();
    console.log(dateString);
    const data = await getReport(metrics, dateString);

    return NextResponse.json(data);
  } catch (err) {
    return new NextResponse("Server Error", { status: 501 });
  }
}
