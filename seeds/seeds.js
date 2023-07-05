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

    // for(const timeFound of timesFoundData) {
    //     if(!timeFound.found_cache_id) {
    //         let foundCache = await FoundCaches.findByPk(timeFound.cache_id);

    //         await TimesFound.update(
    //             {
    //                 found_cache_id: foundCache.id
    //             },
    //             {
    //                 where: {
    //                     found_cache_id: null
    //                 }
    //             }
    //         );
    //         console.log(timeFound, foundCache, "u done it");

    //     } else {
    //         console.log("u done goofed");
    //     }
    // }



    process.exit(0);
};

seedDatabase();