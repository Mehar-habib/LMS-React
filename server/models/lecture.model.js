import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    lectureTitle: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    isPreviewFree: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Lecture = mongoose.model("Lecture", lectureSchema);
