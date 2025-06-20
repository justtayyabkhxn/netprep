import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Unit } from "@/models/Unit";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, lectures, paper, number } = body;

    if (
      typeof title !== "string" ||
      typeof lectures !== "number" ||
      typeof paper !== "string" ||
      typeof number !== "number" ||
      (paper !== "paper1" && paper !== "paper2")
    ) {
      return NextResponse.json({ message: "Invalid or missing fields" }, { status: 400 });
    }

    // ✅ Convert user input unit number to 101, 201, etc.
    const unitNumber = paper === "paper1" ? 100 + number : 200 + number;

    // ✅ Check for duplicate unit
    const unitExists = await Unit.findOne({ number: unitNumber, paper });
    if (unitExists) {
      return NextResponse.json({ message: `Unit ${number} already exists in ${paper}` }, { status: 409 });
    }

    // ✅ Save new unit with modified number
    await new Unit({
      number: unitNumber,
      title,
      lectures,
      paper,
    }).save();

    return NextResponse.json({ message: "✅ Unit created successfully." }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating unit:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
