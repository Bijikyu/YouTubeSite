// This file defines the root reducer by combining various sub-reducers using Redux's combineReducers utility.

import { combineReducers } from 'redux'; // Import combineReducers utility from redux
import user from './user_reducer'; // Import the user reducer from the user_reducer file

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
    user, // Add the user reducer to the combined reducers
});

export default rootReducer; // Export the combined root reducer as the default export