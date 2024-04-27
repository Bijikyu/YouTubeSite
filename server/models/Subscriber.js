// This file defines the Subscriber model using Mongoose for MongoDB interaction.
// It sets up the schema for subscribers, which includes references to the User model.

const mongoose = require('mongoose'); // Require the mongoose library
const Schema = mongoose.Schema; // Alias for mongoose.Schema

// Define the schema for a subscriber, including user references and timestamps
const subscriberSchema = mongoose.Schema({
    userTo:{ // ObjectId reference to the User model for the user being subscribed to
        type: Schema.Types.ObjectId, // Defines the type as an ObjectId
        ref: 'User' // References the 'User' model
    },
    userFrom:{ // ObjectId reference to the User model for the user who is subscribing
        type: Schema.Types.ObjectId, // Defines the type as an ObjectId
        ref: 'User' // References the 'User' model
    }
}, { timestamps: true }) // Enables automatic creation and update timestamps

// Create the Subscriber model from the schema
const Subscriber = mongoose.model('Subscriber', subscriberSchema); // Creates the model from the schema

// Export the Subscriber model
module.exports = { Subscriber } // Exports the Subscriber model for use in other files