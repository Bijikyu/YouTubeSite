// This is a React component that renders a footer with a smile icon using Ant Design components.

import React from 'react' // Importing React library
import {Icon} from 'antd'; // Importing Icon component from antd library

// This function component renders the footer of the application.
function Footer() {
    return (
        <div style={{ // Inline style for the footer container
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p> Happy Coding  <Icon type="smile" /></p> // Paragraph with text and a smile icon
        </div>
    )
}

export default Footer // Exporting Footer component for use in other parts of the application