// This file defines a React component that renders a right-hand menu for navigation. It includes functionality for user authentication, login, and logout using Redux for state management and axios for HTTP requests.

/* eslint-disable jsx-a11y/anchor-is-valid */ // Disables specific eslint rule for the entire file
import React from 'react'; // Imports the React library for creating components
import { Menu } from 'antd'; // Imports the Menu component from antd library
import axios from 'axios'; // Imports axios for making HTTP requests
import { USER_SERVER } from '../../../Config'; // Imports the USER_SERVER URL from the configuration file
import { withRouter } from 'react-router-dom'; // Imports withRouter HOC from react-router-dom for routing
import { useSelector } from "react-redux"; // Imports the useSelector hook from react-redux for accessing the Redux store state

function RightMenu(props) { // Defines the RightMenu component that takes props as an argument
  const user = useSelector(state => state.user) // Uses the useSelector hook to access the user state from the Redux store

  const logoutHandler = () => { // Defines the logoutHandler function for logging out the user
    axios.get(`${USER_SERVER}/logout`).then(response => { // Makes a GET request to the logout endpoint
      if (response.status === 200) { // Checks if the response status is 200 (OK)
        props.history.push("/login"); // Redirects to the login page using the history prop
      } else { // If the response status is not 200
        alert('Log Out Failed') // Displays an alert message indicating logout failure
      }
    });
  };

  if (user.userData && !user.userData.isAuth) { // Checks if userData exists and the user is not authenticated
    return ( // Returns the JSX for the unauthenticated user menu
      <Menu mode={props.mode}> // Renders the Menu component with the mode passed in props
        <Menu.Item key="mail"> // Defines a Menu.Item component with a key
          <a href="/login">Signin</a> // Creates an anchor tag for the login page
        </Menu.Item>
        <Menu.Item key="app"> // Defines another Menu.Item component with a key
          <a href="/register">Signup</a> // Creates an anchor tag for the registration page
        </Menu.Item>
      </Menu>
    )
  } else { // If userData does not exist or the user is authenticated
    return ( // Returns the JSX for the authenticated user menu
      <Menu mode={props.mode}> // Renders the Menu component with the mode passed in props
        <Menu.Item key="upload"> // Defines a Menu.Item component with a key
          <a href="/video/upload">Video</a> // Creates an anchor tag for the video upload page
        </Menu.Item>
        <Menu.Item key="logout"> // Defines another Menu.Item component with a key
          <a onClick={logoutHandler}>Logout</a> // Creates an anchor tag with an onClick event that triggers logoutHandler
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu); // Exports the RightMenu component wrapped with withRouter HOC for routing purposes