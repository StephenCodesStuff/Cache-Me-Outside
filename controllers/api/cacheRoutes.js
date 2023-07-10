const router = require('express').Router();
const { Caches, User, TimesFound, FoundCaches } = require('../../models');
const withAuth = require('../../utils/auth')

//GET all caches for testing purposes
router.get('/', async (req, res) => {
  try {
    const cacheData = await Caches.findAll({
      include: {
        model: User,
        attributes: ['id', 'username']
      }
    });

    const caches = cacheData.map((caches) =>
      caches.get({ plain: true }));
    res.status(200).json(caches);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET one cache by id
router.get('/:id', async (req, res) => {
  try {
    const cacheData = await Caches.findByPk(req.params.id, {
      include: [{ model: User }, { model: TimesFound, include: { model: User } }],
    });

    const cache = cacheData.get({ plain: true });

    res.status(200).json(cache);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all caches by User ID
router.get('/user/id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ model: Caches }],
    });

    const user = userData.get({ plain: true });

    res.status(200).json(user);
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

//UPDATE cache aka "finding" cache (by id)
router.put('/:id', withAuth, async (req, res) => {
  try {
    const foundCache = await FoundCaches.findByPk(req.params.id);
    const cache = await Caches.findByPk(req.params.id);
    if (foundCache) {

      const newFind = await TimesFound.create({
        finder_id: req.session.user_id,
        cache_id: req.params.id,
      });

      const foundCacheData = await FoundCaches.update({
        last_time_found_id: newFind.id,
      },
        {
          where: {
            cache_id: req.params.id,
          },
        });

      res.status(200).json(newFind);
    } else if (!foundCache && cache) {

      const newFind = await TimesFound.create({
        finder_id: req.session.user_id,
        cache_id: req.params.id,
      });

      const newFoundCache = await FoundCaches.create({
        cache_id: req.params.id,
        last_time_found_id: newFind.id,
      });

      const cacheData = await Caches.update({
        isFound: true,
      },
        {
          where: {
            id: req.params.id,
          },
        });

      res.status(200).json(newFind);

    } else {
      res.status(404).json({ message: 'No cache found with this id, u idiot!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE cache
router.delete('/:id', withAuth, async (req, res) => {
  try {

    //getting specific cache if user is hider
    const cacheData = await Caches.findByPk(req.params.id, {
      where: {
        hider_id: req.session.user_id,
        }
        });

        if(cacheData){
          await Caches.destroy({
            where: {
              id: req.params.id,
              hider_id: req.session.user_id,
            },
          });
          res.status(200).json({ message: `u deleted cache ${req.params.id} doofus` });

        } else {
          const cache = Caches.findByPk(req.params.id);

          if(cache){ 
            res.status(404).json({ message: 'You can only delete your own caches, dingus!' });
          } else {
            res.status(404).json({ message: 'No cache found with this id!' });
          }
        }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all times found for a specific cache
router.get('/:id/timesfound', async (req, res) => {
  try {
    const timesFoundData = await TimesFound.findAndCountAll({
      where: { cache_id: req.params.id }
    });
    const timesFound = timesFoundData.count;
    res.status(200).json(timesFound);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all finders for a specific cache
router.get('/:id/finders', async (req, res) => {
  try {
    const findersData = await TimesFound.findAll({
      where: { cache_id: req.params.id },
      include: {
        model: User,
        attributes: ['id', 'username']
      }
    });
    const finders = findersData.map((finder) =>
      finder.get({ plain: true })
    );
    res.status(200).json(finders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;