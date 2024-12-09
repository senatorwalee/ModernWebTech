import React from 'react';
import Navbar from './Navbar';
import SidebarComponent from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Sidebar and Main content */}
      <div style={styles.layout}>
        <SidebarComponent />
        
        <div style={styles.content}>
          {/* Render nested routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex', // Use flexbox to lay out sidebar and content side by side
    marginTop: '60px', // Add margin to account for the fixed navbar height
  },
  content: {
    marginLeft: '250px', // Offset the content to the right of the sidebar
    padding: '20px',
    width: 'calc(100% - 250px)', // Adjust content width to fill remaining space
    height: '100vh',
    overflowY: 'auto', // Allow content to scroll if it overflows
  }
};

export default Layout;
