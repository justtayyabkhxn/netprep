"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { CheckCircle, Circle, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Unit = {
  _id: string;
  title: string;
  lectures: number;
};

export default function UnitDetailPage() {
  const { id } = useParams();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const getUnit = async () => {
      try {
        const res = await axios.get(`/api/unit/${id}`);
        setUnit(res.data);
        loadProgress(res.data.lectures);
      } catch (err) {
        console.error("Failed to fetch unit", err);
      } finally {
        setLoading(false);
      }
    };

    const loadProgress = (count: number) => {
      const stored: { [key: number]: boolean } = {};
      for (let i = 1; i <= count; i++) {
        const key = `unit-${id}-lecture-${i}`;
        stored[i] = localStorage.getItem(key) === "true";
      }
      setCompleted(stored);
    };

    getUnit();
  }, [id]);

  const toggleLecture = (n: number) => {
    const key = `unit-${id}-lecture-${n}`;
    const newVal = !completed[n];
    localStorage.setItem(key, newVal.toString());
    setCompleted((prev) => ({ ...prev, [n]: newVal }));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;

  if (loading) return <p className="p-6 text-zinc-300">Loading unit...</p>;
  if (!unit) return <p className="p-6 text-red-400">Unit not found.</p>;

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6 max-w-3xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/subject/cs"
          className="text-sm text-indigo-400 hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Units
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">{unit.title}</h1>
      <p className="text-zinc-400 mb-4">
        {completedCount} of {unit.lectures} lectures completed
      </p>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-zinc-800 rounded-full mb-6">
        <div
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{
            width: `${(completedCount / unit.lectures) * 100}%`,
          }}
        />
      </div>

      <ul className="space-y-3">
        {Array.from({ length: unit.lectures }, (_, i) => {
          const n = i + 1;
          const isDone = completed[n];
          return (
            <li
              key={n}
              className={`flex justify-between items-center px-4 py-3 rounded-xl border transition-all
              ${
                isDone
                  ? "bg-green-800 border-green-500 text-green-100"
                  : "bg-zinc-800 border-zinc-700"
              }`}
            >
              <span className="font-medium">🎥 Lecture {n}</span>
              <button
                onClick={() => toggleLecture(n)}
                className={`text-xl transition ${
                  isDone
                    ? "text-green-300 hover:text-green-200"
                    : "text-zinc-400 hover:text-white"
                }`}
                aria-label={isDone ? "Mark as incomplete" : "Mark as done"}
              >
                {isDone ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
