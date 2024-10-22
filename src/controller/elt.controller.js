import asyncHandler from "../utils/asyncHandler.util.js";
import leadsModel from "../models/leads.model.js";
import metricsModel from "../models/metrics.model.js";
import reportController from "./report.Controller.js";
import dotenv from "dotenv";

dotenv.config();

const etlController = {
  // Extract
  extractLeads: async () => {
    try {
      const leads = await leadsModel.find();
      return leads;
    } catch (error) {
      throw new Error("Error extracting leads: " + error.message);
    }
  },

  // Transform
  transformLeads: (leads) => {
    const transformedMetrics = {
      totalLeads: leads.length,
      totalConverted: leads.filter((lead) => lead.status === "Converted")
        .length,
      totalLost: leads.filter((lead) => lead.status === "Lost").length,
      totalInterested: leads.filter((lead) => lead.status === "Interested")
        .length,
      totalSources: [...new Set(leads.map((lead) => lead.source))].length,
    };
    if (transformedMetrics.totalLost >= 3) {
      reportController.sendEmailAlert(
        process.env.EMAIL_RECEIVER,
        "Alert",
        "More than 3 leads are lost"
      );
    }

    return transformedMetrics;
  },

  loadMetrics: async (metrics) => {
    try {
      // Create or update metrics
      const existingMetrics = await metricsModel.findOne();

      if (existingMetrics) {
        existingMetrics.totalLeads = metrics.totalLeads;
        existingMetrics.totalConverted = metrics.totalConverted;
        existingMetrics.totalLost = metrics.totalLost;
        existingMetrics.totalInterested = metrics.totalInterested;
        existingMetrics.totalSources = metrics.totalSources;
        await existingMetrics.save();
      } else {
        await metricsModel.create(metrics);
      }
    } catch (error) {
      throw new Error("Error loading metrics: " + error.message);
    }
  },

  // ETL process
  runETL: asyncHandler(async (req, res) => {
    try {
      const leads = await etlController.extractLeads();

      const metrics = etlController.transformLeads(leads);

      await etlController.loadMetrics(metrics);

      res.status(200).json({
        status: "success",
        message: "ETL process completed successfully.",
        metrics,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }),
};

export default etlController;
