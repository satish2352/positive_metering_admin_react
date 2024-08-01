// ////sos  working

// ////done changes based on CTO
// import { MdOutlineMenu } from "react-icons/md";
// import "./AreaTop.scss";
// import { useContext, useEffect, useRef, useState } from "react";
// import { SidebarContext } from "../../../context/SidebarContext";
// import { addDays } from "date-fns";
// import { TitleContext } from "../../../context/TitleContext";
// import { Button } from "react-bootstrap";
// import { ShowContext } from "../../../context/ShowContext";
// import { useLocation } from "react-router-dom";

// const AreaTop = () => {
//   const { openSidebar } = useContext(SidebarContext);
//   const { title } = useContext(TitleContext);
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

//   const handleButtonClick = () => {
//     toggleShows();
//     setButtonText((prevText) => (prevText === "View" ? "Add" : "View"));
//   };

//   //hidden from this
 
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
       
//         <h2 className="area-top-title">{title }</h2>
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



















////v2
import { MdOutlineMenu } from "react-icons/md";
import "./AreaTop.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import { addDays } from "date-fns";
import { TitleContext } from "../../../context/TitleContext";
import { Button } from "react-bootstrap";
import { ShowContext } from "../../../context/ShowContext";
import { useLocation } from "react-router-dom";

const AreaTop = () => {
  const { openSidebar, activeMenuName } = useContext(SidebarContext);
  const { title, setTitle } = useContext(TitleContext);
  const { toggleShows } = useContext(ShowContext);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [buttonText, setButtonText] = useState("Add");
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
    // Set the title in AreaTop based on SidebarContext
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
       
        <h2 className="area-top-title">{title || activeMenuName}</h2>
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