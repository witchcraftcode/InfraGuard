import React from "react";
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import HomePage from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Routes>
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account" element={<Account />} />
            <Route path="/" element={<HomePage />} />
            {/* add other pages here later */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;