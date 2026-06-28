import express from "express";
import cors from "cors";

import authRoute from "./routes/auth.route.js";

import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoute);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// error middleware
app.use("", errorMiddleware);

export default app;
