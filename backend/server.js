import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import path from "path";
import express from "express";

// const app = express();

// Serve uploaded files
// app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const server = app.listen(PORT, () => {
  console.log(`VG PHOTOSTUDIO API running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
