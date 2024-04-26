// SingleComment component: This file defines a React component that represents a single comment with reply and like/dislike functionality.

import React,{useState} from 'react' // Importing React and the useState hook from react package
import {Comment, Avatar, Button, Input} from 'antd'; // Importing Comment, Avatar, Button, and Input components from antd library
import {useSelector} from 'react-redux'; // Importing useSelector hook from react-redux to access the Redux store state
import Axios from 'axios'; // Importing Axios for making HTTP requests
import LikeDislikes from './LikeDislikes'; // Importing LikeDislikes component for like and dislike functionality

function SingleComment(props) { // SingleComment component definition

    const user = useSelector(state => state.user) // Accessing user state from Redux store
    const [CommentValue, setCommentValue] = useState('') // State to keep track of the comment input value
    const [OpenReply, setOpenReply] = useState(false) // State to control the visibility of the reply input
    
    const onClickReplyOpen = () => { // Handler for toggling the reply input visibility
        setOpenReply(!OpenReply) // Toggling the OpenReply state
    }

    const onHandleChange = (event) => { // Handler for updating the comment input value
        setCommentValue(event.currentTarget.value) // Updating the CommentValue state with the new input value
    }

    const onSubmit = (event) => { // Handler for submitting the comment
        event.preventDefault(); // Preventing the default form submit action

        const variables = { // Object containing the comment data to be sent to the server
            content: CommentValue, // Comment content
            writer: user.userData._id, // ID of the user writing the comment
            postId: props.postId, // ID of the post the comment belongs to
            responseTo: props.comment._id // ID of the comment being replied to (if any)
        }

        Axios.post('/api/comment/saveComment',variables) // Making a POST request to save the comment
        .then(response => { // Handling the response after the request is made
            if(response.data.success){ // Checking if the comment was saved successfully
                props.refreshFunction(response.data.result) // Calling the refresh function passed as a prop with the new comment data
                setCommentValue("") // Resetting the comment input value
                setOpenReply(!OpenReply) // Toggling the reply input visibility
            }
            else{ // If the comment was not saved successfully
                alert('커멘트를 저장하지 못했습니다.') // Displaying an error message
            }
        })
    }

    const actions = [ // Array of action elements to be passed to the Comment component
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id}/> // LikeDislikes component for handling likes and dislikes
        ,<span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span> // Span element to toggle the reply input visibility
    ]

    return ( // JSX to render the SingleComment component
        <div> // Container div for the comment and reply form
            <Comment // Ant Design Comment component to display the comment
                actions={actions} // Actions to display under the comment
                author={props.comment.writer.name} // Author name of the comment
                avatar={<Avatar src={props.comment.writer.image} al/>} // Avatar of the comment author
                content={<p>{props.comment.content}</p>} // Content of the comment
            />

            {OpenReply && // Conditional rendering to display the reply form only when OpenReply is true
                <form style={{display:'flex'}} onSubmit={onSubmit}> // Form element for submitting a reply
                <textarea // Textarea for the reply input
                    style={{width:'100%', borderRadius: '5px'}} // Styling for the textarea
                    onChange={onHandleChange} // Handler to update the reply input value
                    value={CommentValue} // Value of the reply input
                    placeholder="코멘트를 작성해주세요" // Placeholder text for the textarea
                />
                <br/> // Line break for layout purposes
                <button style={{width:'20%', height: '52px'}} onClick={onSubmit}>Submit</button> // Button to submit the reply
                </form>}

             
        </div> // Closing container div
    )
}

export default SingleComment // Exporting the SingleComment component for use in other files