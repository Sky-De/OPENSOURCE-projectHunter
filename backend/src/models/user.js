import { Sequelize } from "sequelize";
import { seq } from "./connection.js";

export { User }

const User = seq.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    email: { // Email verification
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    dob: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    gender: { // "M", "F", "GN", "O"
        type: Sequelize.STRING(1),
        allowNull: false,
    },
    pronoun: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    preferences: { // Array of gender values
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
    },
    minAge: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    maxAge: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    bio: {
        type: Sequelize.STRING(300),
    },
    city: { // Autofill option
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    state: {
        type: Sequelize.STRING(30),
        allowNull: false,
    },
    occupation: {
        type: Sequelize.STRING(30),
    },
    distance: { // I want someone this: "City", "State", or "Country"
        type: Sequelize.ARRAY(Sequelize.STRING),
    },
});

seq.sync()