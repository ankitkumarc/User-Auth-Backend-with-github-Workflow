const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Replace with your actual secret key

const requireLogin = (req, res, next) => {
    const token = req.headers['auth-token'];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
};

module.exports = { requireLogin };
