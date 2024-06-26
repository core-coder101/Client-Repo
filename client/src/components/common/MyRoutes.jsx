import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import RoleRoute from "../Admin/Auth/RoleRoute.jsx";
import StudentDashboard from "../Student/StudentDashboard.jsx";
import TeacherDashboard from "../Teacher/TeacherDashboard.jsx";
import SelectVideo from "../Admin/SelectVideo.jsx";

export default function MyRoutes() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route element={<AdminTemplate />}>
              <Route element={<RoleRoute roles={["Admin"]} />} >
                <Route index element={<Dashboard />} />
                <Route path="manageclasses" element={<ManageClasses />} />
                <Route path="classdetails/:ID" element={<ClassDetails />} />
                <Route path="createclass" element={<CreateClass />} />
                <Route path="createclass/:ID" element={<CreateClass />} />
                <Route path="addstudent" element={<CreateStudent />} />
                <Route path="addstudent/:ID" element={<CreateStudent />} />
                <Route path="studentsinformation" element={<StudentInformation />} />
                <Route path="addteacher" element={<CreateTeacher />} />
                <Route path="addteacher/:ID" element={<CreateTeacher />} />
                <Route path="teachersinformation" element={<TeachersInformation />} />
                <Route path="studentattendance" element={<StudentAttendance />} />
                <Route path="addteacher" element={<StudentAttendance />} />
                <Route path="uploadlecture" element={<UploadLecture />} />
                <Route path="watchvideo/:ID" element={<WatchVideoes />} />
                <Route path="selectvideo" element={<SelectVideo />} />
              </Route>
            </Route>
            <Route element={<AdminTemplate />}>
              <Route element={<RoleRoute roles={["Teacher"]} />} >
                <Route index element={<TeacherDashboard />} />
              </Route>
            </Route>
            <Route element={<AdminTemplate />}>
              <Route element={<RoleRoute roles={["Student"]} />} >
                <Route index element={<StudentDashboard />} />
              </Route>
            </Route>
          </Route>
      </Routes>
    </Router>
  );
}
