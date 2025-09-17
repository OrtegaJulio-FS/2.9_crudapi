import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import moviesRouter from "./routes/routes.js";

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("➡️", req.method, req.originalUrl);
  next();
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});
app.use("/api/movies", moviesRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB error:", err));

app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.originalUrl });
});
export default app;
