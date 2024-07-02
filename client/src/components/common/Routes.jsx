import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import WatchVideos from "../Admin/WatchVideos.jsx"; // Corrected typo: WatchVideoes to WatchVideos
import { AdminRoute, TeacherRoute, StudentRoute } from "./RoleRouter.jsx";
import StudentDashboard from "../Student/StudentDashboard.jsx";
import TeacherDashboard from "../Teacher/TeacherDashboard.jsx";
import TeacherTemplate from "../Teacher/TeacherTemplate.jsx";
import StudentTemplate from "../Student/StudentTemplate.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice.js";
import WatchVideoes from "../Admin/WatchVideos.jsx";

const AllRoutes = [
  {
    path: "",
    component: <Dashboard />,
    type: "Admin",
    authentication: "role",
    default: true
  },
  {
    path: "",
    component: <StudentDashboard />,
    type: "Student",
    authentication: "role",
    default: true
  },
  {
    path: "",
    component: <TeacherDashboard />,
    type: "Teacher",
    authentication: "role",
    default: true
  },
  {
    path: "login",
    component: <Login />,
    type: "Public",
    authentication: "none"
  },
  {
    path: "manageclasses",
    component: <ManageClasses />,
    type: "Admin",
    authentication: "role"
  },
  {
    path: "addstudent",
    component: <CreateStudent />,
    type: "Admin",
    authentication: "role"
  },
  {
    path: "addstudent/:ID",
    component: <CreateStudent />,
    type: "Admin",
    authentication: "role"
  },
  {
    path: "createclass",
    component: <CreateClass />,
    type: "Admin",
    authentication: "role"
  },
  {
    path: "createteacher",
    component: <CreateTeacher />,
    type: "Admin",
    authentication: "role"
  },
  {
    path: "createstudent",
    component: <CreateStudent />,
    type: "Admin",
    authentication: "role"
  },
  {
    path: "studentinformation",
    component: <StudentInformation />,
    type: "Admin",
    authentication: "role"
  },
  {
    path: "teachersinformation",
    component: <TeachersInformation />,
    type: "Admin",
    authentication: "role"
  },
  {
    path: "studentattendance",
    component: <StudentAttendance />,
    type: "Admin",
    authentication: "role"
  },
  {
    path: "classdetails",
    component: <ClassDetails />,
    type: "Admin",
    authentication: "role"
  },
  {
    path: "uploadlecture",
    component: <UploadLecture />,
    type: "Admin",
    authentication: "role"
  },
  {
    path: "watchvideos",
    component: <WatchVideos />,
    type: "Admin",
    authentication: "role"
  },
  {
    path: "addteacher/:ID",
    component: <CreateTeacher />,
    type: "Admin",
    authentication: "role",
  },
  {
    path: "addteacher",
    component: <CreateTeacher />,
    type: "Admin",
    authentication: "role",
  },
  {
    path: "studentsinformation",
    component: <StudentInformation />,
    type: "Admin",
    authentication: "role",
  },
  {
    path: "watchvideo/:ID",
    component: <WatchVideoes />,
    type: "Admin",
    authentication: "role",
  },
]

const AllTemplates = [
  {
    path: "admin",
    component: <AdminTemplate />,
    type: "Admin",
    authentication: "role",
    template: true
  },
  {
    path: "teacher",
    component: <AdminTemplate />,
    type: "Teacher",
    authentication: "role",
    template: true
  },
  {
    path: "student",
    component: <AdminTemplate />,
    type: "Student",
    authentication: "role",
    template: true
  },
]

export const GetUserRoutes = () => {
  const { user, roles } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  if(!user){
    return [{default: true, component: <div></div>}, {path: "*", component: <div></div>}]
  }
  if(roles.includes(user.Role)){
    const filtered = AllRoutes.filter(route => {
      return route.type == user.Role
    })
    // console.log("filtered User: ", filtered);
    return filtered
  } else {
    dispatch(logout())
    return []
  }
}

export const GetPublicRoutes = () => {
  const filtered = AllRoutes.filter((route) => {
    return route.type == "Public"
  })
  // console.log("filtered Public: ", filtered);
  return filtered
}

export const MapRoutes = (routes) => {
  if(Array.isArray(routes) && routes.length > 0){
    // console.log("routes: ", routes);
    return (
      routes.map((route, index) => {
      if(route.default){
        return <Route index key={index} element={route.component} />
      } else {
        return <Route key={index} path={route.path} element={route.component} />
      }
    })
  )
  } else {
    return <></>
  }
}

export const GetUserTemplate = () => {
  const { user, roles } = useSelector(state => state.auth)
  if(!user){
    return <></>
  } else if(roles.includes(user.Role)) {
    const filteredTemplateArr = AllTemplates.filter(template => (
      template.type == user.Role
    ))
    return filteredTemplateArr[0].component
  }
}