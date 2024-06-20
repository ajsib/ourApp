// routes/user.js
const express = require('express');
const { generateCode, enterCode, checkPartnershipStatus } = require('../controllers/userController');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// Route to generate a code
router.post('/generateCode', authenticate, generateCode);

// Route to enter a code
router.post('/enterCode', authenticate, enterCode);

// Route to check partnership status
router.get('/partnershipStatus', authenticate, checkPartnershipStatus);

module.exports = router;
