import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  filename: String,
  url: String,
  size: Number,
  createdAt: { type: Date, default: Date.now },
});

export const Media = mongoose.models.Media || mongoose.model("Media", MediaSchema);
