const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');
const router = Router();
const axios = require('axios');
const API_URL = 'https://api.rawg.io/api/games';

router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        if (!name) {
            const apiGames = await axios.get(`${API_URL}?key=${process.env.API_KEY}`);
            const apiGames2 = await axios.get(`${API_URL}?key=${process.env.API_KEY}&page=2`);
            const apiGames3 = await axios.get(`${API_URL}?key=${process.env.API_KEY}&page=3`);
            const apiGames4 = await axios.get(`${API_URL}?key=${process.env.API_KEY}&page=4`);

            const promisedGames = await Promise.all([apiGames, apiGames2, apiGames3, apiGames4]);
            
            const apiResults = promisedGames.map((game) => game.data.results);
            const flatApiResults = apiResults.flat();
            const allApiGames = flatApiResults.map((game) => {
                return {
                    id: game.id,
                    name: game.name,
                    genres: game.genres.map(genre => genre.name),
                    image: game.background_image,
                }
            });

            const dbResult = await Videogame.findAll({
                include: {
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            })

            const gamesDb = dbResult.map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    genres: game.genres.map(genre => genre.name),
                    image: game.image,
                }
            })

            const allGames = allApiGames.concat(gamesDb)
            return res.status(200).json(allGames);

        } else {
            const apiResult = await axios.get(`${API_URL}?key=${process.env.API_KEY}&search=${name}`);
            const apiResult2 = await axios.get(`${API_URL}?key=${process.env.API_KEY}&search=${name}&page=2`);
            const apiResult3 = await axios.get(`${API_URL}?key=${process.env.API_KEY}&search=${name}&page=3`);
            const apiResult4 = await axios.get(`${API_URL}?key=${process.env.API_KEY}&search=${name}&page=4`);

            const promisedGames = await Promise.all([apiResult, apiResult2, apiResult3, apiResult4]);
            
            const apiResults = promisedGames.map((game) => game.data.results);
            const flatApiResults = apiResults.flat();
            const allApiGames = flatApiResults.map((game) => {
                return {
                    id: game.id,
                    name: game.name,
                    genres: game.genres.map(genre => genre.name),
                    image: game.background_image,
                }
            });

            const dbGames = await Videogame.findAll({
                where: {
                    name: name
                },
            })

            const gamesDb = dbGames.map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    genres: game.genres.map(genre => genre.name),
                    image: game.image,
                }
            })

            const allGames = allApiGames.concat(gamesDb);

            if(allGames.length < 1) {
                return res.status(404).send('No games found');
            } else {
                return res.status(200).send(allGames);
            }
        }
    } catch (error) {
        res.status(404).send(error);
    }
});

router.post('/', async (req, res) => {
    const { image, name, genres, description, release_date, rating, platforms } = req.body;

    const newGame = await Videogame.create({
        image,
        name,
        description,
        release_date,
        rating,
        platforms,
        image,
        genres,
    })


    const gameGenres = await Genre.findAll({ 
        where: {
            name: genres
        }
    })

    newGame.addGenres(gameGenres);

    if(!name || !description || !platforms) {
        return res.status(400).json({message: 'Missing fields'})
    } else {
        return res.status(200).json(newGame)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        if(id.length > 8) {
            const game = await Videogame.findByPk(id, {
                include: {
                    model: Genre,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            })

            const gameInfo = {
                id: game.id,
                name: game.name,
                description: game.description,
                release_date: game.release_date,
                rating: game.rating,
                platforms: game.platforms,
                image: game.image,
                genres: game.genres.map(genre => genre.name),
            }


            if(!game) {
                return res.status(404).json({message: 'Game not found'})
            } else {
                return res.status(200).json(gameInfo)
            }
        } else {
            const response = await axios.get(`${API_URL}/${id}?key=${process.env.API_KEY}`)
            const game = response.data;

            const gameDetail = {
                id: game.id,
                name: game.name,
                description: game.description_raw,
                release_date: game.released,
                rating: game.rating,
                platforms: game.platforms.map(platform => platform.platform.name),
                genres: game.genres.map(genre => genre.name),
                image: game.background_image ? game.background_image : game.background_image_additional,
            }
    
            if(!game) {
                return res.status(404).json({message: 'Game not found'})
            } else {
                return res.status(200).json(gameDetail)
            }
        }
    } catch (error) {
        res.status(404).send(error)
    }
});

module.exports = router;