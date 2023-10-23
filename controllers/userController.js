// src/controllers/userController.js
const User = require('../models/user');
const authService = require('../services/authServices');

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json({ success: true, users });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },

    getUserById: async (req, res) => {
        const { userId } = req.params;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            res.json({ success: true, user });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },

    createUser: async (req, res) => {
        const { username, password } = req.body;
        try {
            const newUser = await User.create({ username, password });

            // Generate authentication token
            const authToken = authService.generateToken({ userId: newUser._id, username: newUser.username });

            res.json({ success: true, user: newUser, token: authToken });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },

    updateUser: async (req, res) => {
        const { userId } = req.params;
        const { username, password } = req.body;
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { username, password },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            res.json({ success: true, user: updatedUser });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },

    deleteUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            res.json({ success: true, message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
};

module.exports = UserController;
