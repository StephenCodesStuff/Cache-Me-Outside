const router = require('express').Router();
const { User, Caches } = require('../models');
const withAuth = require('../utils/auth');

//GET all caches

router.get('/', async (req, res) => {
  try {
    const cacheData = await Caches.findAll(
      { include: { model: User } }
    );

    const caches = cacheData.map((caches) =>
      caches.get({ plain: true })
);
    // res.status(200).json(caches);
    res.render('homepage', { 
      caches, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Caches }],
    });

    const user = userData.get({ plain: true });
    console.log(userData)
    
    console.log(userData.caches)

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new-cache', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Caches }],
    });

    const user = userData.get({ plain: true });
    console.log(userData)
    
    console.log(userData.caches)

    res.render('new-cache', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET one cache by id
router.get('/cache/:id', async (req, res) => {
  try {
    const cacheData = await Caches.findByPk(req.params.id, {
      include: { model: User },
    });

    const cache = cacheData.get({ plain: true });

    // res.status(200).json(cache);
    res.render('expanded-cache-details', { 
      cache, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;