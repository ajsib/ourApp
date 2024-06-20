// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.register = async (req, res) => {
  const { email, firstName, lastName, password, role, birthday } = req.body;
  const profilePicture = req.file ? req.file.path : null;

  let parsedBirthday = null;
  if (birthday) {
    const [day, month, year] = birthday.split('/');
    parsedBirthday = new Date(year, month - 1, day);
    if (isNaN(parsedBirthday)) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role,
      birthday: parsedBirthday,
      profilePicture,
    });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: 'Error creating user' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error('User not found');
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Invalid password');
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};
