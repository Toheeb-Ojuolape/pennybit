import React from "react";
import Register from "./pages/Register";
import Gender from "./pages/Gender";
import ConfirmEmail from "./pages/ConfirmEmail";
import Dashboard from "./pages/Dashboard";
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
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<NewPassword />} />
        <Route path="/gender" element={<Gender />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
    </Router>
  );
};

export default App;
