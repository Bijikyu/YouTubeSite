// This is an Express server module for a web application that handles routes for users, videos, subscriptions, comments, and likes.
// It also serves static files in production and connects to a MongoDB database.

const express = require("express"); // Require the express module
const app = express(); // Create an instance of express
const path = require("path"); // Require the path module to work with file and directory paths
const cors = require('cors') // Require the cors module to enable Cross-Origin Resource Sharing

const bodyParser = require("body-parser"); // Require the body-parser module to parse incoming request bodies
const cookieParser = require("cookie-parser"); // Require the cookie-parser module to parse cookies attached to the client request object

const config = require("./config/key"); // Require the config module to get the database configuration

// Connect to MongoDB using mongoose
const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...')) // Log success message when connected
  .catch(err => console.log(err)); // Log error if connection fails

app.use(cors()) // Enable all CORS requests

// Middleware to parse request bodies and cookies
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json
app.use(cookieParser()); // Parse cookies

// Define routes for different features of the application
app.use('/api/users', require('./routes/users')); // User-related routes
app.use('/api/video', require('./routes/video')); // Video-related routes
app.use('/api/subscribe', require('./routes/subscribe')); // Subscription-related routes
app.use('/api/comment', require('./routes/comment')); // Comment-related routes
app.use('/api/like',require('./routes/like')); // Like-related routes

// Serve uploaded files as static assets
app.use('/uploads', express.static('uploads')); // Static route for uploaded files

// Serve static assets in production environment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build")); // Serve static files from client/build directory

  app.get("*", (req, res) => { // Serve index.html file for any route
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000 // Set the port to the environment variable or default to 5000

app.listen(port, () => { // Start the server and listen on the specified port
  console.log(`Server Listening on ${port}`) // Log the listening message with the port number
});