// This is a React functional component that fetches a list of videos from an API and displays them as side videos with their thumbnails, titles, writers' names, views, and durations.

import React,{useEffect, useState} from 'react' // Importing React, useEffect and useState hooks from the react package
import Axios from 'axios'; // Importing Axios for making HTTP requests

function SideVideo() { // This is a functional component named SideVideo

    const [SideVideos, setSideVideos] = useState([]) // Declaring a state variable SideVideos and a function to update it, initializing with an empty array

    useEffect(() => { // This useEffect hook runs once after the initial render because of the empty dependency array
        Axios.get('/api/video/getVideos') // Making a GET request to the server to fetch videos
        .then(response => { // Handling the promise returned by the GET request
            if(response.data.success){ // Checking if the response was successful
                setSideVideos(response.data.videos) // Updating the SideVideos state with the fetched videos
            }else{
               alert('비디오 가져오기를 실패했습니다') // Alerting the user if the video fetch was unsuccessful
            }
        })
    }, []) // Empty dependency array means this effect runs once after the initial render

    const renderSideVideo = SideVideos.map((video, index)=>{ // Mapping over the SideVideos array to render each video

        var minutes = Math.floor(video.duration / 60); // Calculating the minutes part of the video duration
        var seconds = Math.floor(video.duration - minutes * 60); // Calculating the seconds part of the video duration

        return  <div key={index} style={{display:'flex', marginBottom:"1rem", padding: '0 2rem' }}> // Returning a div for each video with a unique key
                <div style={{width:'40%', marginRight: '1rem'}}> // Styling the thumbnail container
                <a href style={{color : 'gray'}}> // Link wrapper for the thumbnail, missing the 'href' attribute value
                    <img style={{width: '100%', height:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail"/> // Displaying the video thumbnail
                </a>
                </div>
                 <div style={{width:'50%'}}> // Styling the video details container
                <a href> // Link wrapper for the video details, missing the 'href' attribute value
                <span style={{fontSize: '1rem', color:'black'}}>{video.title}</span> // Displaying the video title
                <span>{video.writer.name}</span><br/> // Displaying the video writer's name
                <span>{video.views} views</span><br/> // Displaying the number of views
                <span>{minutes}:{seconds}</span> // Displaying the video duration in minutes and seconds
            </a>
        </div>
    </div>
    })

    return (
        <React.Fragment> // Using React.Fragment to group a list of children without adding extra nodes to the DOM
            <div style={{marginTop: '3rem'}}/> // Adding a div with top margin for styling
            {renderSideVideo} // Rendering the side videos
        </React.Fragment>
    )
}

export default SideVideo // Exporting the SideVideo component for use in other parts of the application