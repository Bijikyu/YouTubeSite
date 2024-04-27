// Middleware to authenticate user by token stored in cookies
const { User } = require('../models/User'); // Import the User model

let auth = (req, res, next) => { // Define the auth middleware function
  let token = req.cookies.w_auth; // Retrieve the token from the cookies

  // Use the User model's findByToken method to validate the user
  User.findByToken(token, (err, user) => {
    if (err) throw err; // If an error occurs, throw the error
    if (!user) // If no user is found with the token
      return res.json({ // Respond with JSON indicating the user is not authenticated
        isAuth: false,
        error: true
      });

    req.token = token; // Attach the token to the request object
    req.user = user; // Attach the user object to the request object
    next(); // Call the next middleware function in the stack
  });
};

module.exports = { auth }; // Export the auth middleware function