// This is a React component for handling like and dislike actions on a video or comment.
import React,{useEffect,useState} from 'react'; // Importing React hooks and React itself
import { Tooltip, Icon } from 'antd'; // Importing Tooltip and Icon components from antd library
import Axios from 'axios'; // Importing Axios for making HTTP requests

function LikeDislikes(props) { // This component manages the like and dislike functionality

    const [Likes, setLikes] = useState(0) // State to keep track of the number of likes
    const [Dislikes, setDislikes] = useState(0) // State to keep track of the number of dislikes
    const [LikeAction, setLikeAction] = useState(null) // State to keep track of the user's like action
    const [DisLikeAction, setDisLikeAction] = useState(null) // State to keep track of the user's dislike action

    let variable = {} // Variable to hold request payload
    if(props.video){ // Check if the props indicate a video
        variable = {videoId: props.videoId, userId: props.userId } // Set payload for video
    }else{ // If not a video, it must be a comment
        variable = {commentId: props.commentId, userId:props.userId} // Set payload for comment
    }

    // This useEffect hook is used to fetch the initial like and dislike data when the component mounts
    useEffect(() => {
        Axios.post('/api/like/getLikes',variable) // Making a POST request to get likes
        .then(response=>{
            if(response.data.success){ // Check if the request was successful
                setLikes(response.data.likes.length) // Update the number of likes

                response.data.likes.map(like => { // Iterate through the likes to check if the user has liked
                    if(like.userId === props.userId){ // Check if the user has already liked
                        setLikeAction('liked') // Set the like action state to 'liked'
                    }
                })
            }else{ // If the request was not successful
                alert('Likes에 정보를 가져오지 못했습니다') // Alert the user that likes could not be fetched
            }
        })

        Axios.post('/api/like/getDislikes',variable) // Making a POST request to get dislikes
        .then(response=>{
            if(response.data.success){ // Check if the request was successful
                setDislikes(response.data.dislikes.length) // Update the number of dislikes

                response.data.dislikes.map(dislikes => { // Iterate through the dislikes to check if the user has disliked
                    if(dislikes.userId === props.userId){ // Check if the user has already disliked
                        setDisLikeAction('disliked') // Set the dislike action state to 'disliked'
                    }
                })
            }else{ // If the request was not successful
                alert('DisLikes에 정보를 가져오지 못했습니다') // Alert the user that dislikes could not be fetched
            }
        })

    }, []) // The empty array ensures this effect runs only once after the initial render

    // Function to handle like action when the like button is clicked
    const onLike = () => {
        if(LikeAction === null){ // If the user has not liked yet
            Axios.post('/api/like/upLike', variable) // Make a POST request to like the item
                .then(response => {
                    if(response.data.success){ // If the request was successful
                        setLikes(Likes + 1) // Increment the likes count
                        setLikeAction('liked') // Set the like action to 'liked'

                        if(DisLikeAction !== null){ // If the user has disliked before
                            setDisLikeAction(null) // Remove the dislike action
                            setDislikes(Dislikes -1) // Decrement the dislikes count
                        }
                    }else{ // If the request was not successful
                        alert('Like를 올리지 못하였습니다') // Alert the user that the like could not be incremented
                    }
                })
            
        }else{ // If the user has already liked

            Axios.post('/api/like/unLike', variable) // Make a POST request to unlike the item
            .then(response => {
                if(response.data.success){ // If the request was successful
                    setLikes(Likes - 1) // Decrement the likes count
                    setLikeAction(null) // Remove the like action
                    }
                else{ // If the request was not successful
                    alert('Like을 내리지 못하였습니다') // Alert the user that the like could not be decremented
                }
            })
        }
    }

    // Function to handle dislike action when the dislike button is clicked
    const onDislike = () => {

        if(DisLikeAction !== null){ // If the user has already disliked
            Axios.post('/api/like/unDislike',variable) // Make a POST request to remove the dislike
            .then(response => {
                if(response.data.success){ // If the request was successful
                    setDislikes(Dislikes - 1) // Decrement the dislikes count
                    setDisLikeAction(null) // Remove the dislike action
                }else{ // If the request was not successful
                    alert('dislike을 지우지 못했습니다') // Alert the user that the dislike could not be removed
                }
            })
        }else{ // If the user has not disliked yet
            Axios.post('/api/like/upDislike',variable) // Make a POST request to dislike the item
            .then(response => {
                if(response.data.success){ // If the request was successful
                    setDislikes(Dislikes + 1) // Increment the dislikes count
                    setDisLikeAction('disliked') // Set the dislike action to 'disliked'

                    if(LikeAction !== null){ // If the user has liked before
                        setLikeAction(null) // Remove the like action
                        setLikes(Likes -1) // Decrement the likes count
                    }
                }else{ // If the request was not successful
                    alert('dislike을 지우지 못했습니다') // Alert the user that the dislike could not be incremented
                }
            })
        }
    }

    // The JSX returned by the component to render the like and dislike buttons with their respective counts
    return (
        <div>
        <span key="comment-basic-like">
            <Tooltip title="Like"> // Tooltip component to show a tooltip on hover
                <Icon type="like" // Icon component to display a like icon
                    theme={LikeAction === 'liked' ? 'filled' : 'outlined'} // Change the icon theme based on the like action
                    onClick={onLike} // Set the onClick handler to the onLike function
                />                
            </Tooltip>
            <span style={{paddingLeft:"8px", cursor:"auto"}}>{Likes}</span> // Display the number of likes
        </span>&nbsp;&nbsp;
        
        
        <span key="comment-basic-dislike">
            <Tooltip title="Dislike"> // Tooltip component to show a tooltip on hover
                <Icon type="dislike" // Icon component to display a dislike icon
                    theme={DisLikeAction === 'disliked' ? 'filled' : 'outlined'} // Change the icon theme based on the dislike action
                    onClick={onDislike} // Set the onClick handler to the onDislike function
                />                
            </Tooltip>
    <span style={{paddingLeft:"8px", cursor:"auto"}}>{Dislikes}</span> // Display the number of dislikes
        </span>&nbsp;&nbsp;
        </div>
    )
}

export default LikeDislikes // Export the LikeDislikes component for use in other parts of the application