import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from '../Admin/Auth/PublicRoute';
import { MapRoutes, GetPublicRoutes, GetUserRoutes, GetUserTemplate } from './Routes';
import PrivateRoute from '../Admin/Auth/PrivateRoute';
import NotFound from './NotFound';

export default function NewRouter(){

return (
    <Router>
        <Routes>
            <Route path='/' element={<PublicRoute />}>
                {MapRoutes(GetPublicRoutes())}
            </Route>
            <Route path='/' element={<PrivateRoute />}>
                <Route element={GetUserTemplate()}>
                    {MapRoutes(GetUserRoutes())}
                </Route>
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    </Router>
  )
}
