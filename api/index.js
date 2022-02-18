const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const userRoute = require("./routes/userRoutes");
const globalErrorHandler = require("./controller/errorController");

require("dotenv").config({ path: "./config.env" });

app.use(express.json());
const port = process.env.PORT || 5000;
app.use(cors());

mongoose
  .connect(process.env.DATABASE, {})
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(port, () => {
  console.log(`App running on port ${port}, ${process.env.DATABASE}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
app.listen("3000", () => {
  console.log("Backend is running.");
});

app.use("/api/users", userRoute);
app.use(globalErrorHandler);
