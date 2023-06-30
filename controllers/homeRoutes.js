const router = require('express').Router();
const { User, Caches } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
      const cacheData = await Caches.findAll(
          {include: {model: User}}
      );

      const caches = cacheData.map((caches) =>
      caches.get({ plain: true })
      );

      res.render('homepage', {
          caches,
          logged_in: req.session.logged_in
      });

  } catch (err) {
    console.log(err);
      res.status(500).json(err);
  }
});

// //GET homepage 
// router.get('/', async (req, res) => {
//   res.render('homepage', {logged_in: req.session.logged_in});
// });

// // router.get('/login', (req, res) => {
// //   // If the user is already logged in, redirect the request to another route
// //   if (req.session.logged_in) {
// //     res.redirect('/homepage', { 
// //       logged_in: req.session.logged_in 
// //     });
// //     return;
// //   }

// //   res.render('login');
// // });

//GET profile page
router.get('/profile', withAuth, async (req, res) => {
  res.render('profile', {logged_in: req.session.logged_in})
});

//GET all caches for testing purposes

module.exports = router;