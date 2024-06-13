import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Preloader from "./Preloader.jsx"
// import Login from './Login.jsx'
// import PublicRoute from './Auth/PublicRoute.jsx'
// import Template from './Template.jsx'
// import PrivateRoute from './Auth/PrivateRoute.jsx';
// import ManageClasses from './ManageClasses.jsx';
// import CreateClass from './CreateClass.jsx';
// import CreateTeacher from './CreateTeacher.jsx';
// import Dashboard from './Dashboard.jsx';
// import CreateStudent from './CreateStudent.jsx';
// import StudentInformation from './StudentInformation.jsx';


const Login = lazy(()=> import("./Login.jsx"))
const PublicRoute = lazy(()=> import("./Auth/PublicRoute.jsx"))
const Template = lazy(()=> import("./Template.jsx"))
const PrivateRoute = lazy(()=> import("./Auth/PrivateRoute.jsx"))
const ManageClasses = lazy(()=> import("./ManageClasses.jsx"))
const CreateClass = lazy(()=> import("./CreateClass.jsx"))
const CreateTeacher = lazy(()=> import("./CreateTeacher.jsx"))
const Dashboard = lazy(()=> import("./Dashboard.jsx"))
const CreateStudent = lazy(()=> import("./CreateStudent.jsx"))
const StudentInformation = lazy(()=> import("./StudentInformation.jsx"))


export const router = createBrowserRouter([
    {
      path: "/login",
      element: <Suspense fallback={<Preloader />}><PublicRoute element={<Login />} /></Suspense>
    },
    {
      path: "/",
      element: <Suspense fallback={<Preloader />}><PrivateRoute element={<Template element={<Dashboard />} />} /></Suspense>
    },
    {
      path: "/addteacher",
      element: <Suspense fallback={<Preloader />}><PrivateRoute element={<Template element={<CreateTeacher />} />} /></Suspense>
    },
    {
      path: "/createclass",
      element: <Suspense fallback={<Preloader />}><PrivateRoute element={<Template element={<CreateClass />} />} /></Suspense>
    },
    {
      path: "/createclass/:ID",
      element: <Suspense fallback={<Preloader />}><PrivateRoute element={<Template element={<CreateClass />} />} /></Suspense>
    },
    {
      path: "/manageclasses",
      element: <Suspense fallback={<Preloader />}><PrivateRoute element={<Template element={<ManageClasses />} />} /></Suspense>
    },
    {
      path: "/addstudent",
      element: <Suspense fallback={<Preloader />}><PrivateRoute element={<Template element={<CreateStudent />} />} /></Suspense>
    },
    {
      path: "/studentinformation",
      element: <Suspense fallback={<Preloader />}><PrivateRoute element={<Template element={<StudentInformation />} />} /></Suspense>
    },
    {
      path: "/CreateStudent/:ID",
      element: <Suspense fallback={<Preloader />}><PrivateRoute element={<Template element={<CreateStudent />} />} /></Suspense>
    },
    {
        path: "/preloader",
        element: <Preloader />
    }
])