const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AlumniSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    degreeBranch: { type: String, required: true },
    graduationYear: { type: String, required: true },
    rollNumber: { 
        type: String, 
        unique: true,
        sparse: true // This allows multiple documents to have a null/missing value
    },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    currentLocation: { type: String },
    address: { type: String },
    currentJob: { type: String },
    additionalDegree: { type: String },
    additionalBranch: { type: String },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// This function runs before saving a document to hash the password
AlumniSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Alumni', AlumniSchema);
