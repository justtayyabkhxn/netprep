import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
  name: String,
  code: String, // e.g., 87
  units: [{ type: mongoose.Schema.Types.ObjectId, ref: "Unit" }],
});

export const Subject = mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);
