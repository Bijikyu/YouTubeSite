// This file defines the Comment model using Mongoose for MongoDB interaction.
// It includes the schema definition and model creation for comments in a social media context.

const mongoose = require('mongoose'); // Require the mongoose library for MongoDB interaction
const Schema = mongoose.Schema; // Alias for mongoose.Schema for convenience

// Define the schema for a comment, including fields for writer, postId, responseTo, and content
const commentSchema = mongoose.Schema({
    writer:{ // Reference to the User model for the comment writer
       type: Schema.Types.ObjectId, // The data type is an ObjectId, used for referencing other documents
       ref: 'User' // Indicates the referenced model is 'User'
    },
    postId:{ // Reference to the Video model for the post associated with the comment
        type:Schema.Types.ObjectId, // The data type is an ObjectId, used for referencing other documents
        ref:'Video' // Indicates the referenced model is 'Video'
    },
    responseTo:{ // Optional field to indicate if the comment is a response to another user
        type:Schema.Types.ObjectId, // The data type is an ObjectId, used for referencing other documents
        ref: 'User' // Indicates the referenced model is 'User'
    },
    content:{ // The actual text content of the comment
        type:String // The data type is a string
    }
}, { timestamps: true }) // Enable automatic creation and update timestamps for each document

// Create a Mongoose model named 'Comment' using the commentSchema
const Comment = mongoose.model('Comment', commentSchema);

// Export the Comment model for use in other parts of the application
module.exports = { Comment }