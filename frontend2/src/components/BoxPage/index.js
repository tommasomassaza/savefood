import React from 'react';
import './BoxPage.scss';
import BoxItem from '../BoxItem/index.js';
import boxes from "../../data/boxes.json";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";






function BoxPage(){


  const box = boxes[window.id]; /*window.id è una variabile globale definita in BoxItem, usata per caricare la box dall'id corretto nella BoxPage*/

  const navigate = useNavigate();

    
        const [quantity, setQuantity] = useState(1);
      
        const onMinus = () => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
          }
        };
        
        const onPlus = () => {
          setQuantity(quantity + 1);
        };

return (

<body>
   
   <header>
     <div className="container">
       <div className="logo" onClick={() => {navigate("/");}}>
         <h1>Save<span>Food </span></h1>
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
     

    <div className="listings">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h2>Prenota Box</h2>
          </div>
          <div className="header-viewOptions">
            <div className="viewAll" onClick={() => {navigate("/");}}>
              <span>Torna alla Home</span>
            </div>
            <div className="viewMore" onClick={() => {navigate("/");}}>
              <span className="arrow circle right"
                ><FaArrowLeft></FaArrowLeft>
              </span>
              </div>
            
          </div>
        </div>
        <div className="listings-grid">
          <div className="listings-col">
          
        <BoxItem box={box}></BoxItem>

        <div className="listings-grid-element">
              <div className="text">
                <div className="text-title">
                  <h3>Recensione locale</h3>
                  <div className="info">
                    <span>Bla bla bla bla blablablablablablablablablabla</span>
                  </div>
                </div>
                
              </div>

              <div className="container">
        <h2>Quantità = {quantity}</h2>
        <button className="options-btn selected" onClick={onMinus}>
          <span>-</span>
        </button>
        <button className="options-btn selected" onClick={onPlus}>
          <span>+</span>
        </button>
        <button className="options-btn prenota" onClick={() => {navigate("/reservations");}}>
          <span>Prenota</span>
        </button>
        
      </div>

            </div>

            <div className="listings-grid-element">
         
            </div>

     
      
    </div>
    

      
          </div>
            </div>
          </div>
        </div>

  </body>




);
    }
export default BoxPage;