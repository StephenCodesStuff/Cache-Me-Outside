const router = require('express').Router();
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



module.exports = router;