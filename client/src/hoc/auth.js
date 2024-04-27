```jsx
// This file defines a higher-order component that wraps a given component with authentication checks.

/* eslint-disable react-hooks/exhaustive-deps */ // Disables linting for exhaustive dependencies in useEffect
import React, { useEffect } from 'react'; // Imports React and the useEffect hook from the react package
import { auth } from '../_actions/user_actions'; // Imports the auth action from the user_actions file
import { useSelector, useDispatch } from "react-redux"; // Imports hooks for accessing Redux state and dispatching actions

// This function creates a higher-order component to wrap a specific component with authentication logic.
export default function (SpecificComponent, option, adminRoute = null) { // Defines the higher-order component with parameters for the component to wrap, an option flag, and an optional admin route flag
    function AuthenticationCheck(props) { // Defines the component that will perform the authentication check

        let user = useSelector(state => state.user); // Retrieves the user state from the Redux store
        const dispatch = useDispatch(); // Provides the dispatch function to send actions to the Redux store

        // This useEffect hook runs authentication logic when the component mounts.
        useEffect(() => {
            //To know my current status, send Auth request 
            dispatch(auth()).then(response => { // Dispatches the auth action and handles the promise response
                //Not Loggined in Status 
                if (!response.payload.isAuth) { // Checks if the user is not authenticated
                    if (option) { // Checks if the option flag is true, which typically means authentication is required
                        props.history.push('/login') // Redirects to the login page
                    }
                    //Loggined in Status 
                } else { // If the user is authenticated
                    //supposed to be Admin page, but not admin person wants to go inside
                    if (adminRoute && !response.payload.isAdmin) { // Checks if it's an admin route and the user is not an admin
                        props.history.push('/') // Redirects to the home page
                    }
                    //Logged in Status, but Try to go into log in page 
                    else { // If it's not an admin route or the user is an admin
                        if (option === false) { // Checks if the option flag is false, which typically means the user should not be on a login page if already authenticated
                            props.history.push('/') // Redirects to the home page
                        }
                    }
                }
            })

        }, []) // The dependency array is empty, so this effect runs only once after the initial render

        // Renders the specific component passed to the higher-order component with the current props and user state.
        return (
            <SpecificComponent {...props} user={user} /> // Passes all props and the user state to the specific component
        )
    }
    return AuthenticationCheck // Returns the component with authentication logic
}