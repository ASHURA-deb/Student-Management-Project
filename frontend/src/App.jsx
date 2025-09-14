import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import AddStudent from "./Pages/AddStudent";
import ManageStudent from "./Pages/ManageStudent";
import Students from "./Components/Students";
import { useState, useEffect } from "react";
import PrivateRoute from "./PrivateRoute";
import { Toaster } from "sonner";
import { MantineProvider } from '@mantine/core';
import Switch from "./Components/Switch";
import StudentDashboard from "./Pages/StudentDashboard";
import ThemeToggle from './Components/ThemeToggle'


function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/students");
        setStudents(res.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <>
    <MantineProvider>
      <Toaster position="top-right" />
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
          />
                  <Route
          path="/StudentDashboard"
          element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          }
          />
        <Route
          path="/students"
          element={
            <PrivateRoute>
              <Students students={students} />
            </PrivateRoute>
          }
          />
        <Route
          path="/students/add"
          element={
            <PrivateRoute>
              <AddStudent />
            </PrivateRoute>
          }
          />
        <Route
          path="/students/manage"
          element={
            <PrivateRoute>
              <ManageStudent />
            </PrivateRoute>
          }
          />

        {/* Fallback route */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </MantineProvider>
    </>
  );
}

export default App;