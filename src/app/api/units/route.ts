import { connectDB } from "@/lib/db";
import { Unit } from "@/models/Unit";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const units = await Unit.find().sort({ title: 1 }); // or { number: 1 } if you still have it

    const result = units.map((unit) => ({
      _id: unit._id,
      title: unit.title,
      lectures: unit.lectures,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Failed to fetch units:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
