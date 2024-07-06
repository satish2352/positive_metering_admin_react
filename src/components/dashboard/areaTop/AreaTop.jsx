// import { MdOutlineMenu } from "react-icons/md";
// import "./AreaTop.scss";
// import { useContext, useEffect, useRef, useState } from "react";
// import { SidebarContext } from "../../../context/SidebarContext";
// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { addDays } from "date-fns";
// import { DateRange } from "react-date-range";
// import { TitleContext } from "../../../context/TitleContext";
// import { Button } from "react-bootstrap";
// import { ShowContext } from "../../../context/ShowContext";

// const AreaTop = () => {
//   const { openSidebar } = useContext(SidebarContext);
//   const { title } = useContext(TitleContext)
//   const { setShows } = useContext(ShowContext)
//   const [status, setStatus] = useState(false)
//   const [state, setState] = useState([
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date(), 7),
//       key: "selection",
//     },
//   ]);

//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const dateRangeRef = useRef(null);

//   const handleInputClick = () => {
//     setShowDatePicker(true);
//   };

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
//         <h2 className="area-top-title">{title || "Carousel"}</h2>
//       </div>
//       <div className="area-top-r">
//         <Button onClick={() => setShows(true)} variant="outline-primary">Success</Button>

//       </div>
//     </section>
//   );
// };

// export default AreaTop;




//t1
import { MdOutlineMenu } from "react-icons/md";
import "./AreaTop.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import { TitleContext } from "../../../context/TitleContext";
import { Button } from "react-bootstrap";
import { ShowContext } from "../../../context/ShowContext";

const AreaTop = () => {
  const { openSidebar } = useContext(SidebarContext);
  const { title } = useContext(TitleContext)
  const { toggleShows } = useContext(ShowContext)
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRangeRef = useRef(null);

  const handleInputClick = () => {
    setShowDatePicker(true);
  };

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
        <h2 className="area-top-title">{title || "Carousel"}</h2>
      </div>
      <div className="area-top-r">
        <Button onClick={toggleShows} variant="outline-primary">Success</Button>
      </div>
    </section>
  );
};

export default AreaTop;