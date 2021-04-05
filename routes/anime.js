const express = require('express')
const router = express.Router()
const Anime = require('../models/anime-model')


// Getting all anime
router.get('/', async (req, res) => {
    try {
        const anime = await Anime.find()
        res.json(anime)
    } catch (err) {
        res.status(500).json({message: err.message})        
    }
})
// Getting one
router.get('/:id', getAnime, (req, res) => {
    res.send(res.anime)
})
// Creating one
router.post('/', async (req, res) => {
    const nanime = new Anime({
        sources: req.body.sources,
        title: req.body.title,
        type: req.body.type,
        episodes: req.body.episodes,
        status: req.body.status,
        year: req.body.year,
        synonyms: req.body.synonyms, 
        tags: req.body.tags,
        rating: req.body.rating       
    })

    try {
        const newAnime = await nanime.save()
        res.status(201).json(newAnime)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
    
})

// Updating one
router.patch('/:id', getAnime, async (req, res) => {
    if(req.body.title != null) {
        res.anime.title = req.body.title
    }

    if(req.body.type != null) {
        res.anime.type = req.body.type
    }

    if(req.body.episodes != null) {
        res.anime.episodes = req.body.episodes
    }

    if(req.body.status != null) {
        res.anime.status = req.body.status
    }

    if(req.body.year != null) {
        res.anime.year = req.body.year
    }

    if(req.body.synonyms != null) {
        res.anime.synonyms = req.body.synonyms
    }

    if(req.body.tags != null) {
        res.anime.tags = req.body.tags
    }

    if(req.body.rating != null) {
        res.anime.rating = req.body.rating
    }
    
    try {
        const updateAnime = await res.anime.save()
        res.json(updateAnime)
    } catch (err) {
                
    }
})

// Deleting one
router.delete('/:id', getAnime, async (req, res) => {
    try {
        await res.anime.remove()
        res.json({message: 'Deleted Anime'})
    } catch (err) {
        res.status(500).json({message: err.message})        
    }   
})

// MiddleWare
async function getAnime(req, res, next) {
    try {
        anime = await Anime.findById(req.params.id)
        if(anime == null) {
            return res.status(404).json({message: 'Cannot find anime'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.anime = anime
    next()
}

module.exports = router