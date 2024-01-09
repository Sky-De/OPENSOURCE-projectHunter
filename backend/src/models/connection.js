import { Sequelize } from "sequelize";
import 'dotenv/config.js';

export { seq };

const seq = new Sequelize({
    dialect: 'postgres',
    database: 'DATING_DB',
    host: process.env.NODE_ENV == 'dev' ? 'postgres_dev' : 'postgres_test',
    port: process.env.NODE_ENV == 'dev' ? 5432 : 5433,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});