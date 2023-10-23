// src/services/authService.js
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = { generateToken, verifyToken };
