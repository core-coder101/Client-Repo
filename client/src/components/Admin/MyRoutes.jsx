import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import PublicRoute from "./Auth/PublicRoute.jsx";
import Template from "./Template.jsx";
import PrivateRoute from "./Auth/PrivateRoute.jsx";
import ManageClasses from "./ManageClasses.jsx";
import CreateClass from "./CreateClass.jsx";
import CreateTeacher from "./CreateTeacher.jsx";
import Dashboard from "./Dashboard.jsx";
import CreateStudent from "./CreateStudent.jsx";
import StudentInformation from "./StudentInformation.jsx";
import TeachersInformation from "./TeachersInformation.jsx";
import StudentAttendance from "./StudentAttendance.jsx";
import ClassDetails from "./ClassDetails.jsx";
import UploadLecture from "./UploadLecture.jsx";

export default function MyRoutes() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route path="login" element={<Login />} />
          </Route>
        <Route path="/" element={<Template />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="manageclasses" element={<ManageClasses />} />
            <Route path="classdetails/:ID" element={<ClassDetails />} />
            <Route path="createclass" element={<CreateClass />} />
            <Route path="createclass/:ID" element={<CreateClass />} />
            <Route path="addstudent" element={<CreateStudent />} />
            <Route path="addstudent/:ID" element={<CreateStudent />} />
            <Route
              path="studentsinformation"
              element={<StudentInformation />}
            />
            <Route path="addteacher" element={<CreateTeacher />} />
            <Route path="addteacher/:ID" element={<CreateTeacher />} />
            <Route
              path="teachersinformation"
              element={<TeachersInformation />}
            />
            <Route path="studentattendance" element={<StudentAttendance />} />
            <Route path="addteacher" element={<StudentAttendance />} />
            <Route path="uploadlecture" element={<UploadLecture />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
