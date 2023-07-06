const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class FoundCaches extends Model {}

FoundCaches.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        timefound_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'timesfound',
                key: 'id'
            },
        },
        cache_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'caches',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'foundCaches'
    },
);

module.exports = FoundCaches;