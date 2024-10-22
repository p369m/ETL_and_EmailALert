import { Router } from "express";
import { feedLeads, getLeads } from "../controller/lead.controller.js";
import etlController from "../controller/elt.controller.js";
import reportController from "../controller/report.Controller.js";

const leadRouter = Router();

leadRouter.route("/feed").post(feedLeads);
leadRouter.route("/all").get(getLeads);
leadRouter.route("/elt").get(etlController.runETL);
leadRouter.route("/report/csv").get(reportController.generateCSV);
leadRouter.route("/report/pdf").get(reportController.generatePDF);

export default leadRouter;
