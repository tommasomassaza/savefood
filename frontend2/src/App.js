
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage/index.js';
import BoxPage from './components/BoxPage/index.js';
import ReservationsPage from './components/ReservationsPage/index.js';
import LoginPage from './components/LoginPage/index.js';
import NegozioPage from './components/NegozioPage/index.js';
import PrivateRoutes from './components/Routes/PrivateRoutes.js';


class App extends Component {
  render() {
    
    return (
      <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
                <Route element={<BoxPage/>} path="/box" exact/>
                <Route element={<ReservationsPage/>} path="/reservations" exact/>
                <Route element={<NegozioPage/>} path="/negozio" exact/>
          </Route>
          <Route element={<HomePage/>} path="/" exact/>
    
         
        </Routes>
      </Router>
      </div>
    );
  }
}
export default App;
