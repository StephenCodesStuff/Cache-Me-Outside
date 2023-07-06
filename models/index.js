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
});

//user can find many caches (Finder:many caches)
User.hasMany(FoundCaches, {
    foreignKey: 'finder_id'
});

TimesFound.belongsTo(User, {
    foreignKey: 'finder_id'
    });


//many found caches : many users
FoundCaches.belongsToMany(User, {
    through: TimesFound,
    foreignKey: 'found_cache_id',
    unique: false
    });

User.belongsToMany(FoundCaches, {
    through: TimesFound,
    foreignKey: 'finder_id',
    unique: false
    });


//Found caches can be found many times
FoundCaches.hasMany(TimesFound, {
    foreignKey: 'found_cache_id',
    constraints: false,
    unique: false
    });

TimesFound.belongsTo(FoundCaches, {
    foreignKey: 'found_cache_id',
    unique: false,
    constraints: false
    });


//TimesFound can only be associated with one found cache entry
TimesFound.hasMany(FoundCaches, {
    foreignKey: 'last_time_found_id'
    });

FoundCaches.belongsTo(TimesFound, {
    foreignKey: 'last_time_found_id'
    });


//Caches can be found many times
Caches.hasMany(TimesFound, {
    foreignKey: 'cache_id'
});

TimesFound.belongsTo(Caches, {
    foreignKey: 'cache_id'
    });


module.exports = { User, Caches, FoundCaches, TimesFound };