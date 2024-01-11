import { PostgreSqlContainer } from "@testcontainers/postgresql"
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
    seq = new Sequelize({
        dialect: 'postgres',
        database: 'DATING_DB',
        host: '172.18.0.2',
        port: 5433,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    });
}