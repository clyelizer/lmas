const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BulletinStructure = sequelize.define('BulletinStructure', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  school_class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  subjects_part1: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  subjects_part2: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'bulletin_structures',
  timestamps: false,
});

module.exports = BulletinStructure;
