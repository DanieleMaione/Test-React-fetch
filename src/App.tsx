import React from "react";
import { Route, Routes } from "react-router-dom";
import { Description } from "./view/Description";
import HomePage from "./view/HomePage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Document/:id" element={<Description />} />
    </Routes>
  );
};
