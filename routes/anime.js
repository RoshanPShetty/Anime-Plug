const express = require("express");
const router = express.Router();
const { Anime, validateAnime } = require("../models/anime-model");

// POST: CREATING AN ANIME IN THE DATABASE
router.post("/", async (req, res) => {
  const err = await validateAnime(req.body);
  if (err.message) res.status(400).send(err.message);

  const nanime = new Anime({
    sources: req.body.sources,
    title: req.body.title,
    type: req.body.type,
    episodes: req.body.episodes,
    status: req.body.status,
    year: req.body.year,
    synonyms: req.body.synonyms,
    tags: req.body.tags,
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
  Anime.find().then((anime) => res.send(anime)).catch((err) => {
    res.status(500).send({ message: "Something went wrong" });
  });

  // GET: GETTING ONE ANIME BASED ON ITS ID
  router.get("/:id", getAnime, (req, res) => {
    res.send(res.anime);
  });

  // PUT: UPDATING AN ANIME BASED ON ITS ID
  router.put("/:id", async (req, res) => {
    const updateAnime = await Anime.findByIdAndUpdate(
      req.params.id,
      {
        sources: req.body.sources,
        title: req.body.title,
        type: req.body.type,
        episodes: req.body.episodes,
        status: req.body.status,
        year: req.body.year,
        synonyms: req.body.synonyms,
        tags: req.body.tags,
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
  router.delete("/:id", getAnime, async (req, res) => {
    try {
      await res.anime.remove();
      res.json({ message: "Anime Deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // MIDDLEWARE
  async function getAnime(req, res, next) {
    try {
      anime = await Anime.findById(req.params.id);
      if (anime == null) {
        return res.status(404).json({ message: "Anime not found" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }

    res.anime = anime;
    next();
  }

  module.exports = router;
