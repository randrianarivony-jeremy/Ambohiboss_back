import { Schema, model } from "mongoose";

const JobSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    description: String,
    opening: Number,
  },
  { timestamps: true }
);

export const jobModel = model("job", JobSchema);
