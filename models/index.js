const User = require('./users');
const Caches = require('./caches');
const FoundCaches = require('./foundcaches');
const TimesFound = require('./timesFound');

//User can create/hide many caches
User.hasMany(Caches, {
    foreignKey: 'hider_id',
    });

//a cache can only belong to one hider (user)
Caches.belongsTo(User, {
    foreignKey: 'hider_id',
    // onDelete: 'CASCADE' if cache deleted, delete associated child rows
});

//rewriting using timesfound as my through table
//Found caches can have many finders/many finders to many found caches
User.belongsToMany(FoundCaches, {
    through: {
        model: TimesFound,
        unique: false
    },
    //alias name for users as finders
    as: 'finders_of_foundcaches',
});

//foundcaches belongs to many finders, many finders can have many found caches, times found logs all "finding" instances
FoundCaches.belongsToMany(User, {
    through: {
        model: TimesFound,
        unique: false
    },
    //alias for caches found for sequelize
    as: 'foundcaches_of_finders',
});

// //user can find many caches (Finder:many caches)
// User.hasMany(FoundCaches, {
//     foreignKey: 'finder_id'
// });

// //one cache can be found many times (cache:many finders)
// Caches.hasMany(FoundCaches, {
//     foreignKey: 'cache_id'
// });
// //testing if we can cheese this
// FoundCaches.belongsTo(User, {
//     foreignKey: 'finder_id'
// });

// FoundCaches.belongsTo(Caches, {
//     foreignKey: 'cache_id'
// });

// //i fuckiong cheesed it
module.exports = { User, Caches, FoundCaches, TimesFound };