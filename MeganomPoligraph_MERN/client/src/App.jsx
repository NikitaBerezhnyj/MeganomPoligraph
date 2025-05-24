import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import AdminPage from "./Pages/AdminPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
