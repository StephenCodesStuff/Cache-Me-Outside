const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const FoundCaches = require('./foundcaches');

class TimesFound extends Model { }
//timesfound table records the instance of a cache being found, like a "find" event
TimesFound.init(
    {
        //id for the instance that a cache was found
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
        found_cache_id: {
            type: DataTypes.INTEGER,
            references: {
                model: FoundCaches,
                key: 'id'
            },
        },
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