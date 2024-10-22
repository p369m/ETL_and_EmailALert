import { Parser } from "json2csv";
import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";
import metricsModel from "../models/metrics.model.js";
import dotenv from "dotenv";

dotenv.config();

const reportController = {
  generateCSV: async (req, res) => {
    try {
      const metrics = await metricsModel.find();
      const fields = [
        "totalLeads",
        "totalConverted",
        "totalLost",
        "totalInterested",
        "totalSources",
      ];
      const parser = new Parser({ fields });
      const csv = parser.parse(metrics);

      res.header("Content-Type", "text/csv");
      res.attachment("report.csv");
      res.send(csv);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  generatePDF: async (req, res) => {
    try {
      const metrics = await metricsModel.find();
      const doc = new PDFDocument();
      let buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        res.header("Content-Type", "application/pdf");
        res.attachment("report.pdf");
        res.send(pdfData);
      });

      doc.fontSize(25).text("Metrics Report", { align: "center" });
      doc.text("----------------------");
      metrics.forEach((metric) => {
        doc.text(`Total Leads: ${metric.totalLeads}`);
        doc.text(`Total Converted: ${metric.totalConverted}`);
        doc.text(`Total Lost: ${metric.totalLost}`);
        doc.text(`Total Interested: ${metric.totalInterested}`);
        doc.text(`Total Sources: ${metric.totalSources}`);
        doc.text("----------------------");
      });

      doc.end();
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  sendEmailAlert: async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email: ", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};

export default reportController;
