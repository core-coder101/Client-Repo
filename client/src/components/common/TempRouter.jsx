import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Login from "../Admin/Login.jsx";
import PublicRoute from "../Admin/Auth/PublicRoute.jsx";
import AdminTemplate from "../Admin/AdminTemplate.jsx";
import PrivateRoute from "../Admin/Auth/PrivateRoute.jsx";
import ManageClasses from "../Admin/ManageClasses.jsx";
import CreateClass from "../Admin/CreateClass.jsx";
import CreateTeacher from "../Admin/CreateTeacher.jsx";
import Dashboard from "../Admin/Dashboard.jsx";
import CreateStudent from "../Admin/CreateStudent.jsx";
import StudentInformation from "../Admin/StudentInformation.jsx";
import TeachersInformation from "../Admin/TeachersInformation.jsx";
import StudentAttendance from "../Admin/StudentAttendance.jsx";
import ClassDetails from "../Admin/ClassDetails.jsx";
import UploadLecture from "../Admin/UploadLecture.jsx";
import WatchVideoes from "../Admin/WatchVideos.jsx";
import StudentDashboard from "../Student/StudentDashboard.jsx";
import TeacherDashboard from "../Teacher/TeacherDashboard.jsx";
import RoleRoute from "./RoleRoute.jsx";

export default function TempRouter() {
    const Test = () => {
      return <Outlet />;
    };
  
    return (
      <Router>
        <Routes>
          <Route path="/" element={<AdminTemplate />}>
            <Route path="" element={<Test />}>
              <Route path="" element={<Test />}>
                <Route path="" element={<Test />}>
                  <Route path="test" element={<Dashboard />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    );
  }