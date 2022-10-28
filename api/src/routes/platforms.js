const { Router } = require('express');
const router = Router();
const axios = require('axios');


router.get('/', async (req, res) => {

    try {
        const responseApi = await axios.get(`https://api.rawg.io/api/platforms?key=${process.env.API_KEY}`);

        //traer de la api solo el nombre de las paltaformas
        const platformsName = responseApi.data.results.map(p => p.name);

        res.status(200).send(platformsName);

    } catch(err) {
        res.status(404).send(err.message);
    }
})

module.exports = router;