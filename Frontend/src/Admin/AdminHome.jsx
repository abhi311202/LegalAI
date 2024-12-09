import React from "react";
import Navbar1 from "../components/Navbar1";
import AdminHome1 from "./AdminHome1";

function AdminHome() {
  return (
    <>
      <div className="dark:bg-[#222] dark:text-white">
        <Navbar1 />
        <AdminHome1 />
      </div>
    </>
  );
}

export default AdminHome;
