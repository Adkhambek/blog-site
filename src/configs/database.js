require("dotenv").config(`${process.cwd()}/.env`);
module.exports = {
    development: {
        host: "localhost",
        port: Number(process.env.PG_PORT),
        username: process.env.PG_USERNAME,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        dialect: "postgres",
        logging: false
    },
    production: {
        url: process.env.PG_CONNECTION_STRING,
        dialect: "postgres",
        logging: false,
        ssl: true,
        dialectOptions: {
            ssl: true
        }
    }
};
