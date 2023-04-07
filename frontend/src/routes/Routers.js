import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Orders from "../pages/Ordini";
import PrivateRoutes from '../routes/PrivateRoutes.js';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />

      <Route element={<PrivateRoutes />}>
            <Route element={<Orders/>} path="/orders" exact/>
      </Route>

      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />

      //Invece di far spuntare pagenotfound reindirizziamo l'user alla pagina iniziale
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Routers;
