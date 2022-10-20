const { Router } = require('express');
const { Videogame, Genre } = require('../db.js');
const router = Router();
const axios = require('axios');
const API_URL = 'https://api.rawg.io/api/games';

//GET ALL GAMES 

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
                    rating: game.rating,
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
                    rating: game.rating,
                    createdInDb: game.createdInDb,
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
                    rating: game.rating,
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
                    rating: game.rating,
                    createdInDb: game.createdInDb,
                }
            })

            const allGames = allApiGames.concat(gamesDb)

            if(allGames.length < 1) {
                return res.status(404).send({message: 'No games found'});
            } else {
                return res.status(200).send(allGames);
            }
        }
    } catch (error) {
        res.status(404).send(error);
    }
});

//CREATE GAME

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
        return res.status(200).json('Game created');
    }
})

//UPDATE GAME 

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, release_date, rating, platforms, genres, image } = req.body;

    const game = await Videogame.findByPk(id);

    if(!game) {
        return res.status(404).json({message: 'Game not found'});
    } else {
        await game.update({
            name,
            description,
            release_date,
            rating,
            platforms,
            image,
            genres,

        })
        
        return res.status(200).json({message: 'Game updated'});
    }
})

//DELETE GAME

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const game = await Videogame.findByPk(id);

    if(game.createdInDb) {
        await game.destroy();
        return res.status(200).json('Game deleted');
    } else {
        return res.status(400).json('Game not found');
    }
})

//GET GAME BY ID (DETAILS)

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
                createdInDb: game.createdInDb,
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