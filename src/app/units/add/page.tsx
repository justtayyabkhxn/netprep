"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddUnitPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    lectures: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { title, lectures } = form;
      const res = await axios.post("/api/units/add", {
        title,
        lectures: parseInt(lectures),
      });

      if (res.status === 201) {
        setMessage("✅ Unit created successfully!");
        router.push("/subject/cs");
      } else {
        setMessage(res.data.message || "Something went wrong.");
      }
    } catch (err: any) {
      setMessage(err?.response?.data?.message || "Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">➕ Add New Unit</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          

          <div>
            <label className="block mb-1">Unit Title</label>
            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-600"
            />
          </div>

          <div>
            <label className="block mb-1">No. of Lectures</label>
            <input
              type="number"
              name="lectures"
              required
              value={form.lectures}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Create Unit"}
          </button>

          {message && <p className="mt-4 text-sm text-yellow-400">{message}</p>}
        </form>
      </div>
    </div>
  );
}
