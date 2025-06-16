import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Unit } from "@/models/Unit";

const units = [
  { number: 1, title: "Discrete Structures and Optimization", lectures: 8 },
  { number: 2, title: "Computer Arithmetic and Digital Logic", lectures: 8 },
  { number: 3, title: "Programming Languages and Computer Graphics", lectures: 17 },
  { number: 4, title: "Data Structures and Algorithms (DAA)", lectures: 10 },
  { number: 5, title: "Database Management Systems (DBMS)", lectures: 17 },
  { number: 6, title: "Operating Systems", lectures: 19 },
  { number: 7, title: "Computer System Architecture (COA)", lectures: 9 },
  { number: 8, title: "Software Engineering", lectures: 10 },
  { number: 9, title: "Computer Networks and Web Technologies", lectures: 16 },
  { number: 10, title: "Theory of Computation, Compilers (TOC)", lectures: 25 },
  { number: 11, title: "Artificial Intelligence (AI)", lectures: 7 },
];

export async function GET() {
  try {
    await connectDB();
    console.log("✅ Connected to DB");

    const existing = await Unit.find();
    if (existing.length > 0) {
      console.log("⚠️ Units already seeded");
      return NextResponse.json({ message: "Units already seeded." });
    }

    for (const unit of units) {
      console.log(`📦 Seeding Unit ${unit.number}: ${unit.title}`);
      await new Unit({ number: unit.number, title: unit.title }).save();

      const lecturesArray = Array.from({ length: unit.lectures }, (_, i) => ({
        unitNumber: unit.number,
        lectureNumber: i + 1,
        title: `Lecture ${i + 1}`,
      }));

      console.log(`✅ Inserted ${unit.lectures} lectures for Unit ${unit.number}`);
    }

    return NextResponse.json({ message: "Seeding completed." }, { status: 201 });
  } catch (err) {
    console.error("❌ Seeding error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

