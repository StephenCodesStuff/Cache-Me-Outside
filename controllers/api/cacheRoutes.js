const router = require('express').Router();
const { Caches, User } = require('../../models');
const withAuth = require('../../utils/auth')

//GET all caches for testing purposes
router.get('/', async (req, res) => {
  try {
      const cacheData = await Caches.findAll(
          {include: {model: User}}
      );

      const caches = cacheData.map((caches) =>
      caches.get({ plain: true })
      );
      res.status(200).json(caches);
  } catch (err) {
    console.log(err);
      res.status(500).json(err);
  }
});

//GET one cache by id
router.get('/:id', async (req, res) => {
  try {
      const cacheData = await Caches.findByPk(req.params.id, {
          include: { model: User },
      });
    
      const cache = cacheData.get({ plain: true });

      res.status(200).json(cache);
  } catch (err) {
      res.status(500).json(err);
  }
});


//CREATE new cache
router.post('/', withAuth, async (req, res) => {
    try {
        const newCache = await Caches.create({
            ...req.body,
            hider_id: req.session.user_id,
          });
      
          res.status(200).json(newCache);
        } catch (err) {
          res.status(400).json(err);
        }
  });



module.exports = router;