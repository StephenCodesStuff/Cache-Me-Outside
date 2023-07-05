//Creating model for data table to record every instance of a cache being found
//foreign keys for foundcaches and finders, using super many:many relationship between users and foundcaches
//model to keep all finders information for each foundcache, ex. foundcache_id===cache_id, but each "find event" has a different finder/user
//in order to save all past finders of a given cache, each event must be stored as a 'time-found' while the actual NUMBER of times the cache has been found is stored in the value inside 'times-found' column

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TimesFound extends Model { }

TimesFound.init(
    {
        //just the id for the instance that a cache was found
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //actual number of times found
        num_times_found: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        finder_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
            unique: false
        },
        cache_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'caches',
                key: 'id'
            },
        },
        // found_cache_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'foundCaches',
        //         key: 'id'
        //     },
        //     unique: false
        // },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'timesfound'
    },
);

module.exports = TimesFound;