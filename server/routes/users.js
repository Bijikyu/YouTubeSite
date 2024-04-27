// This module sets up the user-related routes for an Express application, handling authentication, registration, login, and logout functionalities.

const express = require('express'); // Require the express module
const router = express.Router(); // Create a new router object to handle routes
const { User } = require("../models/User"); // Destructure the User model from the models/User file

const { auth } = require("../middleware/auth"); // Destructure the auth middleware from the middleware/auth file

// Define routes related to user operations such as authentication, registration, login, and logout

router.get("/auth", auth, (req, res) => { // Route to authenticate a user and return their information
    res.status(200).json({ // Respond with a 200 status code and the user's information in JSON format
        _id: req.user._id, // User's unique identifier
        isAdmin: req.user.role === 0 ? false : true, // Determine if the user is an admin based on their role
        isAuth: true, // Authentication status is true
        email: req.user.email, // User's email
        name: req.user.name, // User's name
        lastname: req.user.lastname, // User's last name
        role: req.user.role, // User's role
        image: req.user.image, // User's image
    });
});

router.post("/register", (req, res) => { // Route to register a new user

    const user = new User(req.body); // Create a new User instance with the request body data

    user.save((err, doc) => { // Save the new user to the database
        if (err) return res.json({ success: false, err }); // If there's an error, return a JSON response with success as false and the error
        return res.status(200).json({ // If successful, respond with a 200 status code and a success message
            success: true
        });
    });
});

router.post("/login", (req, res) => { // Route to log in a user
    User.findOne({ email: req.body.email }, (err, user) => { // Find a user by email
        if (!user) // If the user is not found
            return res.json({ // Return a JSON response with login success as false and a message
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => { // Compare the provided password with the stored password
            if (!isMatch) // If the passwords do not match
                return res.json({ loginSuccess: false, message: "Wrong password" }); // Return a JSON response with login success as false and a message

            user.generateToken((err, user) => { // Generate a token for the user
                if (err) return res.status(400).send(err); // If there's an error, send a 400 status code and the error
                res.cookie("w_authExp", user.tokenExp); // Set a cookie for the token expiration
                res
                    .cookie("w_auth", user.token) // Set a cookie for the token
                    .status(200) // Respond with a 200 status code
                    .json({ // And a JSON response with login success as true and the user's ID
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => { // Route to log out a user
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => { // Find the user by ID and update the token and token expiration to empty strings
        if (err) return res.json({ success: false, err }); // If there's an error, return a JSON response with success as false and the error
        return res.status(200).send({ // If successful, respond with a 200 status code and a success message
            success: true
        });
    });
});

module.exports = router; // Export the router for use in other parts of the application