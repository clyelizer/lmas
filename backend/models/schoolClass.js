const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SchoolClass = sequelize.define('SchoolClass', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'school_classes',
  timestamps: false,
});

module.exports = SchoolClass;
