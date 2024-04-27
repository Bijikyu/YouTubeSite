// This file sets up routes for handling video-related operations in an Express application.
// It includes routes for uploading video files, saving video information, retrieving video details,
// and generating thumbnails. It uses middleware for authentication and uses the multer library
// for handling file uploads. The fluent-ffmpeg library is used for video processing tasks.

const express = require('express'); // Require the express module
const router = express.Router(); // Create a new router object to handle routes
const { Video } = require("../models/Video"); // Destructure and require the Video model from the models directory
const {Subscriber} = require("../models/Subscriber") // Destructure and require the Subscriber model from the models directory
const { auth } = require("../middleware/auth"); // Destructure and require the auth middleware from the middleware directory
const multer = require("multer"); // Require the multer module for handling file uploads
var ffmpeg = require("fluent-ffmpeg") // Require the fluent-ffmpeg module for handling video processing

// Configuration for multer storage, specifying the destination and filename for uploaded files
let storage = multer.diskStorage({
    destination: (req, file, cb) => { // Define the destination for the uploaded files
        cb(null, 'uploads/') // Set the destination folder to 'uploads/'
    },
    filename: (req, file, cb) => { // Define the filename for the uploaded files
        cb(null, `${Date.now()}_${file.originalname}`) // Set the filename to a timestamp followed by the original filename
    },
    fileFilter: (req, file, cb) => { // Define a filter for the uploaded files
        const ext = path.extname(file.originalname) // Get the extension of the uploaded file
        if (ext !== '.mp4') { // Check if the file extension is not '.mp4'
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false); // If not, return an error response
        }
        cb(null, true) // If the file extension is valid, proceed with the upload
    }
})

// Create a multer upload instance with the defined storage configuration
var upload = multer({ storage: storage }).single("file")

// Route for uploading video files
router.post('/uploadfiles', (req, res) => {
    upload(req, res, err => { // Call the multer upload middleware
        if(err){ // Check if there is an error during the upload
            return res.json({success:false, err}) // If there is an error, return a JSON response with the error
        }
        return res.json({success: true, url:res.req.file.path, fileName:res.req.file.filename}) // If the upload is successful, return a JSON response with the file details
    })
})

// Route for saving video information to the database
router.post('/uploadVideo', (req, res) => {
    const video = new Video(req.body) // Create a new Video instance with the request body data

    video.save((err,doc) => { // Save the video instance to the database
        if(err) { // Check if there is an error during saving
            return res.json({success: false, err}) // If there is an error, return a JSON response with the error
        }
        res.status(200).json({success:true}) // If the save is successful, return a JSON response indicating success
    })
})

// Route for retrieving videos that the user is subscribed to
router.post('/getSubscriptionVideos', (req, res) => {

    // Find subscribers based on the user's ID
    Subscriber.find({userFrom: req.body.userFrom})
        .exec((err, subscriberInfo)=> { // Execute the query
            if(err){ // Check if there is an error during the query
                return res.status(400).send(err); // If there is an error, return a response with the error
            }
            let subscribedUser = []; // Initialize an array to hold the IDs of subscribed users

            subscriberInfo.map((subscribe,i)=>{ // Map over the subscriber information
                subscribedUser.push(subscribe.userTo) // Push the userTo ID into the subscribedUser array
            })
        
    // Retrieve videos from the subscribed users
    Video.find({"writer":{$in: subscribedUser}})
    .populate('writer') // Populate the writer field with user details
    .exec((err,videos)=>{ // Execute the query
        if(err){ // Check if there is an error during the query
            return res.status(400).send(err) // If there is an error, return a response with the error
        }
        res.status(200).json({success:true, videos}) // If the query is successful, return a JSON response with the videos
    })
}) 
})

// Route for retrieving video details by video ID
router.post('/getVideoDetail', (req, res) => {

    Video.findOne({"_id": req.body.videoId}) // Find a single video by its ID
    .populate('writer') // Populate the writer field with user details
    .exec((err, videoDetail) => { // Execute the query
        if(err){ // Check if there is an error during the query
            return res.status(400).send(err) // If there is an error, return a response with the error
        }
        return res.status(200).json({success: true, videoDetail}) // If the query is successful, return a JSON response with the video details
    })
})

// Route for retrieving all videos
router.get('/getVideos', (req, res) => {

    Video.find() // Find all videos
    .populate('writer') // Populate the writer field with user details
    .exec((err, videos)=> { // Execute the query
        if(err){ // Check if there is an error during the query
            return res.status(400).send(err); // If there is an error, return a response with the error
        }
        res.status(200).json({success: true, videos}) // If the query is successful, return a JSON response with the videos
    })
})

// Route for generating a thumbnail for a video
router.post('/thumbnail', (req, res) => {

    let fileDuration = "" // Initialize a variable to hold the file duration
    let filePath = "" // Initialize a variable to hold the file path

    // Retrieve video information using ffprobe
    ffmpeg.ffprobe(req.body.url, function(err, metadata){ // Use ffprobe to get metadata of the video
        console.dir(metadata); // Log the metadata to the console
        console.log(metadata.format.duration); // Log the video duration to the console
        fileDuration = metadata.format.duration; // Set the fileDuration variable to the video duration
    })

    // Generate thumbnail and retrieve video running time
    ffmpeg(req.body.url) // Create an ffmpeg command with the video URL
    .on('filenames', function (filenames) { // Event listener for the 'filenames' event
        console.log('Will generate ' + filenames.join(', ')) // Log the filenames that will be generated
        filePath = "uploads/thumbnails/" + filenames[0]; // Set the filePath variable to the path of the generated thumbnail
    })
    .on('end', function () { // Event listener for the 'end' event
        console.log('Screenshots taken'); // Log that screenshots have been taken
        return res.json({ success: true, filePath: filePath, fileDuration: fileDuration}) // Return a JSON response with the thumbnail details
    })
    .on('error',function(err){ // Event listener for the 'error' event
        return res.json({success: false, err}) // If there is an error, return a JSON response with the error
    })
    .screenshots({ // Configure the screenshots to be taken
        count: 3, // Take 3 screenshots
        folder: 'uploads/thumbnails', // Set the folder for the screenshots
        size:'320x240', // Set the size of the screenshots
        filename:'thumbnail-%b.png' // Set the filename pattern for the screenshots
    });
    //
})

module.exports = router; // Export the router for use in other parts of the application