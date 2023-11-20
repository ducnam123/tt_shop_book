import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },

    original_price: {
      type: Number,
      require: true
    },

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
    images: [
      {
        url: {
          type: String,
          require: true
        }
      },
    ],
    sold: {
      type: Number,
      require: false,
      default: 0
    },

    start: {
      type: Number,
      require: false
    },
    inventory: {
      type: Number,
      required: false,
    },

    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },

    carts: [{
      type: mongoose.Types.ObjectId,
      ref: "Cart",
    }],

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
    favorites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Favorite",
      },
    ],
  },

  { timestamps: true, versionKey: false }
);
bookSchema.plugin(mongoosePaginate);

export default mongoose.model("Book", bookSchema);