const router = require('express').Router();
const { log } = require('console');
const { Caches, User } = require('../../models');
const withAuth = require('../../utils/auth')


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

//UPDATE cache

//DELETE cache
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const cacheData = await Caches.destroy({
        where: {
          id: req.params.id,
          hider_id: req.session.hider_id,
        },
      });
      if(!cacheData) {
        res.status(404).json({ message: 'No cache found with this id, u idiot!' });
        return;
      }
      console.log(`u deleted cache ${req.params.id} doofus`);
      res.status(200).json(cacheData);
    } catch (err) {
      res.status(500).json(err);
      console.log('u broke it u moron', err);
    }
  });


module.exports = router;