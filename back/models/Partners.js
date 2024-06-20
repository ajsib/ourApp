// models/Partners.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Partners = sequelize.define('Partners', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user1Id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  user2Id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  }
});

module.exports = Partners;
