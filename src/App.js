import React from "react";
import Register from "./pages/Register";
import Gender from "./pages/Gender";
import ConfirmEmail from "./pages/ConfirmEmail";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import Verification from "./pages/Verification";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route path="/gender" element={<Gender />} />
        <Route path="/email" element={<ConfirmEmail />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </Router>
  );
};

export default App;
