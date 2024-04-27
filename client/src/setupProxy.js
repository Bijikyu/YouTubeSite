// This module sets up a proxy middleware for an Express application to redirect API requests to a different server.

const { createProxyMiddleware } = require('http-proxy-middleware'); // Import the createProxyMiddleware function from the http-proxy-middleware package

module.exports = function (app) { // Export a function that takes an Express app as an argument
    app.use( // Use middleware in the Express app
        '/api', // Intercept requests to the '/api' path
        createProxyMiddleware({ // Create a proxy middleware with the specified options
            target: 'http://localhost:5000', // Set the target server to which the proxy will redirect requests
            changeOrigin: true, // Set changeOrigin to true to override the origin of the host header to the target URL
        })
    );
};