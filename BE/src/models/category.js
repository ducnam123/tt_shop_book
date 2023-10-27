import mongoose from "mongoose";
const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    name: {
      type: String,
    },
    books: [{
      type: mongoose.Types.ObjectId,
      ref: "Book",
    }],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Category", categorySchema);