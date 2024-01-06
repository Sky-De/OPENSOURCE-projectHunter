import { seq } from "./index.js";
import { Sequelize } from "sequelize";

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
    email: {
        type: Sequelize.STRING(30),
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
    bio: {
        type: Sequelize.STRING(300),
    },
    city: {
        type: Sequelize.STRING(30),
    },
    occupation: {
        type: Sequelize.STRING(30),
    },
    gender: {
        type: Sequelize.STRING(1),
        allowNull: false,
    },
    preferences: {
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
    distance: {
        type: Sequelize.INTEGER,
    },
});

/*
    * 8 characters or more
    * At least one special character !@#$%^&*()_+
    * At least one capital letter
    * At least one number
    
    Username unique
    input validate everything here
    email verification
*/