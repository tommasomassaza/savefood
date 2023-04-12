import React, {useState} from "react";
import { Outlet, Navigate } from 'react-router-dom'
import isAuthenticated from "../pages/Login"


const PrivateRoutes = () => {
    let auth = {'token': true}
    return(
        auth.token ? <Outlet/> : <Navigate to="/login"/>
    )

}
export default PrivateRoutes