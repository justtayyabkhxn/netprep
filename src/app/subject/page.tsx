"use client";

import Link from "next/link";
import { GraduationCap, Lightbulb } from "lucide-react";

export default function SubjectLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md w-full bg-zinc-800/60 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-zinc-700">

        

        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
          📚 Start Your NET JRF Journey
        </h1>
        <p className="text-zinc-400 text-sm">
          Choose a paper to begin tracking and completing your syllabus effectively.
        </p>

        <div className="flex flex-col justify-center gap-4 mt-6">
          <Link
            href="/subject/p1"
            className="flex items-center justify-center gap-2 bg-yellow-400 text-black font-semibold py-3 px-5 rounded-xl hover:bg-yellow-300 shadow transition-transform hover:scale-105"
          >
            <Lightbulb className="w-5 h-5" />
            Paper I - General Aptitude
          </Link>

          <Link
            href="/subject/cs"
            className="flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold py-3 px-5 rounded-xl hover:bg-purple-500 shadow transition-transform hover:scale-105"
          >
            <GraduationCap className="w-5 h-5" />
            Paper II - Computer Science
          </Link>
        </div>
      </div>
    </div>
  );
}
