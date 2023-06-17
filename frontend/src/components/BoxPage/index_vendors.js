import React from 'react';

import BoxItem from '../BoxItem/index.js';
import boxes from "../../data/boxes.json";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaEye} from "react-icons/fa";
import {FaStar, FaMinus, FaPlus} from "react-icons/fa";
import {MdLocalDining} from "react-icons/md";

import {FaArrowLeft, FaSearch, FaMapMarkerAlt, FaCalendarCheck, FaUserAlt} from "react-icons/fa";

import {UserButton} from "@clerk/clerk-react";


function BoxPageVendor() {


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
                        <UserButton></UserButton>
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
                                navigate("/");
                                navigate(0);
                            }}>
                                <span> <FaArrowLeft/> Torna alla Home</span>
                            </div>


                        </div>
                    </div>
                    <div className="listings-grid1">
                        <div className="listings-col1">

                            <BoxItem box={box}></BoxItem>


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