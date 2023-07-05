const router = require('express').Router();
const userRoutes = require('./userRoutes');
const cacheRoutes = require('./cacheRoutes');
const foundCacheRoutes = require('./foundCacheRoutes');

router.use('/user', userRoutes);
router.use('/cache', cacheRoutes);
router.use('/foundcache', foundCacheRoutes);

module.exports = router;