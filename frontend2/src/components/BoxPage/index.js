import React from 'react';

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
     <div className="container1">
       <div className="logo1" onClick={() => {navigate("/");navigate(0);}}>
         <h1>Save<span>Food </span></h1>
       </div>
       <div className="currentDetails1">
         <div className="header-option1">
           <i data-feather="map-pin"></i>
           <span>Google Maps</span>
         </div>
         <div className="header-option1" onClick={() => {navigate("/reservations");}}>
           <i data-feather="clock"></i>
           <span>I miei ordini</span>
         </div>
       </div>
       
 
       <div className="searchBar1">
         <div className="header-option1">
           <i data-feather="search"></i>
           <span>Cerca</span>
         </div>
         <div className="header-option1" onClick={() => {navigate("/login");}}>
           <span>Log in</span>
         </div>
       </div>
     </div>
   </header>

   <div className="options1">
     

    <div className="listings1">
      <div className="container1">
        <div className="header1">
          <div className="header-title1">
            <h2>Prenota Box</h2>
          </div>
          <div className="header-viewOptions1">
            <div className="viewAll1" onClick={() => {navigate("/");}}>
              <span>Torna alla Home</span>
            </div>
            <div className="viewMore1" onClick={() => {navigate("/");}}>
              <span className="arrow1 circle1 right1"
                ><FaArrowLeft></FaArrowLeft>
              </span>
              </div>
            
          </div>
        </div>
        <div className="listings-grid1">
          <div className="listings-col1">
          
        <BoxItem box={box}></BoxItem>

        <div className="listings-grid-element1">
              <div className="text1">
                <div className="text-title1" onClick={() => {navigate("/negozio");}}>
                  <h3>Nome del locale</h3>
                  <div className="info1">
                    <span>Bla bla bla bla blablablablablablablablablabla</span>
                  </div>
                </div>
                
              </div>
              <div className="text-lower1">
                <span className="smallText1"
                  ></span>
              </div>

              <div className="container1">
        <h2>Quantità = {quantity}</h2>
        <button className="options-btn1 selected1" onClick={onMinus}>
          <span>-</span>
        </button>
        <button className="options-btn1 selected1" onClick={onPlus}>
          <span>+</span>
        </button>
        <button className="options-btn1 prenota1" onClick={() => {navigate("/reservations");}}>
          <span>Prenota</span>
        </button>
        
      </div>

            </div>

            <div className="listings-grid-element1">
         
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