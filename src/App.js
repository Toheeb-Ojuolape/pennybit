import React from "react";
import Register from "./pages/Register";
import Gender from "./pages/Gender";
import ConfirmEmail from "./pages/ConfirmEmail";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import Verification from "./pages/Verification";
import Exchange from "./pages/Exchange";
import Learn from "./pages/Learn";
import Play from "./pages/Play";
import Account from "./pages/Account";
import VirtualCard from "./pages/VirtualCard";
import BitcoinAirtime from "./pages/BitcoinAirtime";
import GeneratePayment from "./pages/GeneratePayment";
import PaymentLink from "./pages/PaymentLink";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/play" element={<Play />} />
        <Route path="/account" element={<Account />} />
        <Route path="/card" element={<VirtualCard />} />
        <Route path="/bitcoinairtime" element={<BitcoinAirtime />} />
        <Route path="/generatepayment" element={<GeneratePayment />} />
        <Route path="/paymentlink" element={<PaymentLink />} />
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
