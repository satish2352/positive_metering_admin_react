
////added style to menus and submenus

import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import { Sidebar as MenuBar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  MdOutlineClose,
  MdHome,
  MdLogout,
  MdViewCarousel,
  MdIntegrationInstructions,
  MdLeaderboard,
  MdCategory,
} from "react-icons/md";
import { SiStorybook } from "react-icons/si";
import { GrLineChart, GrServices } from "react-icons/gr";
import { RiTeamFill } from "react-icons/ri";
import { LuNewspaper } from "react-icons/lu";
import { BsChatRightQuoteFill, BsBuildings } from "react-icons/bs";
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
        icon: <MdViewCarousel style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Hero Form",
        url: "/heroform",
        icon: <MdViewCarousel style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Upload CV",
        url: "/uploadcv",
        icon: <MdViewCarousel style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Home Slider",
        url: "/homeslider",
        icon: <MdViewCarousel style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Carousal",
        url: "/carousal",
        icon: <MdViewCarousel style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Carousal Form",
        url: "/carousalform",
        icon: <MdViewCarousel style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Contact sales Person",
        url: "/contactsalesperson",
        icon: <MdViewCarousel style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Get In Touch",
         url: "/getintouch",
        icon: <MdViewCarousel style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Request Callback Form",
         url: "/requestcallbackform",
        icon: <MdViewCarousel style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Subscribe",
         url: "/subscribe",
        icon: <MdViewCarousel style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Office",
        url: "/office",
        icon: <MdViewCarousel style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Testimonial",
        url: "/testimonial",
        icon: <BsChatRightQuoteFill style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Infrastructure",
        url: "/infrastructure",
        icon: <BsBuildings style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Bg Video Form",
        url: "/bgvideoform",
        icon: <BsBuildings style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "About",
    url: "/about",
    mainIcon: <MdIntegrationInstructions size={24} />,
    subMenu: [
      {
        subMenus: "Leadership",
        url: "/leadership",
        icon: <MdLeaderboard style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Our story",
        url: "/ourstory",
        icon: <SiStorybook style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Our Team",
        url: "/ourteam",
        icon: <RiTeamFill style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Project Title Name",
        url: "/projecttitilename",
        icon: <RiTeamFill style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "Product",
    url: "/product",
    mainIcon: <MdCategory size={24} />,
    subMenu: [
 
      {
        subMenus: "Product List",
        url: "/productlist",
        icon: <GrLineChart style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Product Name",
        url: "/productname",
        icon: <GrLineChart style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Product Details",
        url: "/productdetails",
        icon: <GrLineChart style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Technical Data",
        url: "/technicaldata",
        icon: <GrLineChart style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Options Data",
        url: "/optionsdata",
        icon: <GrLineChart style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Material Data ",
        url: "/materialdata",
        icon: <GrLineChart style={{ color: "red" }} size={24} />,
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
    mainIcon: <GrServices size={24} />,
    subMenu: [
      {
        subMenus: "Blog List",
        url: "/bloglist",
        icon: <GrLineChart style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Blog Details",
        url: "/blogdetails",
        icon: <GrLineChart style={{ color: "red" }} size={24} />,
      },
    ],
  },
  {
    menu: "News and Event",
    url: "/newsandevent",
    mainIcon: <LuNewspaper size={24} />,
    subMenu: [
      {
        subMenus: "News Event Cards",
        url: "/newsandeventcards",
        icon: <BsChatRightQuoteFill style={{ color: "red" }} size={24} />,
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
        icon: <BsChatRightQuoteFill style={{ color: "red" }} size={24} />,
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
