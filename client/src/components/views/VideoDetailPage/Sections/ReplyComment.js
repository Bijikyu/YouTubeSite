// This React component is used for displaying reply comments for a specific parent comment in a video post.
import React, { useEffect, useState } from 'react' // Importing React hooks and React from 'react' module.
import SingleComment from './SingleComment' // Importing SingleComment component from the same directory.

// ReplyComment component to handle and display reply comments.
function ReplyComment(props) {
    
    const [ChildCommentNumber, setChildCommentNumber] = useState(0) // State to keep track of the number of child comments.
    const [OpenReplyComments, setOpenReplyComments] = useState(false) // State to toggle the visibility of reply comments.

    // useEffect hook to calculate the number of child comments whenever the commentLists prop changes.
    useEffect(() => {
       let commentNumber = 0; // Local variable to count the number of child comments.

        props.commentLists.map((comment)=>{ // Iterating over the comment list.
            if(comment.responseTo === props.parentCommentId){ // Checking if the comment is a reply to the parent comment.
                commentNumber++ // Incrementing the count for each child comment found.
            }
        })

            setChildCommentNumber(commentNumber) // Updating the state with the number of child comments.
        
    }, [props.commentLists]) // Dependency array for useEffect, will re-run when commentLists changes.
    

    // Function to render the reply comments for a given parent comment ID.
    const renderReplyComment = (parentCommentId) =>
        props.commentLists.map((comment, index)=>( // Mapping over the comment list to render each reply comment.
            <React.Fragment> // React Fragment to group multiple elements without adding extra nodes to the DOM.
            {comment.responseTo === parentCommentId && // Conditional rendering for comments that are replies to the parent comment.
                <div style={{width:'80%', marginLeft:'40px'}}> // Styling for the reply comment container.
                    <SingleComment comment={comment} postId={props.videoId} refreshFunction={props.refreshFunction}   /> // Rendering a single comment.
                    <ReplyComment commentLists={props.commentLists} parentCommentId={comment._id}  postId={props.videoId}  refreshFunction={props.refreshFunction}/> // Recursively rendering ReplyComment for nested comments.
                </div>
                }
            </React.Fragment>
        ))
    
  
    // Function to toggle the state of OpenReplyComments.
    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments) // Toggling the visibility of reply comments.
    }

    // The component's return statement rendering the UI.
    return (
        <div>

          {ChildCommentNumber > 0 && // Conditional rendering to show the 'View more comments' text if there are child comments.
            <p style={{ fontSize:'14px', margin: 0, color: 'gray'}} onClick={onHandleChange}> // Paragraph with an onClick event to toggle reply comments.
            View {ChildCommentNumber} more comment(s) // Displaying the number of child comments.
            </p>
          }

          {OpenReplyComments && // Conditional rendering to display reply comments if OpenReplyComments is true.
            renderReplyComment(props.parentCommentId) // Calling the function to render reply comments.
          }

            

        </div>
    )
}

export default ReplyComment // Exporting the ReplyComment component for use in other modules.