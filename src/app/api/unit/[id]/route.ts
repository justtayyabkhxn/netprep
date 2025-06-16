import { connectDB } from "@/lib/db";
import { Unit } from "@/models/Unit";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    // ✅ Extract the ID manually from the URL
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1];

    const unit = await Unit.findById(id);

    if (!unit) {
      return NextResponse.json({ message: "Unit not found" }, { status: 404 });
    }

    return NextResponse.json(unit);
  } catch (error) {
    console.error("❌ Error fetching unit:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
