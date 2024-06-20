// routes/auth.js
const express = require('express');
const { register, login, deleteUser } = require('../controllers/authController');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/multer');

router.post('/register', upload.single('profilePicture'), register);
router.post('/login', login);

// Dummy protected route
router.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected route.' });
});

// User deletion route
router.delete('/delete', authenticate, deleteUser);

module.exports = router;
