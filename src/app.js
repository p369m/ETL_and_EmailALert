import express from "express";
import leadRouter from "./routes/lead.route.js";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/leads", leadRouter);

export default app;
