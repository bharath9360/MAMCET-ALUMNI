const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');

// @route   POST /api/signup
// @desc    Register a new alumni member
router.post('/signup', async (req, res) => {
    try {
        const {
            fullName, email, username, phoneNumber, degreeBranch,
            graduationYear, rollNumber, dateOfBirth, gender,
            currentJob, password
        } = req.body;

        // Basic validation
        if (!fullName || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all required fields.' });
        }

        // Check if user already exists
        let user = await Alumni.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'An account with this email already exists.' });
        }

        // Create a new user instance
        user = new Alumni({
            fullName, email, username, phoneNumber, degreeBranch,
            graduationYear, rollNumber, dateOfBirth, gender,
            currentJob, password
        });

        // Save the new user to the database (password will be hashed automatically)
        await user.save();

        res.status(201).json({ msg: 'Sign up successful! Welcome to the network.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
