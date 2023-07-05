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


module.exports = { User, Caches, FoundCaches };