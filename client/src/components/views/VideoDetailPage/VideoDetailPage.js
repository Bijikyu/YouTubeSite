```jsx
// VideoDetailPage component is responsible for rendering the detailed view of a video, including video player, video details, comments, like/dislike functionality, and related side videos.

import React,{useEffect, useState} from 'react' // Importing React, useEffect and useState hooks from react
import { Row, Col, List, Avatar } from 'antd'; // Importing Row, Col, List, and Avatar components from antd
import Axios from 'axios'; // Importing Axios for making HTTP requests
import SideVideo from './Sections/SideVideo'; // Importing SideVideo component
import Subscribe from './Sections/Subcribe'; // Importing Subscribe component
import Comment from './Sections/Comment' // Importing Comment component
import LikeDislikes from './Sections/LikeDislikes' // Importing LikeDislikes component

function VideoDetailPage(props) { // VideoDetailPage functional component
    const videoId = props.match.params.videoId // Extracting videoId from URL parameters
    const variable = {videoId: videoId} // Creating an object to send as request payload
    const [VideoDetail, setVideoDetail] = useState([]) // State for storing video details
    const [Comments, setComments] = useState([]) // State for storing comments

    useEffect(()=>{ // useEffect hook to fetch data on component mount
        Axios.post('/api/video/getVideoDetail', variable) // Making a POST request to get video details
        .then(response => { // Handling the response
            if(response.data.success){ // Checking if the request was successful
                setVideoDetail(response.data.videoDetail) // Updating VideoDetail state with the fetched data
            } else{ // If the request was not successful
                alert('비디오 정보를 가져오길 실패했습니다') // Alerting the user about the failure
            }
        })

        Axios.post('/api/comment/getComments',variable) // Making a POST request to get comments
        .then(response => { // Handling the response
            if(response.data.success){ // Checking if the request was successful
                console.log(response.data.comments) // Logging the comments to the console
                setComments(response.data.comments) // Updating Comments state with the fetched data
               
            }else{ // If the request was not successful
                alert('코멘트 정보를 가져오는 것을 실패하였습니다') // Alerting the user about the failure
            }
        })

    },[]) // The empty array ensures the effect runs only once after the initial render

    const refreshFunction = (newCommnet) => { // Function to update comments state
        setComments(Comments.concat(newCommnet)) // Adding new comment to the existing comments state
    }

    if(VideoDetail.writer){ // Checking if VideoDetail has a writer property
        
        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/> // Conditionally rendering Subscribe button

        return ( // Returning JSX for the component
            <Row gutter={[16,16]}> // Creating a grid layout with Row and Col components
                <Col lg={18} xs={18}> // Defining column size for large and extra-small screens
                    <div style={{width: '100%', padding: '3rem 4rem'}}> // Styling the container div
                        <video style={{width: '100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/> // Video player element
    
                        <List.Item // List item for video details and actions
                        actions={[<LikeDislikes video userId={localStorage.getItem('userId')} videoId={videoId}/>,subscribeButton]}> // LikeDislikes and Subscribe components as actions
    
                            <List.Item.Meta // Metadata for the List item
                            avatar={<Avatar src={VideoDetail.writer.image}/>} // Avatar for the video writer
                            title={VideoDetail.writer.name} // Name of the video writer
                            description={VideoDetail.description} // Description of the video
                            />
    
                        </List.Item>
    
                        <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={videoId}/> // Comment component
                    </div>
                </Col>
                <Col lg={6} xs={6}> // Defining column size for side video section
                    <SideVideo/> // SideVideo component
                </Col>
            </Row>
        )
    }else { // If VideoDetail does not have a writer property
        return ( // Returning a loading message
            <div>...loading</div> // Displaying loading message
        )
    }
   
}

export default VideoDetailPage // Exporting VideoDetailPage component