import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    apply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active",
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Voucher", voucherSchema);