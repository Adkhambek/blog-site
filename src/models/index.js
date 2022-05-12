const { query } = require("express");
const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../configs/database")[env];
let sequelize;
if (config.url) sequelize = new Sequelize(process.env[config.url], config);
else sequelize = new Sequelize(config.database, config.username, config.password, config);

exports.fetch = async (query, bind) => {
    try {
        [results] = await sequelize.query(query, { bind });
        return results[0];
    } catch (error) {
        console.log(error);
    }
};

exports.fetchAll = async (query, bind) => {
    try {
        [results] = await sequelize.query(query, { bind });
        return results;
    } catch (error) {
        console.log(error);
    }
};
