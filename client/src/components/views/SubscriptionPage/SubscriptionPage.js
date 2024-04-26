```jsx
// SubscriptionPage component: Displays a list of subscription videos for the user.

import React,{useEffect, useState} from 'react' // Importing React hooks and React from 'react' library
import { FaCode } from "react-icons/fa"; // Importing FaCode icon from 'react-icons/fa'
import {Card, Row, Col, Typography, Avatar} from "antd"; // Importing components from 'antd' library
import Axios from 'axios'; // Importing Axios for making HTTP requests
import moment from 'moment'; // Importing moment for date formatting

const {Title} = Typography; // Destructuring Title from Typography for text titles
const {Meta} = Card; // Destructuring Meta from Card for card metadata

function SubscriptionPage() { // SubscriptionPage component definition

    const [Video, setVideo] = useState([]) // State hook for videos, initialized as an empty array

    useEffect(()=>{ // Effect hook to fetch subscription videos on component mount

        const subscriptionVariables = { // Object containing userFrom to be sent in the post request
            userFrom: localStorage.getItem('userId') // Getting userId from localStorage
        }

        Axios.post('/api/video/getSubscriptionVideos', subscriptionVariables) // Making a POST request to get subscription videos
        .then(response => { // Handling the response from the POST request
            if(response.data.success){ // Checking if the response was successful
                console.log(response.data) // Logging the response data
                setVideo(response.data.videos) // Setting the Video state with the fetched videos
            }else{
               alert('비디오 가져오기를 실패했습니다') // Alerting the user if fetching videos failed
            }
        })
    },[]) // Empty dependency array to run the effect only once on component mount

    const renderCards = Video.map((video, index) => { // Mapping over Video state to render cards for each video

        var minutes = Math.floor(video.duration / 60); // Calculating minutes from video duration
        var seconds = Math.floor(video.duration - minutes * 60); // Calculating seconds from video duration

        return <Col lg={6} md={8} xs={24} > // Returning a grid column for each video card
          
            <div style={{ position: 'relative' }} > // Div with relative positioning for video thumbnail
                <a href={`/video/${video._id}`} > // Link to the video detail page
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} /> // Video thumbnail image
                <div className=" duration" // Div for video duration overlay
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span> // Displaying video duration
                </div>
                </a>
            </div>
            
            <br />
            <Meta // Card Meta component for video details
                avatar={ // Avatar for video writer
                    <Avatar src={video.writer.image} /> // Writer's avatar image
                }
                title={video.title} // Video title
            />
            <span>{video.writer.name} </span><br /> // Writer's name
            <span style={{ marginLeft: '3rem' }}> {video.views}</span> // Number of video views
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span> // Formatted video creation date
    
        </Col>
    })
    
    return ( // JSX to render the SubscriptionPage component
        <div style={{width: '85%', margin: '3rem'}}> // Div wrapping the entire content
            <Title level={2}>Recommended</Title> // Title for the page
            <hr/> // Horizontal rule for styling
            <Row gutter={[16, 16]}> // Row for grid layout with gutter for spacing

                {renderCards} // Rendering the video cards
               
            </Row>
        </div>
    )
}

export default SubscriptionPage // Exporting SubscriptionPage component as default