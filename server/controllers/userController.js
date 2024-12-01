const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Description:  Register New User
//Route:        POST - api/users/register
//Access:       Public
const registerUser = (req, res) => {
    User.create(req.body)
        .then( user => res.json({ message: "user successfully registered", user:user}))
        .catch(err => res.status(400).json(err));
}

//Description:  Get All Users
//Route:        GET - api/users/all 
//Access:       Public
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Description:  Get One User By ID
//Route:        GET - api/users/:id
//Access:       Public
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Description:  Update User By ID
//Route:        PUT - api/users/update/:id
//Access:       Private
const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const { password, newPassword, ...updateData } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Validate the entered password
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        // If a new password is provided, hash and update the password
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updateData.password = hashedPassword;
        }
        // Update the user with the provided data
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//Description:  Delete One User By ID
//Route:        DELETE - api/users/delete/:id
//Access:       Private
const deleteUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Description:  Login User
//Route:        DELETE - api/login
//Access:       Public
// const login = async (req, res) => {
const login = async (req, res) => {
    try {
        //checks to see if email exists in db
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'Email not found. Please check your email and try again.' });
        }
        //checks if entered password is correct for email 
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if (!correctPassword) {
            return res.status(400).json({ message: 'Incorrect password. Please check your password and try again.' });
        }
        //if password and email validations pass create a token and sign it
        const userToken = jwt.sign({
            id: user._id,
            Admin: user.isAdmin,
        }, process.env.JWT_KEY);
        //send cookie response to front end if all validations pass without errors
        res.cookie('userToken', userToken, {
            httpOnly: true
        }).json({ message: 'Login Successful!', userToken, userId: user._id, isAdmin: user.isAdmin });
    // catch errors and send error message as json error object to frontend 
    } catch (error) {
        console.error('Login error:', error);

        // Log the error messages
        if (error.response && error.response.data && error.response.data.message) {
            console.error('Error message from backend:', error.response.data.message);
        }
        res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
    }
};

// Description: Logout User
// Route:       POST - api/logout
// Access:      Private
const logoutUser = (req, res) => {
    res.clearCookie('userToken');
    res.status(200).json({message : "Logout Successful!"});
};

module.exports = {
    registerUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    login,
    logoutUser,
}
