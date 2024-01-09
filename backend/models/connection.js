import { Sequelize } from "sequelize";
import 'dotenv/config.js';

export { seq };

const seq = new Sequelize({
    dialect: 'postgres',
    host: 'postgres_container',
    database: 'DATING_DB',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

seq.sync()