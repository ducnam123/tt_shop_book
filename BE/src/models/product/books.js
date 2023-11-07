import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: Number,
    images: [
      {
        url: {
          type: String,
          require: true
        }
      }
    ],

    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    author: {
      type: String,
      require: true
    },

    original_price: {
      type: Number,
      require: true
    },

    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true, versionKey: false }
);
bookSchema.plugin(mongoosePaginate);

export default mongoose.model("Book", bookSchema);