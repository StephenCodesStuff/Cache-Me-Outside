//import sequelize, models db tables
const sequelize = require('../config/connection');
const { User, Caches, FoundCaches, TimesFound } = require('../models');
//import seed data for users, caches
const userData = require('./userData.json');
const cacheData = require('./cacheData.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    const caches = await Caches.bulkCreate(cacheData);
    //in order to have caches stored inside the found caches table, they must be found in (and the instance of "finding" recorded inside) the timesfound table

    //declaring empty array for the all timesfound instance objects to be stored, essentially the .json file but dynamically created
    const timesFound = [];

    //creating a random number of timesfound instances; for FUN!!
    //also means seed data will be different everytime db is seeded, makes it more interesting to test/check routes
    timesFound.length = Math.floor(Math.random() * 30 + 1);

    //for loop within that array length to create seed data
    for (let i = 0; i < timesFound.length; i++) {
        timesFound[i] = await TimesFound.create({
            id: i + 1,
            //randomly assigning a user id to each instance
            finder_id: users[Math.floor(Math.random() * users.length)].id,
            //randomly assigning a cache id to each instance
            cache_id: caches[Math.floor(Math.random() * caches.length)].id
        });
    }
    //mapping the timesfound array to extract data
    const timesFoundSeed = timesFound.map((timefind) => timefind.get({ plain: true }));
    console.log(timesFoundSeed, 'u finally done it')

    //now that we have all 'logged' instances of caches being found, we can create the found caches table
    //declaring empty array for foundcaches to store all caches that have been found
    const foundCaches = [];

    //since the times found table is randomized, we don't know how many times a cache has been found and therefore the length of the array
    //find all caches that have been found
    for (const timeFound of timesFound) {
        //find all instances of a cache being found
        const foundCacheData = await TimesFound.findAll({
            where: {
                cache_id: timeFound.cache_id
            }
        });
        //if there are no duplicates, create new found cache entry
        if (foundCacheData.length < 1) {
            console.log('NO DUPLICATES');
           const foundCache = await FoundCaches.create({
                //assign the cache id to the found cache
                cache_id: timeFound.cache_id,
                //assign the timesfound id to the found cache
                last_time_found_id: timeFound.id
            });
            //push the found cache to the found caches array
            foundCaches.push(foundCache);
        } else {
            console.log('DUPLICATES');
            //if there are duplicates, destroy all found cache entries with the same cache id
            await FoundCaches.destroy({
                where: {
                    cache_id: timeFound.cache_id
                }
            });
            //creating fresh entry in found caches table
            const foundCache = await FoundCaches.create({
                cache_id: timeFound.cache_id,
                last_time_found_id: timeFound.id
            });
            foundCaches.push(foundCache);
        }
    }
    //updating the ids of found caches to increment properly (since they are primary keys)
    for (let i = 0; i < foundCaches.length; i++) {
        await FoundCaches.update({
            id: i + 1
        },
            {
                where: {
                    id: foundCaches[i].id
                }
            });
    }
    console.log('updated id for found caches', foundCaches);
    //mapping the found caches array to extract data
    const foundCachesSeed = foundCaches.map((foundCache) => foundCache.get({ plain: true }));

    console.log(foundCachesSeed, 'u finally did it');

    process.exit(0);
};

seedDatabase();