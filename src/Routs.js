import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import CarAdd from "./CarAdd";
import Favorities from "./Favorities";
import CarItem from "./CarItem";

const Routs = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/CarAdd" element={<CarAdd />} />
        <Route path="/CarItem/:id" element={<CarItem />} />
        <Route path="/Favorities" element={<Favorities />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Routs;
