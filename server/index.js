import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import "./seed.js"; // Ensure this file exists and is correctly exporting needed functionality
import "./db.js"; // Ensure this file exists and is correctly connecting to the database
import { AdminRouter } from "./routes/auth.js";
import { ProductRouter } from "./routes/product.js";
import cors from "cors";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "token"],
};
app.use(cors(corsOptions));

app.use("/auth", AdminRouter);
app.use("/product", ProductRouter);

// Catch-all route for 404
app.use("*", (req, res) => {
  res.status(404).send("Page not found");
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
