
// ////added style to menus and submenus
//// new icon
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import { Sidebar as MenuBar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  MdOutlineClose,
  MdHome,
  MdLogout,
  MdOutlineContactMail,
  MdAccountBox,
} from "react-icons/md";
import { SiStorybook } from "react-icons/si";
import { GrServices } from "react-icons/gr";
import { RiTeamFill, RiFileListLine, RiContactsBookLine } from "react-icons/ri";
import { FiUsers, FiList, FiFileText, FiUploadCloud } from "react-icons/fi";
import { AiOutlineAppstoreAdd, AiOutlineProject } from "react-icons/ai";
import { BsNewspaper, BsChatSquareQuote, BsBuilding, BsCameraVideo } from "react-icons/bs";
import { IoIosOptions, IoIosPeople } from "react-icons/io";
import { FaRegNewspaper } from "react-icons/fa";
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
        subMenus: "Hero Form",
        url: "/heroform",
        icon: <AiOutlineAppstoreAdd style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Upload CV",
        url: "/uploadcv",
        icon: <FiUploadCloud style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Home Slider",
        url: "/homeslider",
        icon: <AiOutlineProject style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Carousal",
        url: "/carousal",
        icon: <RiFileListLine style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Carousal Form",
        url: "/carousalform",
        icon: <RiFileListLine style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Contact Sales Person",
        url: "/contactsalesperson",
        icon: <AiOutlineAppstoreAdd style={{ color: "red" }} size={24} />,
      },
  
      {
        subMenus: "Request Callback Form",
        url: "/requestcallbackform",
        icon: <MdOutlineContactMail style={{ color: "red" }} size={24} />,
      },
  
 
      {
        subMenus: "Testimonial",
        url: "/testimonial",
        icon: <BsChatSquareQuote style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Infrastructure",
        url: "/infrastructure",
        icon: <BsBuilding style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Bg Video Form",
        url: "/bgvideoform",
        icon: <BsCameraVideo style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "About",
    url: "/about",
    mainIcon: <RiTeamFill size={24} />,
    subMenu: [
      {
        subMenus: "Leadership",
        url: "/leadership",
        icon: <IoIosPeople style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Our Story",
        url: "/ourstory",
        icon: <SiStorybook style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Our Team",
        url: "/ourteam",
        icon: <FiUsers style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Project Title Name",
        url: "/projecttitlename",
        icon: <AiOutlineProject style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "Product",
    url: "/product",
    mainIcon: <FiList size={24} />,
    subMenu: [
      {
        subMenus: "Product List",
        url: "/productlist",
        icon: <RiFileListLine style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Product Name",
        url: "/productname",
        icon: <FiFileText style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Product Details",
        url: "/productdetails",
        icon: <IoIosOptions style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Technical Data",
        url: "/technicaldata",
        icon: <FiFileText style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Options Data",
        url: "/optionsdata",
        icon: <IoIosOptions style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Material Data",
        url: "/materialdata",
        icon: <RiFileListLine style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "Service",
    url: "/service",
    mainIcon: <GrServices size={24} />,
    subMenu: [],
  },
  {
    menu: "Blog",
    url: "/blog",
    mainIcon: <FaRegNewspaper size={24} />,
    subMenu: [
      {
        subMenus: "Blog List",
        url: "/bloglist",
        icon: <BsNewspaper style={{ color: "red" }} size={24} />,
      },
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
        subMenus: "News Event Cards",
        url: "/newsandeventcards",
        icon: <BsNewspaper style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "Contact Us",
    url: "/contactus",
    mainIcon: <GrServices size={24} />,
    subMenu: [
      {
        subMenus: "Get In Touch",
        url: "/getintouch",
        icon: <RiContactsBookLine style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Subscribe",
        url: "/subscribe",
        icon: <MdAccountBox style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Our Offices",
        url: "/office",
        icon: <BsBuilding style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "Login/Register",
    url: "/loginregister",
    mainIcon: <MdLogout size={24} />,
    subMenu: [
      {
        subMenus: "Login",
        url: "/login",
        icon: <MdLogout style={{ color: "red" }} size={24} />,
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
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
            <Menu className="">
              {SidebarMenu.map((item, id) => (
                <div key={id}>
                  {item.subMenu.length > 0 ? (
                    <SubMenu
                      className={`menu-link-text bg-white ${
                        activeMenu === item.menu ? "active" : ""
                      }`}
                      icon={item.mainIcon}
                      label={item.menu}
                      onClick={() => handleMenuClick(item.menu)}
                    >
                      {item.subMenu.map((subItem, subId) => (
                        <MenuItem
                          key={subId}
                          icon={subItem.icon}
                          className={`menu-link-text bg-white ${
                            activeSubMenu === subItem.subMenus ? "active" : ""
                          }`}
                          onClick={() => handleSubMenuClick(subItem.subMenus)}
                        >
                          <Link
                            to={subItem.url}
                            className="text-decoration-none text-black"
                          >
                            {subItem.subMenus}
                          </Link>
                        </MenuItem>
                      ))}
                    </SubMenu>
                  ) : (
                    <MenuItem
                      key={id}
                      icon={item.mainIcon}
                      className={`menu-link-text bg-white ${
                        activeMenu === item.menu ? "active" : ""
                      }`}
                      onClick={() => handleMenuClick(item.menu)}
                    >
                      <Link
                        to={item.url}
                        className="text-decoration-none text-black"
                      >
                        {item.menu}
                      </Link>
                    </MenuItem>
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





