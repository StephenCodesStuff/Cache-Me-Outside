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
        // isFound:{
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false
        // },
        last_time_found_id:{
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue:1,
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
        // finder_id:{
        //     type: DataTypes.INTEGER,
        //     references:{
        //         model: 'user',
        //         key: 'id'
        //     },
        //     defaultValue: null
        // },
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