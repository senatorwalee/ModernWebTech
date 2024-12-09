import React from "react";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";

const SidebarComponent = () => {
  return (
    <div style={styles.sidebarContainer}>
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        style={styles.sidebar}
      >
        <Sidebar.Items style={styles.sidebarItems}>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            
            <Sidebar.Item icon={HiInbox}>
              <Link to="/dashboard">Home</Link>
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiShoppingBag} label="Product Categories">
              <Sidebar.Item as="div">
                <Link to="/dashboard/categories/itemlist/Furniture">Furniture</Link>
              </Sidebar.Item>
              <Sidebar.Item as="div">
                <Link to="/dashboard/categories/itemlist/Electronics">Electronics</Link>
              </Sidebar.Item>
              <Sidebar.Item as="div">
                <Link to="/dashboard/categories/itemlist/Clothing">Clothing</Link>
              </Sidebar.Item>
              <Sidebar.Item as="div">
                <Link to="/dashboard/categories/itemlist/Books">Books</Link>
              </Sidebar.Item>
              <Sidebar.Item as="div">
                <Link to="/dashboard/categories/itemlist/Automobile">Automobile</Link>
              </Sidebar.Item>
              <Sidebar.Item as="div">
                <Link to="/dashboard/categories/itemlist/Home & Kitchen">Home&Kitchen</Link>
              </Sidebar.Item>
              <Sidebar.Item as="div">
                <Link to="/dashboard/categories/itemlist/Services">Services</Link>
              </Sidebar.Item>
              <Sidebar.Item as="div">
                <Link to="/dashboard/categories/itemlist/Others">Others</Link>
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item icon={HiInbox}>
              <Link to="/dashboard/addnewlistings">Add New Listing</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiInbox}>
              <Link to="/dashboard/mylistings">My Listings</Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiInbox}>
              <Link to="/dashboard/favorites">Saved listing</Link>
            </Sidebar.Item>

           
            <Sidebar.Item icon={HiTable} style={styles.signupItem}>
            <Link to="/">Sign Out</Link>

            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

// Inline styling to ensure sidebar extends full height and places 'Sign Up' at the bottom
const styles = {
  sidebarContainer: {
    height: "100vh", // Ensure the container takes full viewport height
    display: "flex",
    flexDirection: "column", // Stack items vertically
  },
  sidebar: {
    height: "100%", // Sidebar itself takes up full height
    position: "fixed", // Fix the sidebar on the left side
    top: 0,
    left: 0,
    width: "250px", // Adjust as per your design needs
  },
  sidebarItems: {
    display: "flex",
    flexDirection: "column", // Ensure items are stacked vertically
    justifyContent: "flex-start", // Keep normal order for the items
    height: "100%", // Ensure the sidebar items take up full height
  },
  signupItem: {
    paddingTop: "auto", // Push the Sign Up item to the bottom
  },
};

export default SidebarComponent;
