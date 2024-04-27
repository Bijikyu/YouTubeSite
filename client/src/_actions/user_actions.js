// This module defines actions for user authentication including registration, login, checking auth status, and logout.

import axios from 'axios'; // Importing axios for making HTTP requests
import {
    LOGIN_USER, // Importing action type for user login
    REGISTER_USER, // Importing action type for user registration
    AUTH_USER, // Importing action type for user authentication check
    LOGOUT_USER, // Importing action type for user logout
} from './types'; // Importing action types from types file
import { USER_SERVER } from '../components/Config.js'; // Importing the user server URL from the configuration file

// This function handles user registration by sending a POST request to the server.
export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit) // Sends a POST request to the register endpoint with the user data
        .then(response => response.data); // Processes the response to get the data
    
    return {
        type: REGISTER_USER, // Sets the action type to REGISTER_USER
        payload: request // Sets the payload to the result of the axios request
    }
}

// This function handles user login by sending a POST request to the server.
export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit) // Sends a POST request to the login endpoint with the user data
                .then(response => response.data); // Processes the response to get the data

    return {
        type: LOGIN_USER, // Sets the action type to LOGIN_USER
        payload: request // Sets the payload to the result of the axios request
    }
}

// This function checks the authentication status of the user by sending a GET request to the server.
export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`) // Sends a GET request to the auth endpoint
    .then(response => response.data); // Processes the response to get the data

    return {
        type: AUTH_USER, // Sets the action type to AUTH_USER
        payload: request // Sets the payload to the result of the axios request
    }
}

// This function handles user logout by sending a GET request to the server.
export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`) // Sends a GET request to the logout endpoint
    .then(response => response.data); // Processes the response to get the data

    return {
        type: LOGOUT_USER, // Sets the action type to LOGOUT_USER
        payload: request // Sets the payload to the result of the axios request
    }
}