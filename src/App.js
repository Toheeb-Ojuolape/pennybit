import React from "react";
import Register from "./pages/Register";
import Gender from "./pages/Gender";
import ConfirmEmail from "./pages/ConfirmEmail";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/gender" element={<Gender />} />
        <Route path="/email" element={<ConfirmEmail />} />
      </Routes>
    </Router>
  );
};

export default App;
