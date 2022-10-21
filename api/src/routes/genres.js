const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');
const router = Router();
const axios = require('axios');
const API_URL = 'https://api.rawg.io/api/genres';

router.get('/', async (req, res) => {

    try {
        const responseApi = await axios.get(`${API_URL}?key=${process.env.API_KEY}`);
    
    const genres = responseApi.data.results

    genres.forEach(async (g) => {
        await Genre.findOrCreate({
            where: {
                name: g.name,
            }
        })
    });

    const genresDb = await Genre.findAll()

    res.status(200).json(genresDb);
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = router;