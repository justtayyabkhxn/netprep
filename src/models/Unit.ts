import mongoose from "mongoose";

const UnitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lectures: { type: Number, required: true }, // 👈 Added this line
});

export const Unit = mongoose.models.Unit || mongoose.model("Unit", UnitSchema);
