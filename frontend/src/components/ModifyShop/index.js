import React from 'react';

import BoxItem from '../BoxItem/index.js';
import boxes from "../../data/boxes.json";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";


function ModifyShop() {


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
                    navigate("/");
                    navigate(0);
                }}>
                    <h1>Save<span>Food </span></h1>
                </div>
                <div className="currentDetails1">
                    <div className="header-option1">
                        <i data-feather="map-pin"></i>
                        <span>Google Maps</span>
                    </div>
                    <div className="header-option1" onClick={() => {
                        navigate("/reviewsvendors");
                    }}>
                        <i data-feather="clock"></i>
                        <span>Recensioni dei clienti</span>
                    </div>
                </div>


                <div className="searchBar1">
                    <div className="header-option1">
                        <i data-feather="search"></i>
                        <span>Ordini</span>
                    </div>
                    <div className="header-option1" onClick={() => {
                        navigate("/login");
                    }}>
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
                            <h2>Gestisci i tuoi servizi:</h2>
                        </div>
                        <div className="header-viewOptions1">
                            <div className="viewAll1" onClick={() => {
                                navigate("/");
                            }}>
                                <span>Torna alla Home</span>
                            </div>


                        </div>
                    </div>
                    <div className="listings-grid1">
                        <div className="listings-col1">

                            <div className="listings-grid-element1" onClick={() => {
                                navigate("/addbox");
                            }}>
                                <div className="image1">
                                    <img src={require("../../images/box1.jpg")}/>
                                </div>
                                <div className="text1">
                                    <h3 class="green">Aggiungi Box</h3>
                                    <div className="text-title1">
                                    </div>
                                </div>
                            </div>

                            <div className="listings-grid-element1" onClick={() => {
                                navigate("/modifybox");
                            }}>
                                <div className="image1">
                                    <img src={require("../../images/box1.jpg")}/>
                                </div>
                                <div className="text1">
                                    <h3 class="blue">Modifica Box</h3>
                                    <div className="text-title1">
                                    </div>
                                </div>
                            </div>

                            <div className="listings-grid-element1" onClick={() => {
                                navigate("/deletebox");
                            }}>
                                <div className="image1">
                                    <img src={require("../../images/box1.jpg")}/>
                                </div>
                                <div className="text1">
                                    <h3 class="red">Rimuovi Box</h3>
                                    <div className="text-title1">
                                    </div>
                                </div>
                            </div>

                            <div className="listings-grid-element1" onClick={() => {
                                navigate("/negozio");
                            }}>
                                <div className="image1">
                                    <img src={require("../../images/locale.jpg")}/>
                                </div>
                                <div className="text1">
                                    <h3 class="green">Aggiungi Locale</h3>
                                    <div className="text-title1">
                                    </div>
                                </div>
                            </div>


                            <div className="listings-grid-element1" onClick={() => {
                                navigate("/modifynegozio");
                            }}>
                                <div className="image1">
                                    <img src={require("../../images/locale.jpg")}/>
                                </div>
                                <div className="text1">
                                    <h3 class="blue">Modifica Locale</h3>
                                    <div className="text-title1">
                                    </div>
                                </div>
                            </div>


                            <div className="listings-grid-element1" onClick={() => {
                                navigate("/deleteshop");
                            }}>
                                <div className="image1">
                                    <img src={require("../../images/locale.jpg")}/>
                                </div>
                                <div className="text1">
                                    <h3 class="red">Rimuovi Locale</h3>
                                    <div className="text-title1">
                                    </div>
                                </div>
                            </div>


                        </div>


                    </div>
                </div>
            </div>
        </div>


        </body>


    );
}

export default ModifyShop;