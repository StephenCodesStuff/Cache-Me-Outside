//import sequelize, models db tables
const sequelize = require('../config/connection');
const { User, Caches, FoundCaches } = require('../models');
//import seed data for users, caches, found caches
const userData = require('./userData.json');
const cacheData = require('./cacheData.json');
const foundCacheData = require('./foundCacheData.json');

