import React from "react";
import { Outlet, Navigate } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
//import auth from "../pages/Login"
//import isLoggedIn from "../pages/Login"
//import auth from "../routes/PrivateRoutes"

const useAuth = () => {
    const user = { loggedIn: false};
    return user && user.loggedIn;
};



const PrivateRoutes = () => {
    console.log("---------private R");
    const isAuth = useAuth();
    console.log(isAuth);
    return isAuth ? <Outlet/> : <Navigate to="/login"/>;

};

export default PrivateRoutes