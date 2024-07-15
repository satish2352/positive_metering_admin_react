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
import TechnicalData from "./screens/submenus/TechnicalData";
import Testemonial from "./screens/submenus/Testemonial";

import NewsAndEventCards from "./screens/submenus/NewAndEventCards";

import HeaderContact from "./screens/submenus/HeaderContact";
import HeroForm from "./screens/submenus/HeroForm";
import Slider from "./screens/submenus/Slider";
import BgVideoForm from "./screens/submenus/BgVideoForm";
import BlogList from "./screens/submenus/BlogList";
import ProductList from "./screens/submenus/ProductList";
import BlogDetails from "./screens/submenus/BlogDetails";
import Login from "./screens/submenus/Login";
import Register from "./screens/submenus/Register";

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
          <Route path="/technicaldata" element={<TechnicalData />} />
          <Route path="/testemonial" element={<Testemonial />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/newsandeventcards" element={<NewsAndEventCards />} />
          <Route path="/headercontact" element={<HeaderContact />} />
          <Route path="/heroform" element={<HeroForm />} />
          <Route path="/slider" element={<Slider />} />
          <Route path="/bgvideoform" element={<BgVideoForm />} />
          <Route path="/bloglist" element={<BlogList />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/blogdetails" element={<BlogDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>

 
    </>
  );
}

export default App;
