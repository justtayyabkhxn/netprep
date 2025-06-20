import { connectDB } from "@/lib/db";
import { Unit } from "@/models/Unit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const paper = req.nextUrl.searchParams.get("paper");

    if (!paper || (paper !== "paper1" && paper !== "paper2")) {
      return NextResponse.json({ message: "Invalid or missing 'paper' query param" }, { status: 400 });
    }

    const units = await Unit.find({ paper }).sort({ number: 1 });

    const result = units.map((unit) => ({
      _id: unit._id,
      title: unit.title,
      lectures: unit.lectures,
      number: unit.number,
      paper: unit.paper,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Failed to fetch units:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
