const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config({ path: "./config/.env" });
require("./config/db.js");

const connectDB = require("./config/db.js");

const jobRoutes = require("./Routes/job.routes");

const app = express();
app.use(express.json());

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