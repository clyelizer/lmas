const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(80),
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 80], // Minimum 3 caractères
    },
  },
  password: {
    type: DataTypes.STRING(120),
    allowNull: false,
    validate: {
      len: [6, 120], // Minimum 6 caractères
    },
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['teacher', 'student']], // Rôles valides
    },
  },
  current_class_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Nullable pour les professeurs
  },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User;
