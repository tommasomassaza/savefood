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
import UploadAndDisplayImage from './UploadAndDisplayImage.js';


function NegozioPage() {


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
                    <h2>Aggiungi un negozio:</h2>
                </div>

                <div className="listings-grid-element1" onClick={() => {
                    navigate("/negozio");
                }}>
                    <form className="form">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Nome</label>
                                <input type="email" class="form-control" id="inputEmail4" placeholder="Email"></input>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputPassword4">Indirizzo</label>
                                <input type="password" class="form-control" id="inputPassword4"
                                       placeholder="Città, Via..."></input>
                            </div>

                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputAddress">Numero di Telefono</label>
                            <input type="text" class="form-control" id="inputAddress"
                                   placeholder="Numero cellulare"></input>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputAddress2">Descrizione</label>
                            <input type="text" class="form-control" id="inputAddress2"
                                   placeholder="Breve descrizione del locale"></input>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputCity">Orari di apertura</label>
                                <input type="text" class="form-control" id="inputCity"></input>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputState">Categoria</label>
                                <select id="inputState" class="form-control">
                                    <option selected>Ristorante</option>
                                    <option>Sushi</option>
                                    <option>Pasticceria</option>
                                    <option>Cucina Gastronomica</option>
                                    <option>StreetFood</option>
                                    <option>Panificio</option>
                                    <option>Pizzeria</option>
                                </select>
                            </div>
                        </div>
                        <br></br>
                        <UploadAndDisplayImage></UploadAndDisplayImage>
                       
                    </form>
                </div>


            </div>
        </div>


        </body>


    );
}

export default NegozioPage;