const express = require('express');
const router = express.Router();
const Alumni = require('../models/Alumni');

// @route   POST /api/signup
// @desc    Register a new alumni member
router.post('/signup', async (req, res) => {
    try {
        const {
            fullName, email, phoneNumber, degreeBranch,
            graduationYear, rollNumber, dateOfBirth, gender,
            currentLocation, address, currentJob, password,
            additionalDegree, additionalBranch
        } = req.body;

        // Basic validation for required fields
        if (!fullName || !email || !password || !phoneNumber) {
            return res.status(400).json({ msg: 'Please fill in all required fields.' });
        }

        // Check for uniqueness of email and phone number
        let existingUser = await Alumni.findOne({ $or: [{ email: email }, { phoneNumber: phoneNumber }] });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ msg: 'An account with this email already exists.' });
            }
            if (existingUser.phoneNumber === phoneNumber) {
                return res.status(400).json({ msg: 'An account with this phone number already exists.' });
            }
        }
        
        // If a roll number is provided (and is not an empty string), check for its uniqueness
        if (rollNumber && rollNumber.trim() !== '') {
            existingUser = await Alumni.findOne({ rollNumber: rollNumber });
            if (existingUser) {
                return res.status(400).json({ msg: 'An account with this roll number already exists.' });
            }
        }

        // Create a new user instance. If rollNumber is empty, it won't be saved.
        const user = new Alumni({
            fullName, email, phoneNumber, degreeBranch,
            graduationYear, 
            rollNumber: rollNumber || undefined, // Treat empty string as undefined
            dateOfBirth, gender,
            currentLocation, address, currentJob, password,
            additionalDegree, additionalBranch
        });

        // Save the new user to the database
        await user.save();

        res.status(201).json({ msg: 'Registration Successful! Welcome to the Alumni Network.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
