import React from "react";
import Home from "./Home/Home";
// import { Route, Routes } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import Courses from "./Courses/Courses";
// import Chatpage from "./ChatPage/ChatPage";
import DocumentSummarization from "./ChatPage/DocumentSummarization";
import DocumentClassification from "./ChatPage/DocumentClassification";
import Signup from "./components/Signup";

import { Toaster } from "react-hot-toast";
import AdminHome from "./Admin/AdminHome";
import { useAuth1 } from "./context/AuthProvider1";
import { useAuth } from "./context/AuthProvider";
import AdminLogin from "./components/AdminLogin";
import AdminHome1 from "./Admin/AdminHome1";
import Navbar1 from "./components/Navbar1";
import AdminSignup from "./components/AdminSignup";
import ExplorePage from "./User/ExplorePage";
import UserHome from "./User/UserHome";
import UserDashboard from "./User/UserDashboard";
import DocumentDetails from "./User/DocumentDetails";
import DocumentDetails2 from "./Admin/DocumentDetails2";


const App = () => {
  const [authAdmin, setAuthAdmin] = useAuth1();
  const [authUser, setAuthUser] = useAuth();
  const user = JSON.parse(localStorage.getItem("Users"));
  return (
    <>
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/ChatPage/DocumentSummarization"
            element={<DocumentSummarization />}
          />
          <Route
            path="/ChatPage/DocumentClassification"
            element={<DocumentClassification />}
          />
          <Route path="/:section" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />

          <Route path="/AdminSignup" element={<AdminSignup />} />
          <Route
            path="/adminHome"
            element={authAdmin ? <AdminHome /> : <AdminLogin />}
          />

          <Route path="/ExplorePage" element={<ExplorePage />} />
          <Route path="/UserHome" element={ authUser? <UserHome/> : <Home/> } />
          <Route path="/userdashboard" element={<UserDashboard/>} />
          <Route path="/document-details/:id" element={<DocumentDetails />} />
          <Route path="/document-details2/:id" element={<DocumentDetails2 />} />
          
        </Routes>
        <Toaster />
      </div>
    </>
  );
};

export default App;
