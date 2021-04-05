const mongoose = require("mongoose");
const yup = require("yup");

const animeSchema = new mongoose.Schema({
  sources: {
    type: Array,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  episodes: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  synonyms: {
    type: Array,
    required: true,
  },

  tags: {
    type: Array,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },
});

const validateAnime = (anime) => {
  const schema = yup.object().shape({
    sources: yup.array().required(),
    title: yup.string().required(),
    type: yup.string().required(),
    episodes: yup.number().required(),
    status: yup.string().required(),
    year: yup.number().required(),
    synonyms: yup.array().required(),
    tags: yup.array().required(),
    rating: yup.number().required(),
  });

  return schema
    .validate(anime)
    .then((anime) => anime)
    .catch((err) => {
      return {
        message: err.message,
      };
    });
};

exports.Anime = mongoose.model("Anime", animeSchema);
exports.validateAnime = validateAnime;
