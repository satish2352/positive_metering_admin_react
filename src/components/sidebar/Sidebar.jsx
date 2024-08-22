import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import { Sidebar as MenuBar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { ShowContext } from "../../context/ShowContext";
import {
  MdOutlineClose,
  MdHome,
  MdLogout,
  MdOutlineContactMail,
  MdAccountBox,
  MdOutlinePermContactCalendar,
} from "react-icons/md";
import { SiStorybook } from "react-icons/si";
import { GrServices } from "react-icons/gr";
import { RiTeamFill, RiFileListLine, RiContactsBookLine } from "react-icons/ri";
import { FiUsers, FiList, FiFileText, FiUploadCloud } from "react-icons/fi";
import { AiOutlineAppstoreAdd, AiOutlineProject } from "react-icons/ai";
import {
  BsNewspaper,
  BsChatSquareQuote,
  BsBuilding,
  BsCameraVideo,
} from "react-icons/bs";
import { IoIosOptions, IoIosPeople } from "react-icons/io";
import { FaRegNewspaper, FaBusinessTime } from "react-icons/fa";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";
import { TitleContext } from "../../context/TitleContext";

const SidebarMenu = [
  {
    menu: "Home",
    url: "/dashboard",
    mainIcon: <MdHome size={24} />,
    subMenu: [
      {
        subMenus: "Header Contact",
        url: "/headercontact",
        icon: <RiContactsBookLine style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Home Sliding Media",
        url: "/carousal",
        icon: <RiFileListLine style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Image Slider",
        url: "/homeslider",
        icon: <AiOutlineProject style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Testimonial",
        url: "/testimonial",
        icon: <BsChatSquareQuote style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "About",
    url: "/about",
    mainIcon: <RiTeamFill size={24} />,
    subMenu: [
      {
        subMenus: "Infrastructure",
        url: "/infrastructure",
        icon: <BsBuilding style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Our Team",
        url: "/ourteam",
        icon: <FiUsers style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "Product",
    url: "/product",
    mainIcon: <FiList size={24} />,
    subMenu: [
      {
        subMenus: "Product Details",
        url: "/productdetails",
        icon: <IoIosOptions style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Product Images",
        url: "/productimages",
        icon: <IoIosOptions style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Models",
        url: "/technicaldata",
        icon: <FiFileText style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Accessories & Optional",
        url: "/optionsdata",
        icon: <IoIosOptions style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Material Data",
        url: "/materialdata",
        icon: <RiFileListLine style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Application Data",
        url: "/applicationdata",
        icon: <RiFileListLine style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "Blog",
    url: "/blog",
    mainIcon: <FaRegNewspaper size={24} />,
    subMenu: [
      {
        subMenus: "Blog Details",
        url: "/blogdetails",
        icon: <FaRegNewspaper style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "News and Event",
    url: "/newsandevent",
    mainIcon: <BsNewspaper size={24} />,
    subMenu: [
      {
        subMenus: "News",
        url: "/news",
        icon: <BsNewspaper style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Events",
        url: "/events",
        icon: <BsNewspaper style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "Contact Us",
    url: "/contactus",
    mainIcon: <MdOutlinePermContactCalendar size={24} />,
    subMenu: [
      {
        subMenus: "Contact Sales Person",
        url: "/contactsalesperson",
        icon: <AiOutlineAppstoreAdd style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Our Offices",
        url: "/office",
        icon: <BsBuilding style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "Contact Person Details",
    url: "/contactus",
    mainIcon: <MdOutlinePermContactCalendar size={24} />,
    subMenu: [
      {
        subMenus: "User Data List",
        url: "/carousalform",
        icon: <RiFileListLine style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Cv List",
        url: "/uploadcv",
        icon: <FiUploadCloud style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Subscriber List",
        url: "/subscribe",
        icon: <MdAccountBox style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "Logout",
    url: "/logout",
    mainIcon: <MdLogout size={24} />,
    subMenu: [],
  },
];



////savita mam code 

// const Sidebar = ({setButtonText, setTableView}) => {
//   const { isSidebarOpen, closeSidebar, setActiveMenu, activeMenuName } =
//     useContext(SidebarContext);
//   const { setTitle } = useContext(TitleContext);
//   const navbarRef = useRef(null);
//   const [activeSubMenu, setActiveSubMenu] = useState("");

//   const handleClickOutside = (event) => {
//     if (
//       navbarRef.current &&
//       !navbarRef.current.contains(event.target) &&
//       event.target.className !== "sidebar-open-btn"
//     ) {
//       closeSidebar();
//     }
//   };

//   const handleResize = () => {
//     if (window.innerWidth <= 1200) {
//       closeSidebar();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     window.addEventListener("resize", handleResize);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     setTitle(activeMenuName);
//   }, [activeMenuName, setTitle]);

//   const handleMenuClick = (menu) => {
//     setActiveMenu(menu);
//     setActiveSubMenu(""); // Reset active submenu when a menu is clicked
//     setTitle(menu); // Update title when menu is clicked
//   };

//   const handleSubMenuClick = (subMenu, parentMenu) => {
//     setButtonText("View")
//     setTableView(false)
//     setTitle(subMenu);
//     setActiveSubMenu(subMenu);
//     setActiveMenu(parentMenu); // Set the parent menu as active
//   };

//   return (
//     <nav
//       ref={navbarRef}
//       className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
//     >
//       <div className="sidebar-top">
//         <div className="sidebar-brand">
//           <img className="w-25" src={logo} alt="Logo" />
//           <span className="sidebar-brand-text text-danger">
//             Positive Metering Pvt Ltd
//           </span>
//         </div>
//         <Button
//           variant="outline-danger"
//           className="sidebar-close-btn"
//           onClick={closeSidebar}
//         >
//           <MdOutlineClose size={24} />
//         </Button>
//       </div>
//       <div className="sidebar-body">
//         <div className="sidebar-menu">
//           <MenuBar>
//             <Menu>
//               {SidebarMenu.map((item, id) => (
//                 <div key={id}>
//                   {item.subMenu.length > 0 ? (
//                     <SubMenu
//                       className={`menu-link-text bg-white ${
//                         activeMenuName === item.menu ? "active" : ""
//                       }`}
//                       icon={item.mainIcon}
//                       label={item.menu}
//                       open={activeMenuName === item.menu}
//                       onClick={() => handleMenuClick(item.menu)}
//                     >
//                       {item.subMenu.map((sub, subId) => (
//                         <MenuItem
//                           key={subId}
//                           className={`menu-link-text ${
//                             activeSubMenu === sub.subMenus ? "active" : ""
//                           }`}
//                           icon={sub.icon}
//                           component={<Link to={sub.url} />}
//                           onClick={() =>
//                             handleSubMenuClick(sub.subMenus, item.menu)
//                           }
//                         >
//                           {sub.subMenus}
//                         </MenuItem>
//                       ))}
//                     </SubMenu>
//                   ) : (
//                     <MenuItem
//                       className={`menu-link-text bg-white ${
//                         activeMenuName === item.menu ? "active" : ""
//                       }`}
//                       icon={item.mainIcon}
//                       component={<Link to={item.url} />}
//                       onClick={() => handleMenuClick(item.menu)}
//                     >
//                       {item.menu}
//                     </MenuItem>
//                   )}
//                 </div>
//               ))}
//             </Menu>
//           </MenuBar>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Sidebar;










////v1
const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const { setTitle } = useContext(TitleContext);
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");

  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  const handleResize = () => {
    if (window.innerWidth <= 1200) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setActiveSubMenu(""); // Reset active submenu when a menu is clicked
  };

  const handleSubMenuClick = (subMenu) => {
    setTitle(subMenu);
    setActiveSubMenu(subMenu);
  };

  return (
    <nav ref={navbarRef} className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img className="w-25" src={logo} alt="Logo" />
          <span className="sidebar-brand-text text-danger">
            Positive Metering Pvt Ltd
          </span>
        </div>
        <Button
          variant="outline-danger"
          className="sidebar-close-btn"
          onClick={closeSidebar}
        >
          <MdOutlineClose size={24} />
        </Button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <MenuBar>
            <Menu>
              {SidebarMenu.map((item, id) => (
                <div key={id}>
                  {item.subMenu.length > 0 ? (
                    <SubMenu
                      className={`menu-link-text bg-white ${
                        activeMenu === item.menu ? "active" : ""
                      }`}
                      icon={item.mainIcon}
                      label={item.menu}
                    >
                      {item.subMenu.map((subItem, subId) => (
                        <div
                          key={subId}
                          className={`menu-link-text bg-white ${
                            activeSubMenu === subItem.subMenus ? "active" : ""
                          }`}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSubMenuClick(subItem.subMenus)}
                        >
                          <Link
                            to={subItem.url}
                            className="text-decoration-none text-black"
                          >
                            <MenuItem icon={subItem.icon}>
                              {subItem.subMenus}
                            </MenuItem>
                          </Link>
                        </div>
                      ))}
                    </SubMenu>
                  ) : (
                    <div
                      key={id}
                      className={`menu-link-text bg-white ${
                        activeMenu === item.menu ? "active" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleMenuClick(item.menu)}
                    >
                      <Link
                        to={item.url}
                        className="text-decoration-none text-black"
                      >
                        <MenuItem icon={item.mainIcon}>{item.menu}</MenuItem>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </Menu>
          </MenuBar>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;