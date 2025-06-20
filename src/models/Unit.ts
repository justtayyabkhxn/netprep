// @/models/Unit.ts
import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  title: { type: String, required: true },
  lectures: { type: Number, required: true },
  paper: {
    type: String,
    required: true,
    enum: ["paper1", "paper2"],
  },
});

// ✅ Ensure unique combination of `number + paper`
unitSchema.index({ number: 1, paper: 1 }, { unique: true });

export const Unit =
  mongoose.models.Unit || mongoose.model("Unit", unitSchema);
