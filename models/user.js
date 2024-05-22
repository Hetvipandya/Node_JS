const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            maxlength: 32,
        },

        email:{
            type: String,
            required: true,
            trim: true,
            index: {unique:true},
        },

        password:{
            type: String,
            required: true,
        },

        userRole:{
            type: String,
            required: true,
        },
    },
);

module.exports = mongoose.model('User',userSchema)