// This file is the entry point for a React application. It includes polyfills for older browsers,
// sets up Redux for state management, configures middleware, and mounts the main App component
// inside a Redux Provider and React Router's BrowserRouter.

import 'react-app-polyfill/ie9'; // Imports polyfills for Internet Explorer 9 support
import 'react-app-polyfill/ie11'; // Imports polyfills for Internet Explorer 11 support
import 'core-js'; // Imports core-js for polyfilling ECMAScript features

import React from 'react'; // Imports the React library for building user interfaces
import ReactDOM from 'react-dom'; // Imports ReactDOM for DOM-related rendering methods
import './index.css'; // Imports the main stylesheet for the application
import App from './components/App'; // Imports the main App component
import * as serviceWorker from './serviceWorker'; // Imports service worker functions for offline capabilities
import { BrowserRouter } from "react-router-dom"; // Imports BrowserRouter for routing in the application

import Reducer from './_reducers'; // Imports the root reducer for Redux
import { Provider } from 'react-redux'; // Imports the Provider component from react-redux to bind Redux and React
import { createStore, applyMiddleware } from 'redux'; // Imports createStore and applyMiddleware from redux for store creation and middleware
import promiseMiddleware from 'redux-promise'; // Imports promiseMiddleware to handle promises in actions
import ReduxThunk from 'redux-thunk'; // Imports ReduxThunk to handle asynchronous actions

// Creates a store with middleware applied for handling promises and thunks
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

// Renders the React application to the DOM, wrapping the App component in a Provider and BrowserRouter
ReactDOM.render(
    <Provider
        store={createStoreWithMiddleware(
            Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ && // Checks for the presence of Redux DevTools extension
            window.__REDUX_DEVTOOLS_EXTENSION__() // Applies the Redux DevTools extension enhancer if available
        )}
    >
        <BrowserRouter> // Provides routing capabilities using HTML5 history API
            <App /> // The main App component that contains the rest of the application
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')); // Mounts the application to the DOM element with id 'root'
// Configures the service worker to unregister, which means it won't cache assets for offline use
serviceWorker.unregister();