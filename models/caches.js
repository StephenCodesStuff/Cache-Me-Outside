const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Caches extends Model {}

Caches.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        lon: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        hints: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hider_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'caches'
    }
);

module.exports = Caches;