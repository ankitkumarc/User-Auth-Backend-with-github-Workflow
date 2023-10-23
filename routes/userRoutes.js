// routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');
const { requireLogin } = require('../middleware/authenticationMiddleware');
const rateLimiter = require('../middleware/rateLimiterMiddleware');

const router = express.Router();

// Apply rate limiting to all routes in this router
router.use(rateLimiter);

// RESTful naming conventions
router.get('/', requireLogin, UserController.getAllUsers);
router.get('/:userId', requireLogin, UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:userId', requireLogin, UserController.updateUser);
router.delete('/:userId', requireLogin, UserController.deleteUser);

module.exports = router;
