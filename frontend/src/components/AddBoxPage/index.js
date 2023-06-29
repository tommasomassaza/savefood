import React from 'react';

import NegozioItem from '../NegozioItem/index.js';
import boxes from "../../data/boxes.json";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import UploadAndDisplayImage from "./UploadAndDisplayImage.js"


function AddBoxPage() {


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
                        navigate("/reservations");
                    }}>
                        <i data-feather="clock"></i>
                        <span>I miei ordini</span>
                    </div>
                </div>


                <div className="searchBar1">
                    <div className="header-option1">
                        <i data-feather="search"></i>
                        <span>Cerca</span>
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
            <div className="container1">

                <div className="header-title1">
                    <h2>Aggiungi una box:</h2>
                </div>

                <div className="listings-grid-element1">
                    <form className="form">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputEmail4">Nome</label>
                                <input type="text" className="form-control" id="inputEmail4" placeholder="Nome..."></input>
                            </div>
                            <div className="form-group col-md-6">
                                <label for="inputPassword4">Prezzo</label>
                                <input type="text" className="form-control" id="inputPassword4"
                                       placeholder="Prezzo..."></input>
                            </div>

                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputAddress">Orario di ritiro</label>
                            <input type="text" className="form-control" id="inputAddress"
                                   placeholder="A che ora vuoi che sia ritirata?"></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputAddress2">Taglia</label>
                            <input type="text" className="form-control" id="inputAddress2"
                                   placeholder="Grandezza della box da 1 a 3..."></input>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="inputCity">Negozio</label>
                                <input type="text" className="form-control" id="inputCity"
                                       placeholder="Il nome del negozio a cui è associata la box..."></input>
                            </div>

                        </div>
                        <UploadAndDisplayImage></UploadAndDisplayImage>
                        <br></br>
                        


                    </form>

                </div>


            </div>
        </div>


        </body>


    );
}

export default AddBoxPage;