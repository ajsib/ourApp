// middleware/authenticate.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    console.error('No token provided');
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.error('Invalid token:', err);
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
