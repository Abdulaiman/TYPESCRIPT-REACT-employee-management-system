import React from "react";
import Dashboard from "./components/dashboard/dashboard-component";
import Login from "./components/login/login-component";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protected-route/protected-route-component";
import NavBar from "./components/nav-component/nav-component";
import "./App.css";

const App: React.FC = (): JSX.Element => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <>
              <NavBar />
              <Dashboard />
            </>
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
