import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { replace, useLocation, useNavigate } from "react-router-dom";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("Users");
      toast.success("Logged out successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
      // window.location.href = "/";
      window.history.replaceState(null, "", "/UserHome");
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
