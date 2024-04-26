// This file/module defines the Mongoose schema for a Video and exports the Video model.

const mongoose = require('mongoose'); // Require the mongoose library
const Schema = mongoose.Schema; // Alias for mongoose.Schema

// Define the schema for a video document
const videoSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId, // Reference to a User document's ObjectId
        ref: 'User' // The referenced model is 'User'
    },
    title: {
        type:String, // Data type for title is a string
        maxlength:50, // Maximum length for title is 50 characters
    },
    description: {
        type: String, // Data type for description is a string
    },
    privacy: {
        type: Number, // Data type for privacy is a number
    },
    filePath : {
        type: String, // Data type for filePath is a string
    },
    catogory: String, // Data type for category is a string (shorthand notation)
    views : {
        type: Number, // Data type for views is a number
        default: 0  // Default value for views is 0
    },
    duration :{
        type: String // Data type for duration is a string
    },
    thumbnail: {
        type: String // Data type for thumbnail is a string
    }
}, { timestamps: true }) // Enable automatic creation of createdAt and updatedAt timestamps

// Create a model from the video schema
const Video = mongoose.model('Video', videoSchema); // The model is named 'Video'

module.exports = { Video } // Export the Video model for use in other files