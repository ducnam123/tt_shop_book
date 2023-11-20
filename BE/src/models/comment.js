import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
    prefer: {
      type: Number,
      default: 0,
    },
    feed_back: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Comment", commentSchema);
