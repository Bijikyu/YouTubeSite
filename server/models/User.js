// This file/module defines a Mongoose schema for a User, including methods for password hashing, token generation, and token verification.

const mongoose = require('mongoose'); // Require the mongoose library
const bcrypt = require('bcrypt'); // Require the bcrypt library for password hashing
const saltRounds = 10; // Define the number of salt rounds for bcrypt
const jwt = require('jsonwebtoken'); // Require the jsonwebtoken library for token handling
const moment = require("moment"); // Require the moment library for date manipulation

// Define the user schema with fields and validation rules
const userSchema = mongoose.Schema({
    name: {
        type:String, // Define name as a string
        maxlength:50 // Set maximum length for name
    },
    email: {
        type:String, // Define email as a string
        trim:true, // Trim whitespace from email
        unique: 1  // Ensure email is unique in the collection
    },
    password: {
        type: String, // Define password as a string
        minglength: 5 // Set minimum length for password
    },
    lastname: {
        type:String, // Define lastname as a string
        maxlength: 50 // Set maximum length for lastname
    },
    role : {
        type:Number, // Define role as a number
        default: 0  // Set default role value
    },
    image: String, // Define image as a string
    token : {
        type: String, // Define token as a string
    },
    tokenExp :{
        type: Number // Define token expiration as a number
    }
})

// Pre-save hook to hash password if it has been modified
userSchema.pre('save', function( next ) {
    var user = this; // Contextual reference to the user document
    
    if(user.isModified('password')){ // Check if password field is modified    
        bcrypt.genSalt(saltRounds, function(err, salt){ // Generate salt for hashing
            if(err) return next(err); // Handle error
    
            bcrypt.hash(user.password, salt, function(err, hash){ // Hash the password with the generated salt
                if(err) return next(err); // Handle error
                user.password = hash // Set the hashed password on the user document
                next() // Continue with saving the document
            })
        })
    } else {
        next() // Continue with saving the document if password is not modified
    }
});

// Method to compare a given password with the hashed password in the database
userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){ // Compare plain password with hashed password
        if (err) return cb(err); // Handle error
        cb(null, isMatch) // Return the result of the comparison
    })
}

// Method to generate a token for the user
userSchema.methods.generateToken = function(cb) {
    var user = this; // Contextual reference to the user document
    var token =  jwt.sign(user._id.toHexString(),'secret') // Sign a token with the user's ID
    var oneHour = moment().add(1, 'hour').valueOf(); // Set token expiration to one hour from now

    user.tokenExp = oneHour; // Assign the token expiration to the user document
    user.token = token; // Assign the generated token to the user document
    user.save(function (err, user){ // Save the user document
        if(err) return cb(err) // Handle error
        cb(null, user); // Return the user document with the token
    })
}

// Static method to find a user by a given token
userSchema.statics.findByToken = function (token, cb) {
    var user = this; // Contextual reference to the user model

    jwt.verify(token,'secret',function(err, decode){ // Verify the token
        user.findOne({"_id":decode, "token":token}, function(err, user){ // Find the user with the decoded ID and token
            if(err) return cb(err); // Handle error
            cb(null, user); // Return the user document
        })
    })
}

const User = mongoose.model('User', userSchema); // Create the User model from the schema

module.exports = { User } // Export the User model