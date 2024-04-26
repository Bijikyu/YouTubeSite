// React component for the main application layout and routing
import React, { Suspense } from 'react'; // Import React and Suspense from react package
import { Route, Switch } from "react-router-dom"; // Import Route and Switch from react-router-dom for routing
import Auth from "../hoc/auth"; // Import Auth Higher Order Component for authentication handling
// Import pages and components for the application
import LandingPage from "./views/LandingPage/LandingPage.js"; // Import LandingPage component
import LoginPage from "./views/LoginPage/LoginPage.js"; // Import LoginPage component
import RegisterPage from "./views/RegisterPage/RegisterPage.js"; // Import RegisterPage component
import NavBar from "./views/NavBar/NavBar"; // Import NavBar component
import Footer from "./views/Footer/Footer"; // Import Footer component
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage"; // Import VideoUploadPage component
import VideoDetailPage from "./views/VideoDetailPage/VideoDetailPage"; // Import VideoDetailPage component
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage"; // Import SubscriptionPage component

// Access level comments for route protection
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

// Main App component containing the routing logic and layout structure
function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}> // Suspense component to handle lazy loading with a fallback loading div
      <NavBar /> // NavBar component displayed at the top of every page
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}> // Main content area with padding and minimum height styling
        <Switch> // Switch component to render only the first matching Route
          <Route exact path="/" component={Auth(LandingPage, null)} /> // Route for the LandingPage with no access restrictions
          <Route exact path="/login" component={Auth(LoginPage, false)} /> // Route for the LoginPage restricted to non-logged in users
          <Route exact path="/register" component={Auth(RegisterPage, false)} /> // Route for the RegisterPage restricted to non-logged in users
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} /> // Route for the VideoUploadPage restricted to logged in users
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} /> // Route for the VideoDetailPage with no access restrictions
          <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} /> // Route for the SubscriptionPage with no access restrictions
        </Switch>
      </div>
      <Footer /> // Footer component displayed at the bottom of every page
    </Suspense>
  );
}

export default App; // Export the App component for use in other files