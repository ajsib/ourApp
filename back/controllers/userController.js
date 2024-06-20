// controllers/userController.js
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const Partners = require('../models/Partners');
require('dotenv').config();
const { Op } = require('sequelize');

exports.generateCode = async (req, res) => {
  try {
    const userId = req.user.userId;
    const code = uuidv4();

    await Partners.create({ code, user1Id: userId });

    res.json({ code });
  } catch (error) {
    console.error('Error generating code:', error);
    res.status(500).json({ error: 'Error generating code' });
  }
};

exports.enterCode = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.userId;

    const partnerEntry = await Partners.findOne({ where: { code } });

    if (!partnerEntry || partnerEntry.user2Id) {
      return res.status(404).json({ error: 'Invalid or already used code' });
    }

    // Update the Partners entry to include the second user
    await Partners.update({ user2Id: userId }, { where: { code } });

    res.json({ message: 'Partner connected successfully' });
  } catch (error) {
    console.error('Error connecting partner:', error);
    res.status(500).json({ error: 'Error connecting partner' });
  }
};

exports.checkPartnershipStatus = async (req, res) => {
  try {
    const userId = req.user.userId;

    const partnerEntry = await Partners.findOne({
      where: {
        [Op.or]: [
          { user1Id: userId },
          { user2Id: userId }
        ]
      }
    });

    if (!partnerEntry) {
      return res.json({ isConnected: false });
    }

    const partnerId = partnerEntry.user1Id === userId ? partnerEntry.user2Id : partnerEntry.user1Id;
    res.json({ isConnected: true, partnerId });
  } catch (error) {
    console.error('Error checking partnership status:', error);
    res.status(500).json({ error: 'Error checking partnership status' });
  }
};
