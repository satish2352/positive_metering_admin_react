//sos
// import { createContext, useState } from "react";
// import { PropTypes } from "prop-types";

// export const SidebarContext = createContext({});

// export const SidebarProvider = ({ children }) => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const openSidebar = () => {
//     setSidebarOpen(true);
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   return (
//     <SidebarContext.Provider
//       value={{
//         isSidebarOpen,
//         openSidebar,
//         closeSidebar,
//       }}
//     >
//       {children}
//     </SidebarContext.Provider>
//   );
// };

// SidebarProvider.propTypes = {
//   children: PropTypes.node,
// };







//v1 sos
// SidebarContext.js
// import { createContext, useState } from "react";
// import { PropTypes } from "prop-types";

// export const SidebarContext = createContext({});

// export const SidebarProvider = ({ children }) => {
//   const [isSidebarOpen, setSidebarOpen] = useState(true); // Sidebar is open by default
//   const [activeSidebar, setActiveSidebar] = useState(""); // Initialize activeSidebar
//   const [activeMenuName, setActiveMenuName] = useState(""); // Track the active menu name

//   const openSidebar = () => {
//     setSidebarOpen(true);
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   const setActiveSidebarName = (name) => {
//     setActiveSidebar(name);
//   };

//   const setActiveMenu = (name) => {
//     setActiveMenuName(name);
//   };

//   return (
//     <SidebarContext.Provider
//       value={{
//         isSidebarOpen,
//         openSidebar,
//         closeSidebar,
//         activeSidebar,
//         setActiveSidebarName,
//         activeMenuName,
//         setActiveMenu,
//       }}
//     >
//       {children}
//     </SidebarContext.Provider>
//   );
// };

// SidebarProvider.propTypes = {
//   children: PropTypes.node,
// };







////v2
// import { createContext, useState, useEffect } from "react";
// import PropTypes from "prop-types";

// export const SidebarContext = createContext({});

// export const SidebarProvider = ({ children }) => {
//   const [isSidebarOpen, setSidebarOpen] = useState(true); // Sidebar is open by default
//   const [activeSidebar, setActiveSidebar] = useState("Header Contact"); // Default active sidebar
//   const [activeMenuName, setActiveMenuName] = useState("Header Contact"); // Default active menu

//   // Simulate user login
//   useEffect(() => {
//     // Assume user logs in and set default states here
//     setSidebarOpen(true);
//     setActiveSidebar("Header Contact");
//     setActiveMenuName("Header Contact");
//   }, []);

//   const openSidebar = () => {
//     setSidebarOpen(true);
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   const setActiveSidebarName = (name) => {
//     setActiveSidebar(name);
//   };

//   const setActiveMenu = (name) => {
//     setActiveMenuName(name);
//   };

//   return (
//     <SidebarContext.Provider
//       value={{
//         isSidebarOpen,
//         openSidebar,
//         closeSidebar,
//         activeSidebar,
//         setActiveSidebarName,
//         activeMenuName,
//         setActiveMenu,
//       }}
//     >
//       {children}
//     </SidebarContext.Provider>
//   );
// };

// SidebarProvider.propTypes = {
//   children: PropTypes.node,
// };








////v3
import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const SidebarContext = createContext({});

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Sidebar is open by default
  const [activeMenuName, setActiveMenuName] = useState("Header Contact"); // Default active menu

  // Simulate user login
  useEffect(() => {
    setSidebarOpen(true);
    setActiveMenuName("Header Contact");
  }, []);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const setActiveMenu = (name) => {
    setActiveMenuName(name);
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        activeMenuName,
        setActiveMenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
  children: PropTypes.node,
};