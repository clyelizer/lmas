const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const models = require('./models');
const { createDefaultSchoolClasses } = require('./utils/initData');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Synchronisation de la base de données
sequelize.sync({ force: false }).then(async () => {
  await createDefaultSchoolClasses();
  console.log('Base de données synchronisée et données par défaut créées');
}).catch(err => {
  console.error('Erreur de synchronisation:', err);
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
