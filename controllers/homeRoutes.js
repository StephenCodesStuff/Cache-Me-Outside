const router = require('express').Router();
const { User, Caches } = require('../models');
const withAuth = require('../utils/auth');

//GET homepage 
router.get('/', async (req, res) => {
  res.render('homepage', { logged_in: req.session.logged_in });
});

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/homepage', { 
//       logged_in: req.session.logged_in 
//     });
//     return;
//   }

//   res.render('login');
// });

//GET profile page
router.get('/profile', withAuth, async (req, res) => {
  res.render('profile', { logged_in: req.session.logged_in })
});

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
    res.render('homepage', { caches, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
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
    res.render('expanded-cache-details', { cache, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;