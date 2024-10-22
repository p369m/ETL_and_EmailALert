import asyncHandler from "../utils/asyncHandler.util.js";
import leadsModel from "../models/leads.model.js";

const getLeads = asyncHandler(async (req, res) => {
  try {
    const leads = await leadsModel.find();
    res.status(200).json({
      status: "success",
      data: leads,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

const feedLeads = asyncHandler(async (req, res) => {
  try {
    const leads = req.body;
    const createdLeads = await leadsModel.create(leads);

    res.status(201).json({
      status: "success",
      data: createdLeads,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

export { getLeads, feedLeads };
