const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.getAllUser = async(req,res) => {
    try{
        const user = await User.find();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getUser = async(req,res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message:'User not found'});
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.createUser = async(req,res) => {
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        userRole:req.body.userRole,
    });
    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
};

// exports.updateUser = async(req,res) => {
//     try{
//         const user = await User.findById(req.body.id);
//         if(!user) return res.status(404).json({message: "User not found"});

//         user.name = req.body.name;
//         user.email = req.body.email;
//         user.password = req.body.password;
//         user.userRole = req.body.userRole;

//         const updateUser = await item.save();
//         res.status(200).json(updateUser);
//     }
//     catch (error){
//         res.status(400).json({message: error.message});
//     }
// };


exports.updateUser = async (req, res) => {
    try {
        const userId = req.body.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user properties
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        user.userRole = req.body.userRole || user.userRole;

        // Save the updated user
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// exports.deleteUser = async(req,res) => {
//     try{
//         const user = await User.findById(req.params.id);
//         if(!user) return res.status(404).json({message: 'User not Found'});

//         await user.remove();
//         res.status(200).json ({message: "User deleted"});
//     }

//     catch (error){
//         res.status(500).json({message: error.message});
//     }
// };

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.body.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Find the user by ID and delete
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};