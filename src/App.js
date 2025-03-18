import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "./components/home/Home";
import Aboutus from "./components/Aboutus";
import ContactUs from "./components/Contact";
import Product from "./components/product/Product";
import Subproduct from "./components/product/Subproduct";
import Servingdiverse from "./components/home/Servingdiverse";

function App() {
  return (
    <div className="hideenscrollmain overflow-auto h-[100vh]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servingdiverse" element={<Servingdiverse />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/product" element={<Product />} />
          <Route
            path="/subproduct/:productId/:categoryType"
            element={<Subproduct />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
