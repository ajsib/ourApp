// controllers/userController.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const User = require('../models/User');
const Partners = require('../models/Partners');
const CodeMapping = require('../models/CodeMapping');
require('dotenv').config();
const { Op } = require('sequelize');

// Helper function to generate a 7-character alphanumeric code
function generateAlphanumericCode(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

exports.generateCode = async (req, res) => {
  try {
    const userId = req.user.userId;
    let code;
    let codeExists = true;

    // Ensure the generated code is unique
    while (codeExists) {
      code = generateAlphanumericCode(7);
      const existingCode = await CodeMapping.findOne({ where: { code } });
      if (!existingCode) {
        codeExists = false;
      }
    }

    // Check if the user already has a code
    const userCodeMapping = await CodeMapping.findOne({ where: { userId } });

    if (userCodeMapping) {
      // Update the existing code
      userCodeMapping.code = code;
      await userCodeMapping.save();
    } else {
      // Create a new code mapping
      await CodeMapping.create({ code, userId });
    }

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

    // Find the code entry in the CodeMapping table
    const codeEntry = await CodeMapping.findOne({ where: { code } });

    if (!codeEntry || codeEntry.userId === userId) {
      return res.status(404).json({ error: 'Invalid or already used code' });
    }

    // Create a new partnership between the users
    await Partners.create({ user1Id: codeEntry.userId, user2Id: userId });

    // Delete the code entry from the CodeMapping table
    await codeEntry.destroy();

    // Fetch the partner's user details
    const partner = await User.findByPk(codeEntry.userId, {
      attributes: ['profilePicture', 'firstName', 'lastName']
    });

    const requestingUser = await User.findByPk(userId, {
      attributes: ['profilePicture', 'firstName', 'lastName']
    });

    const createProfileResponse = async (user) => {
      const profilePicturePath = path.join(__dirname, '..', user.profilePicture);
      if (fs.existsSync(profilePicturePath)) {
        const buffer = await sharp(profilePicturePath)
          .resize(500, 500)
          .jpeg({ quality: 80 })
          .toBuffer();
        return buffer;
      } else {
        throw new Error('Profile picture not found');
      }
    };

    const yourProfilePictureBuffer = await createProfileResponse(requestingUser);
    const partnerProfilePictureBuffer = await createProfileResponse(partner);

    res.setHeader('x-your-profile', JSON.stringify({
      firstName: requestingUser.firstName,
      lastName: requestingUser.lastName,
      profilePicture: yourProfilePictureBuffer.toString('base64')
    }));

    res.setHeader('x-partner-profile', JSON.stringify({
      firstName: partner.firstName,
      lastName: partner.lastName,
      profilePicture: partnerProfilePictureBuffer.toString('base64')
    }));

    res.status(200).json({
      yourProfile: {
        firstName: requestingUser.firstName,
        lastName: requestingUser.lastName
      },
      partnerProfile: {
        firstName: partner.firstName,
        lastName: partner.lastName
      }
    });
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
      return res.json({ status: 'not connected' });
    }

    const partnerId = partnerEntry.user1Id === userId ? partnerEntry.user2Id : partnerEntry.user1Id;
    res.json({ status: 'connected', partnerId, partnershipId: partnerEntry.id });
  } catch (error) {
    console.error('Error checking partnership status:', error);
    res.status(500).json({ error: 'Error checking partnership status' });
  }
};
