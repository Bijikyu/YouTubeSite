// This file defines the routes for handling likes and dislikes on videos and comments.
// It includes routes to get likes/dislikes, add a like/dislike, and remove a like/dislike.

const express = require('express'); // Importing the express module for routing
const router = express.Router(); // Creating a new router object to handle requests
const { Like } = require("../models/Like"); // Importing the Like model
const { Dislike } = require("../models/Dislike"); // Importing the Dislike model

// Route to get the likes for a video or comment
router.post('/getLikes', (req, res) => {
   
    let variable = {} // Initialize an empty object to hold the query parameters
    
    if(req.body.videoId){ // Check if the request body has a videoId
        variable = {videoId: req.body.videoId} // Set the query parameter to videoId from the request body
    }else{ // If videoId is not present, it means we are dealing with a commentId
        variable = {commentId: req.body.commentId} // Set the query parameter to commentId from the request body
    }

    Like.find(variable) // Query the Like model with the specified parameters
    .exec((err, likes)=>{ // Execute the query
        if(err){ // If there is an error during the query
            return res.status(400).send(err) // Send a 400 status code with the error
        }res.status(200).json({success:true, likes}) // Send a 200 status code with the likes if successful
    })
})

// Route to get the dislikes for a video or comment
router.post('/getDislikes', (req, res) => {
   
    let variable = {} // Initialize an empty object to hold the query parameters
    
    if(req.body.videoId){ // Check if the request body has a videoId
        variable = {videoId: req.body.videoId} // Set the query parameter to videoId from the request body
    }else{ // If videoId is not present, it means we are dealing with a commentId
        variable = {commentId: req.body.commentId} // Set the query parameter to commentId from the request body
    }

    Dislike.find(variable) // Query the Dislike model with the specified parameters
    .exec((err, dislikes)=>{ // Execute the query
        if(err){ // If there is an error during the query
            return res.status(400).send(err) // Send a 400 status code with the error
        }res.status(200).json({success:true, dislikes}) // Send a 200 status code with the dislikes if successful
    })
})

// Route to add a like to a video or comment
router.post('/upLike', (req, res) => {
   
    let variable = {} // Initialize an empty object to hold the query parameters
    
    if(req.body.videoId){ // Check if the request body has a videoId
        variable = {videoId: req.body.videoId, userId:req.body.userId} // Set the query parameters to videoId and userId from the request body
    }else{ // If videoId is not present, it means we are dealing with a commentId
        variable = {commentId: req.body.commentId,  userId:req.body.userId} // Set the query parameters to commentId and userId from the request body
    }

    const like = new Like(variable) // Create a new Like document with the specified parameters

    like.save((err, likeResult)=>{ // Save the new Like document to the database
        if(err){ // If there is an error during saving
            return res.json({success: false, err}) // Send a response with success set to false and the error
        }
    Dislike.findOneAndDelete(variable) // Find a Dislike document with the same parameters and delete it
        .exec((err, disLikeResult)=>{ // Execute the query
            if(err)return res.status(400).json({success:false, err}) // If there is an error, send a 400 status code with the error
            res.status(200).json({success:true}) // Send a 200 status code with success set to true
        })

    })

    
})

// Route to add a dislike to a video or comment
router.post('/upDislike', (req, res) => {
   
    let variable = {} // Initialize an empty object to hold the query parameters
    
    if(req.body.videoId){ // Check if the request body has a videoId
        variable = {videoId: req.body.videoId, userId:req.body.userId} // Set the query parameters to videoId and userId from the request body
    }else{ // If videoId is not present, it means we are dealing with a commentId
        variable = {commentId: req.body.commentId,  userId:req.body.userId} // Set the query parameters to commentId and userId from the request body
    }

    const dislike = new Dislike(variable) // Create a new Dislike document with the specified parameters

    dislike.save((err, dislikeResult)=>{ // Save the new Dislike document to the database
        if(err){ // If there is an error during saving
            return res.json({success: false, err}) // Send a response with success set to false and the error
        }
    Like.findOneAndDelete(variable) // Find a Like document with the same parameters and delete it
        .exec((err, likeResult)=>{ // Execute the query
            if(err)return res.status(400).json({success:false, err}) // If there is an error, send a 400 status code with the error
            res.status(200).json({success:true}) // Send a 200 status code with success set to true
        })

    })

    
})

// Route to remove a like from a video or comment
router.post('/unLike', (req, res) => {
   
    let variable = {} // Initialize an empty object to hold the query parameters
    
    if(req.body.videoId){ // Check if the request body has a videoId
        variable = {videoId: req.body.videoId, userId:req.body.userId} // Set the query parameters to videoId and userId from the request body
    }else{ // If videoId is not present, it means we are dealing with a commentId
        variable = {commentId: req.body.commentId,  userId:req.body.userId} // Set the query parameters to commentId and userId from the request body
    }
    Like.findOneAndDelete(variable) // Find a Like document with the same parameters and delete it
    .exec((err,result)=>{ // Execute the query
        if(err)return res.status(400).json({success:false, err}) // If there is an error, send a 400 status code with the error
        res.status(200).json({success:true}) // Send a 200 status code with success set to true
    })
 
})

// Route to remove a dislike from a video or comment
router.post('/unDisLike', (req, res) => {
   
    let variable = {} // Initialize an empty object to hold the query parameters

    if(req.body.videoId){ // Check if the request body has a videoId
        variable = {videoId: req.body.videoId, userId:req.body.userId} // Set the query parameters to videoId and userId from the request body
    }else{ // If videoId is not present, it means we are dealing with a commentId
        variable = {commentId: req.body.commentId,  userId:req.body.userId} // Set the query parameters to commentId and userId from the request body
    }
    Dislike.findOneAndDelete(variable) // Find a Dislike document with the same parameters and delete it
    .exec((err,result)=>{ // Execute the query
        if(err)return res.status(400).json({success:false, err}) // If there is an error, send a 400 status code with the error
        res.status(200).json({success:true}) // Send a 200 status code with success set to true
    })
 
})

module.exports = router; // Export the router to be used in other parts of the application