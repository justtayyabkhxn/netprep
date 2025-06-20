import Link from "next/link";
import { GraduationCap, ArrowRightCircle } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-900 text-white flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center mb-2">
          <GraduationCap className="w-12 h-12 text-indigo-400" />
        </div>
        <h1 className="text-4xl font-extrabold mb-4">
          🎯 NET JRF Preparation Tracker
        </h1>
        <p className="text-zinc-400 text-lg mb-8">
          Organize, track, and conquer your NET JRF journey. Start with your Computer Science syllabus now.
        </p>

        <Link
          href="/subject"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold transition"
        >
          Go to CS Tracker <ArrowRightCircle className="w-5 h-5" />
        </Link>
      </div>
    </main>
  );
}
