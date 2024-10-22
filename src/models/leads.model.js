import mongoose, { Schema } from "mongoose";

const Lead = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\+?\d{10,15}$/, "Please provide a valid phone number"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Interested", "Converted", "Lost"],
    },
    source: {
      type: String,
      required: true,
      enum: ["Facebook", "Google Ads", "LinkedIn", "Instagram"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", Lead);
