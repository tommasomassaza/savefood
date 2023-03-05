import React from "react"
import {useNavigate} from "react-router-dom";
import { useState } from "react";


window.id = 0;

const BoxItem = ({ box }) => {




  const setIdNew = () => {
    window.id = box.id - 1
  };


  const navigate = useNavigate();


    return (
       
        <div className="listings-grid-element" onClick={() => {navigate("/box"); setIdNew();}}>
        <div className="image">
        <img src={box.image} alt="prova"/>
        </div>
        <div className="text">
          <div className="text-title">
            <h3>{box.name}</h3>
            <div className="info">
              <span>{box.price} euro | ora ritiro: {box.pickuptime} | </span>
            </div>
          </div>
          <div className="rating">
            <span className="circle">4.2</span>
          </div>
        </div>
        <div className="text-lower">
          <span className="smallText">Info1 | Info2 | Info3 | Info4 | Info5</span>
        </div>
      </div>
    

    );
  };
  
  export default BoxItem;