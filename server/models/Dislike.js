// This file defines the Dislike schema using Mongoose for MongoDB interactions, and exports the Dislike model.

const mongoose = require('mongoose'); // Require the mongoose library for MongoDB interactions
const Schema = mongoose.Schema; // Create a reference to the Mongoose Schema constructor

// Define the dislikeSchema with fields for userId, commentId, and videoId, and enable timestamps
const dislikeSchema = mongoose.Schema({
    userId:{ // Define a field for the user ID that references the User model
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    commentId:{ // Define a field for the comment ID that references the Comment model
        type: Schema.Types.ObjectId,
        ref:'Comment'
    },
    videoId:{ // Define a field for the video ID that references the Video model
        type:Schema.Types.ObjectId,
        ref:'Video'
    }
  
}, { timestamps: true }) // Enable automatic creation and update timestamps for each document

const Dislike = mongoose.model( 'Dislike', dislikeSchema); // Create the Dislike model from the dislikeSchema

module.exports = { Dislike } // Export the Dislike model for use in other files