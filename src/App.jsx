import { useContext, useEffect } from "react";
import "./App.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";

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


function App() {


  return (
    <>
     <ToastContainer />
      <Routes>
        <Route element={<BaseLayout />}>
          {/* submenus */}
          <Route path="/carousal" element={<Carausal />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/ourstory" element={<OurStory />} />
          <Route path="/ourteam" element={<OurTeam />} />
       
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/newsandeventcards" element={<NewsAndEventCards />} />
          <Route path="/headercontact" element={<HeaderContact />} />
          <Route path="/heroform" element={<HeroForm />} />
          <Route path="/homeslider" element={<HomeSlider />} />
          <Route path="/bgvideoform" element={<BgVideoForm />} />
          <Route path="/bloglist" element={<BlogList />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/blogdetails" element={<BlogDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/uploadcv" element={<UploadCv />} />
          <Route path="/carousalform" element={<CarousalForm />} />
          <Route path="/office" element={<Office />} />
          <Route path="/contactsalesperson" element={<ContactSalesPerson />} />
          <Route path="/getintouch" element={<GetInTouch />} />
          <Route path="/requestcallbackform" element={<RequestCallbackForm />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/productname" element={<ProductName />} />
          <Route path="/productdetails" element={<ProductDetails />} />
          <Route path="/technicaldata" element={<TechnicalData />} />
          <Route path="/optionsdata" element={<OptionsData />} />
          <Route path="/materialdata" element={<MaterialData />} />
          <Route path="/projecttitilename" element={<ProjectTitleName />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>

 
    </>
  );
}

export default App;
