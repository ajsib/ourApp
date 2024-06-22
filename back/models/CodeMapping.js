// models/CodeMapping.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const CodeMapping = sequelize.define('CodeMapping', {
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
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

module.exports = CodeMapping;
