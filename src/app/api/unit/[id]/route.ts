import { connectDB } from "@/lib/db";
import { Unit } from "@/models/Unit";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    await connectDB();

    // ✅ Extract the ID from the URL
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const id = segments[segments.length - 1];

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid unit ID" }, { status: 400 });
    }

    const unit = await Unit.findById(id);

    if (!unit) {
      return NextResponse.json({ message: "Unit not found" }, { status: 404 });
    }

    // ✅ Return all unit fields
    return NextResponse.json({
      _id: unit._id,
      number: unit.number,
      title: unit.title,
      lectures: unit.lectures,
      paper: unit.paper,
    });
  } catch (error) {
    console.error("❌ Error fetching unit:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
