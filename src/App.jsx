////sos
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import Carausal from "./screens/submenus/Carausal";
import Leadership from "./screens/submenus/Leadership";
import Infrastructure from "./screens/submenus/Infrastructure";
import OurStory from "./screens/submenus/OurStory";
import OurTeam from "./screens/submenus/OurTeam";

import NewsAndEventCards from "./screens/submenus/NewAndEventCards";

import HeaderContact from "./screens/submenus/HeaderContact";
import HeroForm from "./screens/submenus/HeroForm";

import BgVideoForm from "./screens/submenus/BgVideoForm";
import BlogList from "./screens/submenus/BlogList";
import ProductList from "./screens/submenus/ProductList";
import BlogDetails from "./screens/submenus/BlogDetails";

import Register from "./screens/submenus/Register";
import Login from "./screens/submenus/Login";
import Testimonial from "./screens/submenus/Testimonial";
import UploadCv from "./screens/submenus/UploadCv";
import HomeSlider from "./screens/submenus/HomeSlider";
import CarousalForm from "./screens/submenus/CarousalForm";
import Office from "./screens/submenus/Office";
import ContactSalesPerson from "./screens/submenus/ContactSalesPerson";
import GetInTouch from "./screens/submenus/GetInTouch";
import RequestCallbackForm from "./screens/submenus/RequestCallbackForm";
import Subscribe from "./screens/submenus/Subscribe";
import ProductName from "./screens/submenus/ProductName";
import ProductDetails from "./screens/submenus/ProductDetails";
import TechnicalData from "./screens/submenus/TechnicalData";
import OptionsData from "./screens/submenus/OptionsData";
import ProjectTitleName from "./screens/submenus/ProjectTitleName";
import MaterialData from "./screens/submenus/MaterialData";
import Logout from "./screens/submenus/Logout";
import { Sidebar } from "./components";
import ProtectedRoutes from "./api/ProtectedRoutes";

function App() {
  return (
    <>
      <ToastContainer autoClose={2000}/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<BaseLayout />}>
          {/* submenus */}

         
          <Route
            path="/dashboard"
            element={<ProtectedRoutes Component={Dashboard} />}
          />
          <Route
            path="/carousal"
            element={<ProtectedRoutes Component={Carausal} />}
          />
          <Route
            path="/infrastructure"
            element={<ProtectedRoutes Component={Infrastructure} />}
          />
          <Route
            path="/ourstory"
            element={<ProtectedRoutes Component={OurStory} />}
          />
          <Route
            path="/ourteam"
            element={<ProtectedRoutes Component={OurTeam} />}
          />
          <Route
            path="/testimonial"
            element={<ProtectedRoutes Component={Testimonial} />}
          />
          <Route
            path="/leadership"
            element={<ProtectedRoutes Component={Leadership} />}
          />
          <Route
            path="/newsandeventcards"
            element={<ProtectedRoutes Component={NewsAndEventCards} />}
          />
          <Route
            path="/headercontact"
            element={<ProtectedRoutes Component={HeaderContact} />}
          />
          <Route
            path="/heroform"
            element={<ProtectedRoutes Component={HeroForm} />}
          />
          <Route
            path="/homeslider"
            element={<ProtectedRoutes Component={HomeSlider} />}
          />
          <Route
            path="/bgvideoform"
            element={<ProtectedRoutes Component={BgVideoForm} />}
          />
          <Route
            path="/bloglist"
            element={<ProtectedRoutes Component={BlogList} />}
          />
          <Route
            path="/productlist"
            element={<ProtectedRoutes Component={ProductList} />}
          />
          <Route
            path="/blogdetails"
            element={<ProtectedRoutes Component={BlogDetails} />}
          />
          <Route
            path="/register"
            element={<ProtectedRoutes Component={Register} />}
          />
          <Route
            path="/uploadcv"
            element={<ProtectedRoutes Component={UploadCv} />}
          />
          <Route
            path="/carousalform"
            element={<ProtectedRoutes Component={CarousalForm} />}
          />
          <Route
            path="/office"
            element={<ProtectedRoutes Component={Office} />}
          />
          <Route
            path="/contactsalesperson"
            element={<ProtectedRoutes Component={ContactSalesPerson} />}
          />
          <Route
            path="/getintouch"
            element={<ProtectedRoutes Component={GetInTouch} />}
          />
          <Route
            path="/requestcallbackform"
            element={<ProtectedRoutes Component={RequestCallbackForm} />}
          />
          <Route
            path="/subscribe"
            element={<ProtectedRoutes Component={Subscribe} />}
          />
          <Route
            path="/productname"
            element={<ProtectedRoutes Component={ProductName} />}
          />
          <Route
            path="/productdetails"
            element={<ProtectedRoutes Component={ProductDetails} />}
          />
          <Route
            path="/technicaldata"
            element={<ProtectedRoutes Component={TechnicalData} />}
          />
          <Route
            path="/optionsdata"
            element={<ProtectedRoutes Component={OptionsData} />}
          />
          <Route
            path="/materialdata"
            element={<ProtectedRoutes Component={MaterialData} />}
          />
          <Route
            path="/projecttitilename"
            element={<ProtectedRoutes Component={ProjectTitleName} />}
          />
          <Route
            path="/logout"
            element={<ProtectedRoutes Component={Logout} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
