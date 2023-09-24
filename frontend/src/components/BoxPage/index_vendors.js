import React, {useEffect, useState} from 'react';

import BoxItemOwner from '../BoxItem/indexowner.js';
import {useNavigate} from "react-router-dom";
import {FaEye} from "react-icons/fa";
import {MdLocalDining} from "react-icons/md";

import {FaArrowLeft, FaSearch, FaMapMarkerAlt, FaCalendarCheck, FaUserAlt} from "react-icons/fa";

import {UserButton, useUser} from "@clerk/clerk-react";
import {globalDataBox} from "../GreetingPage/global";


function BoxPageVendor() {
    const { user } = useUser();

    const [box, setBox] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getBox();
    }, []);

    let userId = null; // Inizializza userId come null
    let userName = null; // Inizializza userId come null
    if (user) {
        userId = user.id; // Assegna il valore solo se user è definito
        userName = user.primaryEmailAddress.emailAddress;
        console.log(userId);
        console.log(userName);
    }


    let getBox = () => {
        fetch('http://localhost:8080/api/boxes/getById/'+ globalDataBox.globalBoxId)
            .then(res => {
                console.log(res.status);
                console.log(res.headers);
                return res.json();

            })
            .then((result) => {
                    console.log(result);
                    setBox(result);
                    console.log(box);
                    console.log(box.price);
                    console.log("questo è l'id della box:" + globalDataBox.globalBoxId);
                },
                (error) => {
                    console.log(error);
                }
            )
    };


    return (

        <body>


        <header>
            <div className="container1">
                <div className="logo1" onClick={() => {
                    navigate("/modifyshop2");
                }}>
                    <h1>Save<span>Food</span></h1>
                </div>
                <div className="currentDetails1">
                    <div className="header-option1">
                        <i data-feather="map-pin"></i>
                        <span>Google Maps <FaMapMarkerAlt></FaMapMarkerAlt></span>
                    </div>
                    <div className="header-option1" onClick={() => {
                        navigate("/reservations");
                    }}>
                        <i data-feather="clock"></i>
                        <span>I miei ordini <FaCalendarCheck></FaCalendarCheck></span>
                    </div>
                </div>


                <div className="searchBar1">
                    <div className="header-option1">


                    </div>
                    <div className="header-option1">
                    {user ? (
         <UserButton show={true} />
      ) : (
        <button onClick={() => {
            navigate("/sign-in");
        }}>Accedi</button>
      )}
                    </div>
                </div>
            </div>
        </header>

        <div className="options1">


            <div className="listings1">
                <div className="container1">
                    <div className="header1">
                        <div className="header-title1">
                            <h2>Visualizza la tua Box</h2>
                        </div>
                        <div className="header-viewOptions1">
                            <div className="viewAll1" onClick={() => {
                                navigate("/modifyshop2");
                                navigate(0);
                            }}>
                                <span> <FaArrowLeft/> Torna alla Home</span>
                            </div>


                        </div>
                    </div>
                    <div className="listings-grid1">
                        <div className="listings-col1">

                            <BoxItemOwner box={box}></BoxItemOwner>


                            <div className="listings-grid-element1">
                                <div className="text1">
                                    <div className="text-title1" onClick={() => {
                                        navigate("/reviews");
                                    }}>
                                        <h3 class="reviews">La pizzera <MdLocalDining color="gold"></MdLocalDining></h3>
                                    </div>
                                </div>

                                <div className="text1">
                                    <div className="info1">
                                        <span> Matteo Rossi: recensione...</span>
                                    </div>
                                </div>
                                <div className="text1">
                                    <div className="info1">
                                        <span> Mirco Bianchi: recensione...</span>
                                    </div>
                                </div>
                                <div className="text1">
                                    <div className="info1" onClick={() => {
                                        navigate("/reviews");
                                    }}>
                                        <h6> Espandi tutto <FaEye color="green"></FaEye></h6>
                                    </div>
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

export default BoxPageVendor;