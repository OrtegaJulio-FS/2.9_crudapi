import { Router } from "express";
import Movie from "../models/movie.js";

const router = Router();
router.get("/", async (_req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ error: "Not found" });
  res.json(movie);
});

router.post("/", async (req, res) => {
  const newMovie = await Movie.create(req.body);
  res.status(201).json(newMovie);
});

router.put("/:id", async (req, res) => {
  const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const deleted = await Movie.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.status(204).end();
});

export default router;
