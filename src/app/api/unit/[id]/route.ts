import { connectDB } from "@/lib/db";
import { Unit } from "@/models/Unit";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  try {
    await connectDB();
    const unit = await Unit.findById(params.id);
    if (!unit) {
      return NextResponse.json({ message: "Unit not found" }, { status: 404 });
    }
    return NextResponse.json(unit);
  } catch (error) {
    console.error("Error fetching unit:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
