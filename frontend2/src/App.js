
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage/index.js';
import BoxPage from './components/BoxPage/index.js';
import ReservationsPage from './components/ReservationsPage/index.js';
import LoginPage from './components/LoginPage/index.js';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/box" element={<BoxPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/login" element={<LoginPage />} />
    
         
        </Routes>
      </Router>
      </div>
    );
  }
}
export default App;