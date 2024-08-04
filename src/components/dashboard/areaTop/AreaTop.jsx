// ////sos  working


// import { useContext, useEffect, useRef, useState } from "react";
// import { SidebarContext } from "../../../context/SidebarContext";
// import { TitleContext } from "../../../context/TitleContext";
// import { Button } from "react-bootstrap";
// import { ShowContext } from "../../../context/ShowContext";
// import { useLocation } from "react-router-dom";
// import { MdOutlineMenu } from "react-icons/md";
// import { addDays } from "date-fns";
// import "./AreaTop.scss";

// const AreaTop = () => {
//   const { openSidebar, activeMenuName } = useContext(SidebarContext);
//   const { title, setTitle } = useContext(TitleContext);
//   const { toggleShows } = useContext(ShowContext);
//   const [state, setState] = useState([
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date(), 7),
//       key: "selection",
//     },
//   ]);

//   const [buttonText, setButtonText] = useState("Add");
//   const dateRangeRef = useRef(null);
//   const location = useLocation();

//   const handleClickOutside = (event) => {
//     if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
//       setShowDatePicker(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     setTitle(activeMenuName);
//   }, [activeMenuName, setTitle]);

//   const handleButtonClick = () => {
//     toggleShows();
//     setButtonText((prevText) => (prevText === "View" ? "Add" : "View"));
//   };

//   const hiddenPaths = [
//     "/subscribe",
//     "/carousalform",
//     "/requestcallbackform",
//     "/uploadcv",
//     "/getintouch",
//     "/subscribe",
//     "/headercontact",
//   ];
//   const isHiddenPath = hiddenPaths.includes(location.pathname);

//   return (
//     <section className="content-area-top bg-white p-3 mb-3">
//       <div className="area-top-l">
//         <button
//           className="sidebar-open-btn"
//           type="button"
//           onClick={openSidebar}
//         >
//           <MdOutlineMenu size={24} />
//         </button>
//         <h2 className="area-top-title">{title || activeMenuName}</h2>
//       </div>
//       <div className="area-top-r">
//         {!isHiddenPath && (
//           <Button onClick={handleButtonClick} variant="outline-danger">
//             {buttonText}
//           </Button>
//         )}
//       </div>
//     </section>
//   );
// };

// export default AreaTop;











////sir code
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import { TitleContext } from "../../../context/TitleContext";
import { ShowContext } from "../../../context/ShowContext";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { addDays } from "date-fns";

import "./AreaTop.scss";

const AreaTop = () => {
  const { openSidebar, activeMenuName } = useContext(SidebarContext);
  const [headerName, setHeader] = useState("");
  const { title, setTitle } = useContext(TitleContext);
  const { toggleShows } = useContext(ShowContext);
  const [buttonText, setButtonText] = useState("View");
  const dateRangeRef = useRef(null);
  const location = useLocation();


  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTitle(activeMenuName);
  }, [activeMenuName, setTitle]);



  const handleButtonClick = () => {
    toggleShows();
    setButtonText((prevText) => (prevText === "View" ? "Add" : "View"));
  };

  const hiddenPaths = [
    "/subscribe",
    "/carousalform",
    "/requestcallbackform",
    "/uploadcv",
    "/getintouch",
    "/subscribe",
    "/headercontact",
  ];
  const isHiddenPath = hiddenPaths.includes(location.pathname);
  // let headerName = (window.location.pathname).replace(/^\/+/, '');
  useEffect(() => {
    if (window.location.pathname == "/testimonial") {
      setHeader("Testimonial");
    } 
    else if (window.location.pathname == "/headercontact") {
      setHeader("Header Contact");
    }
    else if (window.location.pathname == "/homeslider") {
      setHeader("Image Slider");
    }
    else if (window.location.pathname == "/carousal") {
      setHeader("Carousal");
    }
    else if (window.location.pathname == "/infrastructure") {
      setHeader("Infrastructure");
    }

    else if (window.location.pathname == "/ourteam") {
      setHeader("Our Team");
    }
    else if (window.location.pathname == "/productname") {
      setHeader("Product Name");
    }
    else if (window.location.pathname == "/productdetails") {
      setHeader("Product Details");
    }
    else if (window.location.pathname == "/technicaldata") {
      setHeader("Technical Data");
    }
    else if (window.location.pathname == "/optionsdata") {
      setHeader("Options Data");
    }
    else if (window.location.pathname == "/materialdata") {
      setHeader("Material Data");
    }
    else if (window.location.pathname == "/blogdetails") {
      setHeader("Blog Details");
    }
    else if (window.location.pathname == "/news") {
      setHeader("News");
    }
    else if (window.location.pathname == "/events") {
      setHeader("Events");
    }
    else if (window.location.pathname == "/contactsalesperson") {
      setHeader("Contact Sales Person");
    }
    else if (window.location.pathname == "/office") {
      setHeader("Our Offices");
    }
    else if (window.location.pathname == "/carousalform") {
      setHeader("User Data");
    }
    else if (window.location.pathname == "/requestcallbackform") {
      setHeader("Request Callback Form");
    }
    else if (window.location.pathname == "/office") {
      setHeader("Our Offices");
    }
    else if (window.location.pathname == "/getintouch") {
      setHeader("Get In Touch");
    }
    else if (window.location.pathname == "/subscribe") {
      setHeader("Subscribe");
    }
    else if (window.location.pathname == "/uploadcv") {
      setHeader("Cv List");
    }
    else if (window.location.pathname == "/applicationdata") {
      setHeader("Application Data");
    }
  }, [window.location.pathname]);
  return (
    <section className="content-area-top bg-white p-3 mb-3">
      <div className="area-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="area-top-title text-capitalize">{headerName}</h2>
      </div>
      <div className="area-top-r">
        {!isHiddenPath && (
          <Button onClick={handleButtonClick} variant="outline-danger">
            {buttonText}
          </Button>
        )}
      </div>
    </section>
  );
};

export default AreaTop;
