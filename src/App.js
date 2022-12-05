import React from "react";
import Register from "./pages/Register";
import ConfirmEmail from "./pages/ConfirmEmail";
import Dashboard from "./pages/Dashboard";
import Wallet from "./pages/Wallet";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "reactjs-popup/dist/index.css";
import { ToastContainer, Slide } from "react-toastify";
import { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
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
    <PersistGate loading={null} persistor={persistor}>
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
          <Route path="/reset-password/:token" element={<NewPassword />} />
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/verification" element={<Verification />} />
        </Routes>
      </Router>
      <ToastContainer toastStyle={{ color: "white" }} icon={false} closeButton={false} hideProgressBar={true} transition={Slide} autoClose={1000} />
    </PersistGate>
  );
};

export default App;
