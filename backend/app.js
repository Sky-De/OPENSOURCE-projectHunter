import cors from "cors";
import express from "express";
// import pkg from "pg";
// const { Client } = pkg;
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:", // Use an in-memory database
});

// Define a User model
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync the model with the database
sequelize.sync();
// const pool = new Client({
//   user: "root",
//   host: "172.19.0.2",
//   database: "test_db",
//   password: "root",
//   port: 5432,
// });
// await pool.connect();
const app = express();
const port = 4000;

const corsOptions = {
  // origin:'https://abc.onrender.com',
  AccessControlAllowOrigin: "*",
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));
app.use(express.json());

// const createTableQuery = `CREATE TABLE IF NOT EXISTS user_table (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL
//     );`;
app.get("/user", async (req, res) => {
  // Returns user information
  //   const client = await pool.connect();
  res.json({ message: "Getting user" });
  //   const result = await client.query(createTableQuery);
});

app.post("/user", async (req, res) => {
  // Creates an account
  //   const insertUserQuery = `INSERT INTO user_table (username, password)
  //     VALUES ($1, $2)
  //     RETURNING *;`;
  const data = req.body;
  const user = await User.create({
    name: data.user,
  });
  res.json(user);
  //   const rdata = await pool.query(insertUserQuery, [
  //     data.username,
  //     data.password,
  //   ]);
});

app.put("/user", async (req, res) => {
  // Login
  const data = req.body;
  res.json({ message: data });
});

app.delete("/user", async (req, res) => {
  // Logout
  res.json({ message: "Logged out..." });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
