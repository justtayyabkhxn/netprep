import { connectDB } from "@/lib/db";
import { Lecture } from "@/models/Lecture";
import { NextResponse } from "next/server";

type Params = { params: { unitNumber: string } };

export async function GET(_req: Request, { params }: Params) {
  try {
    await connectDB();

    const unitNum = parseInt(params.unitNumber);
    const lectureCount = await Lecture.countDocuments({ unitNumber: unitNum });

    return NextResponse.json({ unitNumber: unitNum, lectureCount });
  } catch (err) {
    console.error("Error fetching lecture count:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
