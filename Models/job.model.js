const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("job", JobSchema);
