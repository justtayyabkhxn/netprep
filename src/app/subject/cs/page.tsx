"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, BookOpen, PlayCircle } from "lucide-react";
import axios from "axios";

type Unit = {
  _id: string;
  title: string;
  lectures: number;
};

type UnitProgress = {
  [unitId: string]: number; // completed lectures count
};

export default function CSSubjectPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<UnitProgress>({});

  useEffect(() => {
    const getUnits = async () => {
      try {
        const res = await axios.get("/api/units");
        setUnits(res.data);
        calculateProgress(res.data);
      } catch (error) {
        console.error("Failed to fetch units:", error);
      } finally {
        setLoading(false);
      }
    };

    const calculateProgress = (units: Unit[]) => {
      const data: UnitProgress = {};
      units.forEach((unit) => {
        let done = 0;
        for (let i = 1; i <= unit.lectures; i++) {
          const key = `unit-${unit._id}-lecture-${i}`;
          if (localStorage.getItem(key) === "true") {
            done++;
          }
        }
        data[unit._id] = done;
      });
      setProgress(data);
    };

    getUnits();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="text-purple-400 w-7 h-7" />
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Computer Science
          </h1>
        </div>

        <Link
          href="/units/add"
          className="inline-block mb-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          ➕ Add New Unit
        </Link>

        {loading ? (
          <p className="text-zinc-400">Loading units...</p>
        ) : units.length === 0 ? (
          <p className="text-zinc-400">No units found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit, index) => {
              const completed = progress[unit._id] || 0;
              const percent = Math.round((completed / unit.lectures) * 100);

              return (
                <Link
                  key={unit._id}
                  href={`/unit/${unit._id}`}
                  className="group border border-zinc-700 rounded-2xl p-5 bg-zinc-800 hover:bg-zinc-700 hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-xl"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <BookOpen className="text-indigo-400 w-6 h-6 mt-1" />
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Unit {index + 1}
                      </h2>
                      <p className="text-zinc-300 text-sm">{unit.title}</p>
                    </div>
                  </div>

                  <div className="mt-3 mb-2 text-sm text-zinc-400 flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" />
                    <span>
                      {unit.lectures} Lecture{unit.lectures !== 1 && "s"} —{" "}
                      {completed} done
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-zinc-700 rounded-full mt-2">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
