const express = require("express");
const router = express.Router();
const { Anime, validateAnime } = require("../models/anime-model");

// POST: CREATING AN ANIME IN THE DATABASE
router.post("/", async (req, res) => {
  const err = await validateAnime(req.body);
  if (err.message) res.status(400).send(err.message);

  const nanime = new Anime({
    title: req.body.title,
    source: req.body.source,
    rating: req.body.rating,
  });

  try {
    const newAnime = await nanime.save();
    res.status(201).json(newAnime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET: GETTING ALL THE ANIME
router.get("/", (req, res) => {
  Anime.find()
    .then((anime) => res.send(anime))
    .catch((err) => {
      res.status(500).send({ message: "Something went wrong" });
    });
});

// GET: GETTING ONE ANIME BASED ON ITS ID
router.get("/:id", async (req, res) => {
  const anime = await Anime.findById(req.params.id);
  if (!anime) {
    res.status(404).json({ message: "Anime not found" });
  }
  res.send(anime);
});

// PUT: UPDATING AN ANIME BASED ON ITS ID
router.put("/:id", async (req, res) => {
  const updateAnime = await Anime.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      source: req.body.source,
      rating: req.body.rating,
    },
    { new: true }
  );

  if (!updateAnime) {
    res.status(404).json({ message: "Anime not found" });
  }
  res.send(updateAnime);
});

// DELETE: DELETING AN ANIME BASED ON ITS ID
router.delete("/:id", async (req, res) => {
  const anime = await Anime.findByIdAndRemove(req.params.id);
  if (!anime) {
    res.status(404).json({ message: "Anime not found" });
  }
  res.send(anime);
});

module.exports = router;
