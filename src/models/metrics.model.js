import mongoose, { Schema } from "mongoose";

const MetricsSchema = new Schema(
  {
    totalLeads: {
      type: Number,
      required: true,
      default: 0,
    },
    totalConverted: {
      type: Number,
      required: true,
      default: 0,
    },
    totalLost: {
      type: Number,
      required: true,
      default: 0,
    },
    totalInterested: {
      type: Number,
      required: true,
      default: 0,
    },
    totalSources: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Metrics", MetricsSchema);
