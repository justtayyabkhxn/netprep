import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Unit } from "@/models/Unit";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, lectures } = body;

    if (
      typeof title !== "string" ||
      typeof lectures !== "number"
    ) {
      return NextResponse.json({ message: "Invalid or missing fields" }, { status: 400 });
    }

    const unitExists = await Unit.findOne({ title: new RegExp(`^${title}$`, 'i') });
    if (unitExists) {
      return NextResponse.json({ message: "Unit already exists" }, { status: 409 });
    }

    // ✅ Find max number and assign next
    const lastUnit = await Unit.findOne().sort({ number: -1 });
    const nextNumber = lastUnit ? lastUnit.number + 1 : 1;

    await new Unit({ number: nextNumber, title, lectures }).save();

    return NextResponse.json({ message: "✅ Unit created successfully." }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating unit:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
