import React from 'react';

import BoxItem from '../BoxItem/index.js';
import boxes from "../../data/boxes.json";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaStar} from "react-icons/fa";

import {FaArrowLeft, FaSearch, FaMapMarkerAlt, FaCalendarCheck, FaUserAlt} from "react-icons/fa";

import {UserButton} from "@clerk/clerk-react";


function ReviewsVendors() {


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
                    <h1>Save<span>Food</span></h1>
                </div>
                <div className="currentDetails1">
                    <div className="header-option2" onClick={() => {
                        navigate("/ordini");
                    }}>
                        <i data-feather="clock"></i>
                        <span>I miei ordini <FaCalendarCheck></FaCalendarCheck></span>
                    </div>
                </div>


                <div className="searchBar1">
                    <div className="header-option2">
                        <FaSearch></FaSearch>
                        <input className="searchQueryInput" type="text" placeholder="Cerca Box..." color="blue"/>


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
                            <h2>Locale: "La tavola calda"</h2>
                        </div>
                        <div className="header-viewOptions1">
                            <div className="viewAll1" onClick={() => {
                                navigate("/");
                            }}>
                                <span><FaArrowLeft/> Torna alla Home</span>
                            </div>


                        </div>
                    </div>
                    <div className="listings-grid1">
                        <div className="listings-col1">
                            <div className="listings-grid-element2">

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


                            <div className="listings-grid-element4">

                                <div className="text2">
                                    <div className="text-title1">
                                        <h3>Media recensioni:</h3>
                                        <br></br>
                                        <div className="rating2">
                                            <span className="circle1">4.2</span></div>
                                        <br></br>
                                        <div className="info1">
                                            <h7>11 utenti hanno recensito questo locale</h7>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-row">


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

export default ReviewsVendors;