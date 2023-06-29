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
        },
        isFound:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'foundcaches'
    },
);

module.exports = FoundCaches;