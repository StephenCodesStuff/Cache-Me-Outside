const router = require('express').Router();
const { log } = require('console');
const { Caches, User } = require('../../models');
const withAuth = require('../../utils/auth')

//GET all caches for testing purposes
router.get('/', async (req, res) => {
    try {
        const cacheData = await Caches.findAll(
            {include: {model: User}}
        );

        const dbCaches = cacheData.map((caches) =>
        caches.get({ plain: true })
        );
        res.status(200).json(dbCaches);
    } catch (err) {
      console.log(err);
        res.status(500).json(err);
    }
});

//CREATE new cache
router.post('/', withAuth, async (req, res) => {
    try {
        const newCache = await Caches.create({
            ...req.body,
            hider_id: req.session.hider_id,
          });
      
          res.status(200).json(newCache);
        } catch (err) {
          res.status(400).json(err);
        }
  });



module.exports = router;