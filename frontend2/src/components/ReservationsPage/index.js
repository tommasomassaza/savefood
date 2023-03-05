import React from "react"
import {useNavigate} from "react-router-dom";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import ReservationItem from '../ReservationItem/ReservationItem.js';
import reservations from "../../data/reservations.json";




const ReservationsPage = () => {

  const navigate = useNavigate();
  

    return (
        <body>
   
    <header>
      <div className="container">
        <div className="logo" onClick={() => {navigate("/");}} >
          <h1>Save<span>Food</span></h1>
        </div>
        <div className="currentDetails">
          <div className="header-option">
            <i data-feather="map-pin"></i>
            <span>Google Maps</span>
          </div>
          <div className="header-option" onClick={() => {navigate("/reservations");}}>
            <i data-feather="clock"></i>
            <span>I miei ordini</span>
          </div>
        </div>
        
  
        <div className="searchBar">
          <div className="header-option">
            <i data-feather="search"></i>
            <span>Cerca</span>
          </div>
          <div className="header-option" onClick={() => {navigate("/login");}}>
            <span>Log in</span>
          </div>
        </div>
      </div>
    </header>

    <div className="options">
      <div className="container">
        <button className="options-btn selected">
          <i data-feather="shopping-bag"></i>
          <span>Tutte</span>
        </button>
        <button className="options-btn">
          <i data-feather="watch"></i>
          <span>Filtra</span>
        </button>
        
      </div>
      
    </div>


        <div className="App">  
        <Container>  
<Row>  
  <Col className=".bg-light.bg-gradient p-2 square border border-dark d-flex align-items-center justify-content-center">
     <h4>Prenotazioni</h4>
  </Col> 
  </Row> 
  </Container>  
 
        {reservations.map(item => (
        <ReservationItem reservation={item}></ReservationItem>

      ))}
         </div>  
         </body>
    

    );
  };
  
  export default ReservationsPage;