import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";

// require("dotenv").config({ path: "./config/.env" });
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
import "./config/db.js";

import connectDB from "./config/db.js";

import jobRoutes from "./Routes/job.routes.js";

const app = express();
app.use(json());

connectDB();

app.use(helmet());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["POST", "GET", "PATCH", "DELETE", "PUT"],
};
app.use(cors(corsOptions));

// //routes
app.use("/api/job", jobRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
