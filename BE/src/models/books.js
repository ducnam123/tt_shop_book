import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;
const bookSchema = new Schema(
  {
    name: {
      type: String,
    },
    price: Number,
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true, versionKey: false }
);
bookSchema.plugin(mongoosePaginate);

export default mongoose.model("Book", bookSchema);