import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PublicRoute from "./Auth/PublicRoute";
import {
  MapRoutes,
  GetPublicRoutes,
  GetUserRoutes,
  GetUserTemplate,
} from "./Routes";
import PrivateRoute from "./Auth/PrivateRoute";
import NotFound from "./NotFound";
import Markattendance from "../Admin/Markattendance";

export default function NewRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          {MapRoutes(GetPublicRoutes())}
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route element={GetUserTemplate()}>
            {MapRoutes(GetUserRoutes())}
          </Route>
        </Route>
        <Route path='/markattendance/' element={<Markattendance />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
