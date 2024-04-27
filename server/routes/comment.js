// Express router setup for comment-related routes
const express = require('express'); // Require the express module
const router = express.Router(); // Create a new router object to handle routes
const { Comment } = require("../models/Comment"); // Destructure the Comment model from the models/Comment file

// Route to save a new comment
router.post('/saveComment', (req, res) => { // Define a POST route for saving a comment
    const comment = new Comment(req.body) // Create a new Comment instance with the request body

    comment.save((err, comment)=>{ // Save the comment to the database
        if(err){ // Check if there is an error during save
            return res.json({success: false, err}) // Return a JSON response with success false and the error
        }
        Comment.find({'_id':comment._id}) // Find the saved comment by its ID
        .populate('writer') // Populate the 'writer' field of the comment
        .exec((err,result)=>{ // Execute the query
            if(err){ // Check if there is an error during query execution
                return res.json({success: false, err}) // Return a JSON response with success false and the error
            }res.status(200).json({success:true, result}) // Return a JSON response with success true and the populated comment
        })
    })
})

// Route to get comments for a specific post
router.post('/getComments', (req, res) => { // Define a POST route for getting comments
    Comment.find({"postId": req.body.videoId}) // Find comments with the postId equal to the videoId from the request body
    .populate('writer') // Populate the 'writer' field of the comments
    .exec((err, comments) => { // Execute the query
        if(err){ // Check if there is an error during query execution
            return res.status(400).send(err) // Return a 400 status code with the error
        }res.status(200).json({success:true, comments}) // Return a 200 status code with success true and the comments
    })
})

module.exports = router; // Export the router for use in other parts of the application