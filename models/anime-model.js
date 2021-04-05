const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
    sources: {
        type: Array,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true  
    },

    episodes: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    },
    year: {
            type: Number,
            required: true
    },

    synonyms: {
        type: Array,
        required: true
    },

    tags: {
        type: Array,
        required: true
    },

    rating: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Anime', animeSchema)