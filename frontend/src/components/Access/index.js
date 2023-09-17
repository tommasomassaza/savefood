import {FaArrowRight} from "react-icons/fa";
import {FaArrowLeft} from "react-icons/fa";
import {useNavigate} from "react-router-dom";


import React, {useState, useEffect} from "react";

import {UserButton} from "@clerk/clerk-react";


function AccessPage() {

    //per navigare tra i link
    const navigate = useNavigate();

    return (


        <body>


        <header>

            <div className="container1">

                <div className="logo1">
                    <h1>Ops <span>Non hai accesso alla pagina con questo account </span></h1>
                </div>
                <div className="currentDetails1">
                    <div className="header-option1" onClick={() => {
                        navigate("/greeting");
                    }}>
                        <i data-feather="clock"></i>
                        <span>Torna indietro <FaArrowLeft></FaArrowLeft></span>
                    </div>
                </div>


            </div>


        </header>

        </body>


    );
}

export default AccessPage;
