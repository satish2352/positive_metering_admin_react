

////sos
////logout without logout api . remove token
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    toast.success("Logged out successfully.");

    navigate("/login");
  }, [navigate]);

  return null; 
};

export default Logout;