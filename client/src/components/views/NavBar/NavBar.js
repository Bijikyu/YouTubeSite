// NavBar component: This file defines a navigation bar component using React functional component and hooks. It imports necessary subcomponents and styles, and uses Ant Design components for UI elements.

import React, { useState } from 'react'; // Import React and the useState hook
import LeftMenu from './Sections/LeftMenu'; // Import LeftMenu component
import RightMenu from './Sections/RightMenu'; // Import RightMenu component
import { Drawer, Button, Icon } from 'antd'; // Import Drawer, Button, and Icon components from antd
import './Sections/Navbar.css'; // Import CSS styles for the NavBar

function NavBar() { // Define the NavBar functional component
  const [visible, setVisible] = useState(false) // useState hook to manage the visibility state of the Drawer

  const showDrawer = () => { // Function to open the Drawer
    setVisible(true) // Set the visibility state to true
  };

  const onClose = () => { // Function to close the Drawer
    setVisible(false) // Set the visibility state to false
  };

  return ( // JSX to render the NavBar component
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}> // Navigation bar with fixed position
      <div className="menu__logo"> // Logo container
        <a href="/">Logo</a> // Logo link
      </div>
      <div className="menu__container"> // Container for menu items
        <div className="menu_left"> // Left menu container
          <LeftMenu mode="horizontal" /> // LeftMenu component with horizontal mode
        </div>
        <div className="menu_rigth"> // Right menu container (note: 'rigth' is a typo and should be 'right')
          <RightMenu mode="horizontal" /> // RightMenu component with horizontal mode
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        > // Button to show the Drawer on mobile view
          <Icon type="align-right" /> // Icon for the button
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        > // Drawer component from antd library
          <LeftMenu mode="inline" /> // LeftMenu component with inline mode for Drawer
          <RightMenu mode="inline" /> // RightMenu component with inline mode for Drawer
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar // Export the NavBar component for use in other files