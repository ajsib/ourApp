// server.js
const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Test database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ alter: true }); // Use alter to update existing tables
  })
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Serve HTTP
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
