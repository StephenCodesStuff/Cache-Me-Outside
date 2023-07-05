//import sequelize, models db tables
const sequelize = require('../config/connection');
const { User, Caches, FoundCaches, TimesFound } = require('../models');
//import seed data for users, caches, found caches
const userData = require('./userData.json');
const cacheData = require('./cacheData.json');
const foundCacheData = require('./foundCacheData.json');
const timesFoundData = require('./timesFoundData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    await Caches.bulkCreate(cacheData);
    await TimesFound.bulkCreate(timesFoundData);
    await FoundCaches.bulkCreate(foundCacheData);

    process.exit(0);
};

seedDatabase();