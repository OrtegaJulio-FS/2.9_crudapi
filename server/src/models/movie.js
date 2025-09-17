import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
