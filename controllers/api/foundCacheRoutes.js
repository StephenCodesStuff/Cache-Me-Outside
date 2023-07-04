const router = require('express').Router();
const { FoundCaches, User, Caches } = require('../../models');
const withAuth = require('../../utils/auth')

//GET all found caches for test in insomnia
router.get('/', async (req, res) => {
    try {
        const foundCacheData = await FoundCaches.findAll(
            {include: {model: User, Caches}}
        );
    
        const foundCaches = foundCacheData.map((foundCaches) =>
        foundCaches.get({ plain: true })
        );
        console.log("u done it stupid");
        res.status(200).json(foundCaches);
    } catch (err) {
        console.log("u idiot u broke it", err);
        res.status(500).json(err);
    }
});

