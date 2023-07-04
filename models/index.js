const User = require('./users');
const Caches = require('./caches');
const FoundCaches = require('./foundcaches');

//User can create/hide many caches
User.hasMany(Caches, {
    foreignKey: 'hider_id',
    });

//a cache can only belong to one hider (user)
Caches.belongsTo(User, {
    foreignKey: 'hider_id',
    // onDelete: 'CASCADE' if cache deleted, delete associated child rows
});

//user can find many caches (Finder:many caches)
User.hasMany(FoundCaches, {
    foreignKey: 'finder_id'
});

//one cache can be found many times (cache:many finders)
Caches.hasMany(FoundCaches, {
    foreignKey: 'cache_id'
});
//testing if we can cheese this
FoundCaches.belongsTo(User, {
    foreignKey: 'finder_id'
});

FoundCaches.belongsTo(Caches, {
    foreignKey: 'cache_id'
});

//i fuckiong cheesed it
// //rewriting using foundcaches as my through table, under current set up hasmany only works if a found cache belongs to a single user and single cache. will not work with a doublejoin on model tables
// User.belongsToMany(Caches, {
//     through: {
//         model: FoundCaches,
//         unique: false
//     },
//     //alias name for users as finders
//     as: 'found_caches',
// });

// //cache belongs to many users
// Caches.belongsToMany(User, {
//     through: {
//         model: FoundCaches,
//         unique: false
//     },
//     //alias for caches found for sequelize
//     as: 'caches_found',
// });

module.exports = { User, Caches, FoundCaches };