const router = require('express').Router();
const userRoutes = require('./userRoutes');
const cacheRoutes = require('./cacheRoutes')

router.use('/user', userRoutes);
router.use('/cache', cacheRoutes);

module.exports = router;