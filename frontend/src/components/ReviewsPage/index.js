import React from 'react';

import BoxItem from '../BoxItem/index.js';
import boxes from "../../data/boxes.json";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaStar} from "react-icons/fa";

import {FaArrowLeft, FaAlignJustify, FaMapMarkerAlt, FaCalendarCheck, FaUserAlt} from "react-icons/fa";

import {UserButton,useUser} from "@clerk/clerk-react";


import Sidebar from "../HomePage/sidebar";

function ReviewsPage() {
    const { user } = useUser();


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
            <Sidebar className="barra"></Sidebar>

            <div className="listings1">
                <div className="container1">
                    <div className="header1">
                        <div className="header-title1">
                            <h2>Locale: "La tavola calda"</h2>
                        </div>
                        <div className="header-viewOptions1">


                        </div>
                    </div>
                    <div className="listings-grid1">
                        <div className="listings-col1">
                            <div className="listings-grid-element2" style={{overflow: 'auto'}}>

                                <div className="image3">
                                    <img
                                        src={require('../../data/sushi2.jpg')} alt="Listing pic"
                                    />
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h5>Nome:</h5>
                                        <div className="info1">
                                            <h7> La tavola calda</h7>
                                        </div>
                                    </div>
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h5>Indirizzo:</h5>
                                        <div className="info1">
                                            <h7> Via Torino 98</h7>
                                        </div>
                                    </div>
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h5>Info3:</h5>
                                        <div className="info1">
                                            <h7> Ecc...</h7>
                                        </div>
                                    </div>
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h5>Info4:</h5>
                                        <div className="info1">
                                            <h7> Ecc...</h7>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="listings-grid-element4" style={{maxHeight: 700, overflow: 'auto'}}>

                                <div className="text2">
                                    <div className="text-title1">
                                        <h3>Media recensioni:</h3>
                                        <div className="rating2"><span className="circle1">4.2</span></div>
                                        <div className="info1">
                                            <h11>11 utenti hanno recensito questo locale</h11>


                                        </div>
                                    </div>
                                </div>

                                <div class="form-row">

                                    <div class="form-group col-md-6">
                                        <label class="labelp" for="inputPassword4">Dacci il tuo feedback!</label>
                                        <input type="text" class="form-control" id="inputPassword4"
                                               placeholder="Scrivi una recensione..."></input>
                                    </div>
                                    <button type="submit"
                                            class="btn btn-primary #198754 bg-success border-success">Invia
                                    </button>

                                </div>

                                <div className="text2">
                                    <div className="text-title1">
                                        <h4>Matteo Sgamato: 5 <FaStar color="#4FFFB0"></FaStar></h4>
                                        <div className="info1">
                                            <span> Il locale è tanta. Mi è piaciuto molto e lo consiglio a tutti quelli che conosco. </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h4>Matteo Sgamato: 5 <FaStar color="#4FFFB0"></FaStar></h4>
                                        <div className="info1">
                                            <span> Il locale è tanta. Mi è piaciuto molto e lo consiglio a tutti quelli che conosco. </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h4>Matteo Sgamato: 5 <FaStar color="#4FFFB0"></FaStar></h4>
                                        <div className="info1">
                                            <span> Il locale è tanta. Mi è piaciuto molto e lo consiglio a tutti quelli che conosco. </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h4>Matteo Sgamato: 5 <FaStar color="#4FFFB0"></FaStar></h4>
                                        <div className="info1">
                                            <span> Il locale è tanta. Mi è piaciuto molto e lo consiglio a tutti quelli che conosco. </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h4>Matteo Sgamato: 5 <FaStar color="#4FFFB0"></FaStar></h4>
                                        <div className="info1">
                                            <span> Il locale è tanta. Mi è piaciuto molto e lo consiglio a tutti quelli che conosco. </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h4>Matteo Sgamato: 5 <FaStar color="#4FFFB0"></FaStar></h4>
                                        <div className="info1">
                                            <span> Il locale è tanta. Mi è piaciuto molto e lo consiglio a tutti quelli che conosco. </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text2">
                                    <div className="text-title1">
                                        <h4>Matteo Sgamato: 5 <FaStar color="#4FFFB0"></FaStar></h4>
                                        <div className="info1">
                                            <span> Il locale è tanta. Mi è piaciuto molto e lo consiglio a tutti quelli che conosco. </span>
                                        </div>
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

export default ReviewsPage;