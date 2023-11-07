import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  displayName: {
    type: String,
    default: "Unknown"
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
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
      url: {
        type: String,
        require: true,
      },
    },
  ],
}, { timestamps: true, versionKey: false });

export default mongoose.model("User", userSchema);
