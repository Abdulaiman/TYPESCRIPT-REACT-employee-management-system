import React from "react";
import Dashboard from "./components/dashboard/dashboard-component";
import Login from "./components/login/login-component";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protected-route/protected-route-component";
import NavBar from "./components/nav-component/nav-component";
import "./App.css";
import Staffs from "./components/staff/staff-component";
import SingleStaff from "./components/single-staff/single-staff-component";
import Department from "./components/department/department-component";
import Notice from "./components/notice/notice-component";
import Complaints from "./components/complaints/complaints-component";
import Leaves from "./components/leaves/leaves-component";
import SignUp from "./components/signUp/sign-up-component";
import NotVerified from "./components/not-verified/not-verified-component";

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
      <Route
        path="/staffs"
        element={
          <ProtectedRoute>
            <>
              <NavBar />
              <Staffs />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staffs/:id"
        element={
          <ProtectedRoute>
            <>
              <NavBar />
              <SingleStaff />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/departments"
        element={
          <ProtectedRoute>
            <>
              <NavBar />
              <Department />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notices"
        element={
          <ProtectedRoute>
            <>
              <NavBar />
              <Notice />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/complaints"
        element={
          <ProtectedRoute>
            <>
              <NavBar />
              <Complaints />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaves"
        element={
          <ProtectedRoute>
            <>
              <NavBar />
              <Leaves />
            </>
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/not-verified" element={<NotVerified />} />
    </Routes>
  );
};

export default App;
