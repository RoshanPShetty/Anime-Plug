const mongoose = require("mongoose");
const yup = require("yup");

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const validateAnime = (anime) => {
  const schema = yup.object().shape({
    title: yup.string().required(),
    source: yup.string().required(),
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
