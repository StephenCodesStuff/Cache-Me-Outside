const User = require('./users');
const Caches = require('./caches');
const FoundCaches = require('./foundcaches');

//User can create/hide many caches
User.hasMany(Caches, {
    //foreignKey: 'user_id',
    });

//a cache can only have one hider (user)
Caches.belongsTo(User, {
    //foreignKey: 'user_id',
    });

//one cache can many FINDERS> update item
User.hasMany(FoundCaches, {
    foreignKey: 'finder_id'
})

Caches.hasMany(FoundCaches, {
    foreignKey: 'cache_id'
})

module.exports = { User };