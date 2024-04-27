// This file defines the Like schema using Mongoose for MongoDB interaction.
// It sets up a Like model to represent likes on comments or videos by users.

const mongoose = require('mongoose'); // Require the mongoose library for MongoDB interaction
const Schema = mongoose.Schema; // Alias for mongoose.Schema for convenience

// Define the likeSchema with fields for userId, commentId, and videoId, including reference to other models
const likeSchema = mongoose.Schema({
    userId:{ // Field to store the ID of the user who liked a comment or video
        type: Schema.Types.ObjectId, // The type is an ObjectId, used for referencing other documents
        ref:'User' // Reference to the User model
    },
    commentId:{ // Field to store the ID of the comment that is liked
        type: Schema.Types.ObjectId, // The type is an ObjectId, used for referencing other documents
        ref:'Comment' // Reference to the Comment model
    },
    videoId:{ // Field to store the ID of the video that is liked
        type:Schema.Types.ObjectId, // The type is an ObjectId, used for referencing other documents
        ref:'Video' // Reference to the Video model
    }
  
}, { timestamps: true }) // Option to automatically add createdAt and updatedAt timestamps to the schema

// Create the Like model from the likeSchema
const Like = mongoose.model( 'Like', likeSchema); // The Like model represents likes in the database

module.exports = { Like } // Export the Like model for use in other parts of the application