// This file defines a reducer function for user authentication actions.
import {
    LOGIN_USER, // import LOGIN_USER action type
    REGISTER_USER, // import REGISTER_USER action type
    AUTH_USER, // import AUTH_USER action type
    LOGOUT_USER, // import LOGOUT_USER action type
} from '../_actions/types'; // import action types from types.js in the actions folder

// Reducer function for handling user authentication related state changes
export default function(state={},action){ // define default export function with initial state and action
    switch(action.type){ // switch statement to handle different action types
        case REGISTER_USER: // case for REGISTER_USER action
            return {...state, register: action.payload } // return new state with register data
        case LOGIN_USER: // case for LOGIN_USER action
            return { ...state, loginSucces: action.payload } // return new state with login success data
        case AUTH_USER: // case for AUTH_USER action
            return {...state, userData: action.payload } // return new state with user data
        case LOGOUT_USER: // case for LOGOUT_USER action
            return {...state } // return state unchanged
        default: // default case for when action type doesn't match
            return state; // return current state unchanged
    }
}