```jsx
// This file defines a React component that renders a landing page with a list of videos fetched from an API.

import React,{useEffect, useState} from 'react' // Importing React hooks from the React library.
import { FaCode } from "react-icons/fa"; // Importing a specific icon from react-icons.
import {Card, Row, Col, Typography, Avatar} from "antd"; // Importing components from antd design library.
import Axios from 'axios'; // Importing Axios for making HTTP requests.
import moment from 'moment'; // Importing moment for date formatting.

const {Title} = Typography; // Destructuring Title component from Typography.
const {Meta} = Card; // Destructuring Meta component from Card.

function LandingPage() { // This function component renders the landing page.

    const [Video, setVideo] = useState([]) // State hook for storing videos.

    useEffect(()=>{ // This effect runs once after the initial render to fetch videos.
        Axios.get('/api/video/getVideos') // Making a GET request to fetch videos.
        .then(response => { // Handling the response from the API.
            if(response.data.success){ // Checking if the response was successful.
                setVideo(response.data.videos) // Updating the Video state with the fetched videos.
            }else{
               alert('비디오 가져오기를 실패했습니다') // Alerting the user if the fetch was unsuccessful.
            }
        })
    },[]) // The empty dependency array ensures this effect runs only once.

    const renderCards = Video.map((video, index) => { // Mapping over the Video state to render cards.

        var minutes = Math.floor(video.duration / 60); // Calculating the minutes part of the video duration.
        var seconds = Math.floor(video.duration - minutes * 60); // Calculating the seconds part of the video duration.

        return <Col lg={6} md={8} xs={24} > // Defining the grid column for each video card.
          
            <div style={{ position: 'relative' }} > // Wrapping the thumbnail in a div with relative positioning.
                <a href={`/video/${video._id}`} > // Linking the thumbnail to the video detail page.
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} /> // Displaying the video thumbnail.
                <div className=" duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span> // Displaying the video duration.
                </div>
                </a>
            </div>
            
            <br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} /> // Displaying the video writer's avatar.
                }
                title={video.title} // Displaying the video title.
            />
            <span>{video.writer.name} </span><br /> // Displaying the video writer's name.
            <span style={{ marginLeft: '3rem' }}> {video.views}</span> // Displaying the number of views.
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span> // Displaying the formatted creation date.
    
        </Col>
    })
    
    return (
        <div style={{width: '85%', margin: '3rem'}}> // Setting the width and margin for the container.
            <Title level={2}>Recommended</Title> // Displaying the section title.
            <hr/> // Adding a horizontal rule for visual separation.
            <Row gutter={[16, 16]}> // Defining the grid row with gutter for spacing.

                {renderCards} // Rendering the video cards.
               
            </Row>
        </div>
    )
}

export default LandingPage // Exporting the LandingPage component for use in other parts of the application.