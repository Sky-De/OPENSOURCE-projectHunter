import { Sequelize } from "sequelize";
import 'dotenv/config.js';

export { seq };


let seq;
if (process.env.NODE_ENV == 'dev'){
    seq = new Sequelize({
        dialect: 'postgres',
        database: 'DATING_DB',
        host: 'postgres_dev',
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    });
}
else if (process.env.NODE_ENV == 'test'){
    console.log("Using test DB")
    seq = new Sequelize({
        dialect: 'postgres',
        database: 'DATING_DB',
        host: 'localhost',
        port: 5433,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    });
}