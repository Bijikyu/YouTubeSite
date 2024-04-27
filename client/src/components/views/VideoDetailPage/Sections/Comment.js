```jsx
// Comment component for displaying and submitting comments related to a video post

import React,{useState} from 'react'; // imports React and the useState hook from react
import Axios from 'axios'; // imports Axios for making HTTP requests
import {useSelector} from 'react-redux'; // imports useSelector hook from react-redux to access Redux state
import SingleComment from './SingleComment' // imports SingleComment component
import ReplyComment from './ReplyComment' // imports ReplyComment component

// Defines the Comment component which handles displaying comments and a form for submitting a new comment
function Comment(props) {

    const videoId = props.postId // retrieves the video post ID from props

    const user = useSelector(state => state.user) // retrieves user data from Redux state
    const [commentValue, setcommentValue] = useState('') // initializes commentValue state and its setter function

    // Handles the change event on the comment input field and updates the commentValue state
    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value) // sets the commentValue to the current value of the input field
    }

    // Handles the submit event of the comment form
    const onSubmit = (event) => {
        event.preventDefault() // prevents the default form submit action

        const variables = { // defines the payload for the post request
            content: commentValue, // sets the content of the comment
            writer: user.userData._id, // sets the writer's user ID
            postId: videoId // sets the post ID of the video
        }

        // Makes a post request to save the comment
        Axios.post('/api/comment/saveComment',variables)
        .then(response => {
            if(response.data.success){ // checks if the response indicates success
                console.log(response.data.result); // logs the result to the console
                props.refreshFunction(response.data.result) // calls the refresh function passed in props with the new comment
                setcommentValue("") // resets the commentValue state to an empty string
            }
            else{
                alert('커멘트를 저장하지 못했습니다.') // alerts the user if the comment could not be saved
            }
        })
    }

    // Renders the Comment component
    return (
        <div>
            <br/>
            <p>Replies</p> // displays the "Replies" heading
            <hr/>

            {/* comment list */}

            {/* Maps through the commentLists array passed in props and renders SingleComment and ReplyComment components for each comment */}
            {props.commentLists && props.commentLists.map((comment,index)=>(
                (!comment.responseTo && 
                    <React.Fragment key={index}> // uses React.Fragment to group the SingleComment and ReplyComment without adding extra DOM elements
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment}  postId={videoId}/> // renders the SingleComment component for the current comment
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={videoId} commentLists={props.commentLists}/> // renders the ReplyComment component for the current comment
                    </React.Fragment>
                    
                    )
                    
            ))}
         

            {/* comment form */}
            <form style={{display:'flex'}} onSubmit={onSubmit}> // defines the form for submitting a new comment with an inline style
                <textarea
                    style={{width:'100%', borderRadius: '5px'}} // sets the style for the textarea
                    onChange={handleClick} // sets the handleChange function to update the commentValue state on change
                    value={commentValue} // binds the textarea value to the commentValue state
                    placeholder="코멘트를 작성해주세요" // sets the placeholder text for the textarea
                />
                <br/>
                <button style={{width:'20%', height: '52px'}} onClick={onSubmit}>Submit</button> // defines the submit button with an inline style and onClick event handler
            </form>

        </div>
    )
}

export default Comment // exports the Comment component for use in other files