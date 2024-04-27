// This is an Express router module for handling subscription-related routes.
const express = require('express'); // Require the express module
const router = express.Router(); // Create a new router object to handle route requests
const { Subscriber } = require("../models/Subscriber"); // Destructure the Subscriber model from the models directory

// Route to handle POST request for getting the number of subscriptions to a user
router.post('/subscribeNumber', (req, res) => { // Define a POST route with the path '/subscribeNumber'
    Subscriber.find({'userTo':req.body.userTo}) // Find all Subscriber documents where 'userTo' matches the request body's 'userTo' field
    .exec((err, subscribe) => { // Execute the query
        if(err){ // Check if there is an error
            return res.status(400).send(err) // Send a 400 status code with the error if there is one
        }
        return res.status(200).json({success: true, subscribeNumber:subscribe.length}) // Send a 200 status code with the number of subscriptions
})})

// Route to check if a user is subscribed to another user
router.post('/subscribed', (req, res) => { // Define a POST route with the path '/subscribed'
    Subscriber.find({'userTo':req.body.userTo, 'userFrom': req.body.userFrom}) // Find all Subscriber documents where 'userTo' and 'userFrom' match the request body fields
    .exec((err, subscribe) => { // Execute the query
        if(err)return res.status(400).send(err); // Send a 400 status code with the error if there is one
        let result = false; // Initialize a result variable as false
        if(subscribe.length !== 0){ // Check if the subscription exists
            result = true // Set result to true if the subscription exists
        }
        res.status(200).json({success:true, subscribed: result}) // Send a 200 status code with the subscription status
    })
})

// Route to handle POST request for unsubscribing a user from another user
router.post('/unSubscribe', (req, res) => { // Define a POST route with the path '/unSubscribe'
   Subscriber.findOneAndDelete({  userTo: req.body.userTo ,userFrom: req.body.userFrom}) // Find a single Subscriber document and delete it where 'userTo' and 'userFrom' match the request body fields
    .exec((err, doc)=>{ // Execute the query
        if(err){ // Check if there is an error
            return res.status(400).json({success: false, err}) // Send a 400 status code with the error if there is one
        }
        res.status(200).json({success: true, doc}) // Send a 200 status code with the success status and deleted document
    })
})

// Route to handle POST request for subscribing a user to another user
 router.post('/subscribe', (req, res) => { // Define a POST route with the path '/subscribe'
    const subscribe = new Subscriber(req.body) // Create a new Subscriber document with the request body

    subscribe.save((err, doc)=>{ // Save the new Subscriber document to the database
        if(err){ // Check if there is an error
            return res.json({success:false, err}) // Send a response with the error if there is one
        }
        return res.status(200).json({success: true}) // Send a 200 status code with the success status
    })
 })

module.exports = router; // Export the router for use in other files