// middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ msg: 'No token provided' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(500).json({ msg: 'Failed to authenticate token' });
    }
    req.userId = decoded.id; // or whatever you want to attach to the request
    next();
  });
};

module.exports = { verifyToken };
