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
        isFound:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        times_found:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        cache_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'caches',
                key: 'id'
            },
        },
        finder_id:{
            type: DataTypes.INTEGER,
            references:{
                model: 'user',
                key: 'id'
            },
            defaultValue: null
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