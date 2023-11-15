import mongoose from "mongoose";

mongoose.models = {};

const userSchema = new mongoose.Schema({
  name: String,
  displayName: {
    type: String,
    default: "Unknown"
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    sparsed: true,
  },
  address: {
    type: String,
    default: "Unknown",
  },
  gender: {
    type: String,
    default: "Unknown",
  },
  isActive: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: "member",
  },
  avatar: [
    {
      url: String,
    }, { _id: false }
  ],

  cart: {
    type: mongoose.Types.ObjectId,
    ref: "Cart",
  },
  payments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Payment",
    },
  ],
  cards: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Card",
    },
  ],
  vouchers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Voucher",
    },
  ],
  orders: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Order",
    },
  ],
  favorites: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Favorite",
    },
  ],
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],

}, { timestamps: true, versionKey: false });

export default mongoose.model("User", userSchema);
