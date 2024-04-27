// This module exports configuration details for connecting to a MongoDB database.

module.exports = { // Exports an object from this module
    mongoURI:process.env.MONGO_URI // Sets the mongoURI property to the value of the MONGO_URI environment variable
}