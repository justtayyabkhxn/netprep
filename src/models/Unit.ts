import mongoose from "mongoose";

const UnitSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true }, // ✅ Added
  title: { type: String, required: true },
  lectures: { type: Number, required: true },
});

export const Unit = mongoose.models.Unit || mongoose.model("Unit", UnitSchema);
