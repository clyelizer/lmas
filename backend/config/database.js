const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_URL || 'school.db',
  logging: false, // Désactiver les logs SQL pour la production
});

module.exports = sequelize;
