// This is a React component that allows users to subscribe or unsubscribe to a content creator. It displays the number of subscribers and changes the subscription state based on user interaction.

import React,{useEffect, useState} from 'react'; // Importing React hooks from the react library.
import Axios from 'axios'; // Importing Axios for making HTTP requests.

function Subcribe(props) { // This is a React functional component for handling subscriptions.

    const [SubscribeNumber, setSubscribeNumber] = useState(0) // State hook for tracking the number of subscribers.
    const [Subscribed, setSubscribed] = useState(false) // State hook for tracking the subscription status.

    useEffect(()=>{ // This useEffect hook runs once after the initial render to fetch subscription data.
        
        let variable = {userTo: props.userTo} // Object containing the user to subscribe to.

        Axios.post('/api/subscribe/subscribeNumber',variable) // HTTP POST request to get the number of subscribers.
            .then(response => { // Handling the promise after the request is made.
                if(response.data.success){ // Checking if the request was successful.
                    setSubscribeNumber(response.data.subscribeNumber) // Updating the state with the number of subscribers.
                }else{
                    alert('구독자 수 정보를 받아오지 못했습니다.') // Alerting the user if the request failed.
                }
            })

            let subscribedVariable = {userTo: props.userTo, userFrom: localStorage.getItem('userId')} // Object containing the subscriber and the user to subscribe to.

        Axios.post('/api/subscribe/subscribed',subscribedVariable) // HTTP POST request to check if the user is subscribed.
        .then(response => { // Handling the promise after the request is made.
            if(response.data.success){ // Checking if the request was successful.
                setSubscribed(response.data.subscribed) // Updating the state with the subscription status.
            }else{
                alert('정보를 받아오지 못했습니다.') // Alerting the user if the request failed.
            }
        })

    },[]) // The empty array ensures this effect runs only once.

    const onSubscribe = () => { // This function handles the subscribe and unsubscribe actions.

        let subscribedVariable = { // Object containing the subscriber and the user to subscribe to.

            userTo: props.userTo,
            userFrom: props.userFrom
        }

        if(Subscribed){ // Checking if the user is already subscribed.
            Axios.post('/api/subscribe/unSubscribe',subscribedVariable) // HTTP POST request to unsubscribe the user.
                .then(response => { // Handling the promise after the request is made.
                    if(response.data.success){ // Checking if the request was successful.
                        setSubscribeNumber(SubscribeNumber-1) // Decreasing the number of subscribers.
                        setSubscribed(!Subscribed) // Updating the subscription status.
                    }else{
                        alert('구독 취소하는데 실패했습니다.') // Alerting the user if the request failed.
                    }
                })
        }
        else{
            Axios.post('/api/subscribe/subscribe',subscribedVariable) // HTTP POST request to subscribe the user.
                .then(response => { // Handling the promise after the request is made.
                    if(response.data.success){ // Checking if the request was successful.
                        setSubscribeNumber(SubscribeNumber+1) // Increasing the number of subscribers.
                        setSubscribed(!Subscribed) // Updating the subscription status.
                    }else{
                        alert('구독하는데 실패했습니다.') // Alerting the user if the request failed.
                    }
                })
        }
    }
   
    return ( // This return statement renders the subscribe button with dynamic styles and text.
        <div>
            <button
            onClick={onSubscribe} // Event handler for the click event on the subscribe button.
            style={{backgroundColor:`${Subscribed ? '#AAAAAA' : '#CC0000' }`, borderRadius:'4px', // Conditional styling based on subscription status.
            color: 'white', padding: '10px 16px', fontWeight: '500', fontSize:'1rem', textTransform:'uppercase'   
            }} >
            {SubscribeNumber}  {Subscribed ? 'Subscribed':'Subscribe'} // Displaying the number of subscribers and subscription status.
            </button>
        </div>
    )
}

export default Subcribe // Exporting the Subscribe component for use in other parts of the application.