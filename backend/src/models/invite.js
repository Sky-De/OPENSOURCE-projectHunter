import { Sequelize } from 'sequelize';
import { seq } from './connection.js';

export { Invite };

const Invite = seq.define('Invite', {
  username: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  email: {
    // Email verification
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  invite_key: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  expiration: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});
