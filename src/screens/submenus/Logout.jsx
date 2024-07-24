// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import instance from "../../api/AxiosInstance";
// import { toast } from "react-toastify";

// const Logout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const logout = async () => {
//       try {
//         await instance.post('/logout'); // Adjust the URL if needed
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("user");
//         toast.success("Logged out successfully.");
//         navigate("/login");
//       } catch (error) {
//         toast.error("Failed to logout.");
//         console.error(error);
//       }
//     };

//     logout();
//   }, [navigate]);

//   return null; 
// };

// export default Logout;



////logout without logout api . remove token
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove tokens and user information from local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    // Notify user of successful logout
    toast.success("Logged out successfully.");

    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return null; 
};

export default Logout;