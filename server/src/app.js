import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import moviesRouter from "./routes/movies.js";
import path from "path";
import { fileURLToPath } from "url";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "../../client/dist", "index.html"));
  });
}
app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.originalUrl });
});
export default app;
