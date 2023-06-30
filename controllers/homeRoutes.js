const router = require('express').Router();
const { User, Caches } = require('../models');
const withAuth = require('../utils/auth');

//GET homepage 
router.get('/', async (req, res) => {
  res.render('homepage', {logged_in: req.session.logged_in});
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
  res.render('profile', {logged_in: req.session.logged_in})
});
module.exports = router;