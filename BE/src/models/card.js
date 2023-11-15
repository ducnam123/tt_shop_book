import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    card_holder_name: {
      type: String,
      required: true,
    },
    card_number: {
      type: String,
      required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
      type: String,
      required: true,
    },
    cvv: {
      type: Number,
      required: true,
    },
    main: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Card", cardSchema);