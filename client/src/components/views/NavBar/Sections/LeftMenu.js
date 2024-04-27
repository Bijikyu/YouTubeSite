// This file defines a React component that renders a left-side navigation menu using Ant Design's Menu component.

import React from 'react'; // Importing React library
import { Menu } from 'antd'; // Importing Menu component from antd library
const SubMenu = Menu.SubMenu; // Assigning SubMenu from Menu to a constant for easy reference
const MenuItemGroup = Menu.ItemGroup; // Assigning ItemGroup from Menu to a constant for easy reference

// This function component LeftMenu returns a Menu component with items for navigation.
function LeftMenu(props) { // Declaring a functional component named LeftMenu
  return ( // JSX syntax to return the Menu component
    <Menu mode={props.mode}> // Menu component with mode prop to determine horizontal or vertical layout
    <Menu.Item key="mail"> // Menu item with a unique key
      <a href="/">Home</a> // Anchor tag for navigation to the home page
    </Menu.Item>
    <Menu.Item key="mail"> // Menu item with a unique key (should be unique, but is duplicated here)
      <a href="/subscription">Subscription</a> // Anchor tag for navigation to the subscription page
    </Menu.Item>
 
  </Menu>
  )
}

export default LeftMenu // Exporting LeftMenu component for use in other files