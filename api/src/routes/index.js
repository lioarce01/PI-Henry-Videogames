const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require('./videogames.js');
const genres = require('./genres.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogames);
router.use('/genres', genres);

router.get('/', (req, res) => {
    res.send('Welcome to Videogames API!');
});

router.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'etsa2/build', 'index.html'));
});

module.exports = router;
