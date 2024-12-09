import React from "react";
import LogIn from "./Components/LogIn";
import AddNewPost from "./Components/AddNewPost";
import Layout from "./Components/HomePageLayout/Layout";
import SignupForm from "./Components/Signup";
import Favorites from "./Components/Favorites";
import { Furnitures } from "./Components/ProductCategories/Furnitures";
import PostingDetails from "./Components/PostingDetails";
import { Electronics } from "./Components/ProductCategories/Electronics";
import { Clothing } from "./Components/ProductCategories/Clothing";
import { Books } from "./Components/ProductCategories/Books";
import { Automobile } from "./Components/ProductCategories/Automobile";
import { Others } from "./Components/ProductCategories/Others";
import Itemlist from "./Components/Itemlist";
import Postings from "./Components/HomePageLayout/Postings";
import MyPostings from "./Components/MyPostings";
import UpdatePosting from "./Components/UpdatePosting";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignupForm />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Layout />}>
          {/* Nested Routes */}
          <Route index element={<Postings />} />
          <Route path="addnewlistings" element={<AddNewPost />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="mylistings" element={<MyPostings />} />
          <Route path="postingdetails/:id" element={<PostingDetails />} />
          <Route path="categories/itemlist/:category" element={<Itemlist />} />
          <Route path="postings/:id" element={<PostingDetails />} />
          <Route path="editlisting/:listingId" element={<UpdatePosting />} />
          
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
