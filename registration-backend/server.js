// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registrationDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define schema for user
const userSchema = new mongoose.Schema({
    username: String,
    fullName: String,
    userID: String,
    emailsId: String,
    gender: String, // Use the same name as in the HTML form
    userType: String
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
// Routes
app.post('/register', async (req, res) => {
    console.log(req.body); // Log the received data
    try {
        const { username, fullName, userID, email, gender, userType } = req.body;
        const newUser = new User({ username, fullName, userID, email, gender, userType });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: "not user backend" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
