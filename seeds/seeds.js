//import sequelize, models db tables
const sequelize = require('../config/connection');
const { User, Caches, FoundCaches, TimesFound } = require('../models');
//import seed data for users, caches, found caches
const userData = require('./userData.json');
const cacheData = require('./cacheData.json');
const foundCacheData = require('./foundCacheData.json');
const timesFoundData = require('./timesFoundData.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    const users = await User.bulkCreate( userData, {
        individualHooks: true,
        returning: true
    });

    // for (const cache of cacheData) {
    //     await Caches.create({
    //         ...cache,
    //         hider_id: users[Math.floor(Math.random() * users.length)].id
    //     });
    // };
await Caches.bulkCreate(cacheData);

    //foundcaches here
    for (const foundCache of foundCacheData) {
        await FoundCaches.create({
            ...foundCache,
            finder_id: users[Math.floor(Math.random() * users.length)].id,
    });
};
    process.exit(0);
};

seedDatabase();