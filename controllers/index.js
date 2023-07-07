const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

//cheeky workaround to get the put route in the cache api routes to work through handlebars
router.use('/cache/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
