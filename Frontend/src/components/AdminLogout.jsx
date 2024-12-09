import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth1 } from "../context/AuthProvider1";

function Logout() {
  const [authAdmin, setAuthAdmin] = useAuth1();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      setAuthAdmin({
        ...authAdmin,
        admin: null,
      });
      localStorage.removeItem("Admin");
      toast.success("Logged out successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // window.location.href = "/";
      window.history.replaceState(null, "", "/adminHome");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Error: " + error.message);
      setTimeout(() => {}, 3000);
    }
  };
  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
