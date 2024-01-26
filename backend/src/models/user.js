import { Sequelize } from 'sequelize';
import { seq } from './connection.js';

export { User };

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
  email: {
    // Email verification
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(300),
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
  gender: {
    // "M", "F", "GN", "O"
    type: Sequelize.STRING(2),
    allowNull: false,
  },
  pronoun: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  preferences: {
    // Array of gender values
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
  city: {
    // Autofill option
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
  bio: {
    type: Sequelize.STRING(300),
  },
  distance: {
    // I want someone this: "City", "State", or "Country"
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  pictures: {
    // This will be something like: ["username/original-name1.png", "username/original-name2.jpg", "username/original-name3.jpeg"]
    // We must make sure that this array does not get longer than 6 photos long
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['default.png'],
  },
});
