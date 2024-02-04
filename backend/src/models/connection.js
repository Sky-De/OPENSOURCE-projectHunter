import { Sequelize } from 'sequelize';
import 'dotenv/config.js';

export { seq };

let seq;
if (process.env.NODE_ENV == 'dev') {
  seq = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_DB,
    host: 'postgres_dev',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });
} else if (process.env.NODE_ENV == 'test') {
  seq = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_DB,
    host: 'localhost',
    port: 5433,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });
} else {
  // PRODUCTION!!
  seq = new Sequelize({
    dialect: 'postgres',
    database: process.env.DB_DB,
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });
}
