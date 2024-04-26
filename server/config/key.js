// This module conditionally exports configuration based on the environment.

if (process.env.NODE_ENV === 'production') { // Check if the environment variable NODE_ENV is set to 'production'
    module.exports = require('./prod'); // If in production, export the production configuration
} else {
    module.exports = require('./dev'); // If not in production, export the development configuration
}