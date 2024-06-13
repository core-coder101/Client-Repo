import { createBrowserRouter } from "react-router-dom";
import Login from './Login.jsx'
import PublicRoute from './Auth/PublicRoute.jsx'
import Template from './Template.jsx'
import PrivateRoute from './Auth/PrivateRoute.jsx';
import ManageClasses from './ManageClasses.jsx';
import CreateClass from './CreateClass.jsx';
import CreateTeacher from './CreateTeacher.jsx';
import Dashboard from './Dashboard.jsx';
import CreateStudent from './CreateStudent.jsx';
import StudentInformation from './StudentInformation.jsx';
import EditStudent from "./EditStudent.jsx";
import TeachersInformation from "./TeachersInformation.jsx"

export const router = createBrowserRouter([
    {
      path: "/login",
      element: <PublicRoute element={<Login />} />
    },
    {
      path: "/",
      element: <PrivateRoute element={<Template element={<Dashboard />} />} />
    },
    {
      path: "/addteacher",
      element: <PrivateRoute element={<Template element={<CreateTeacher />} />} />
    },
    {
      path: "/createclass",
      element: <PrivateRoute element={<Template element={<CreateClass />} />} />
    },
    {
      path: "/createclass/:ID",
      element: <PrivateRoute element={<Template element={<CreateClass />} />} />
    },
    {
      path: "/manageclasses",
      element: <PrivateRoute element={<Template element={<ManageClasses />} />} />
    },
    {
      path: "/addstudent",
      element: <PrivateRoute element={<Template element={<CreateStudent />} />} />
    },
    {
      path: "/studentsinformation",
      element: <PrivateRoute element={<Template element={<StudentInformation />} />} />
    },
    {
      path: "/CreateStudent/:ID",
      element: <PrivateRoute element={<Template element={<CreateStudent />} />} />
    },
    {
      path: "/editstudent",
      element: <PrivateRoute element={<Template element={<EditStudent />} />} />
    },
    {
      path: "/teachersinformation",
      element: <PrivateRoute element={<Template element={<TeachersInformation />} />} />
    },
    {
      path: "/addteacher/:ID",
      element: <PrivateRoute element={<Template element={<CreateTeacher />} />} />
    }
])