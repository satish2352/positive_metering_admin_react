

////sos
////logout without logout api . remove token
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      localStorage.removeItem("accessToken");
      toast.success("Logged out successfully.");
    } 
    navigate("/");
  }, [navigate]);

  return null;
};

export default Logout;