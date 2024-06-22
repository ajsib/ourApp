// authController.js

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/User');
const Partners = require('../models/Partners');
require('dotenv').config();

const generateTokens = (user) => {
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { token, refreshToken };
};

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

    const { token, refreshToken } = generateTokens(user);
    res.json({ token, refreshToken, userId: user.id });
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(403).json({ error: 'Access denied, token missing!' });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findByPk(payload.userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    const { token, refreshToken: newRefreshToken } = generateTokens(user);
    res.json({ token, refreshToken: newRefreshToken });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

exports.deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check and handle partnerships
    const partnerships = await Partners.findAll({
      where: {
        [Op.or]: [{ user1Id: user.id }, { user2Id: user.id }]
      }
    });

    for (const partnership of partnerships) {
      if (partnership.user2Id === user.id) {
        // User is user2, set user2Id to null
        partnership.user2Id = null;
      } else if (partnership.user1Id === user.id && partnership.user2Id) {
        // User is user1 and user2 exists, switch user2 to user1 and set user2 to null
        partnership.user1Id = partnership.user2Id;
        partnership.user2Id = null;
      } else if (partnership.user1Id === user.id) {
        // User is user1 and user2 is null, delete partnership
        await partnership.destroy();
        continue;
      }
      await partnership.save();
    }

    // Delete the profile picture from the server if it exists
    if (user.profilePicture) {
      const filePath = path.join(__dirname, '..', user.profilePicture); // Adjust the path according to your server structure
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting profile picture:', err);
          return res.status(500).json({ error: 'Failed to delete profile picture' });
        }
      });
    }

    // Delete the user record
    await user.destroy();
    res.status(200).json({ message: 'User and profile picture deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};
