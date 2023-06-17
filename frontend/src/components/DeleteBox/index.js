import React from "react"
import {useNavigate} from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'


import NegozioItem from '../NegozioItem/index.js';
import reservations from "../../data/reservations.json";


const DeleteBox = () => {

    const navigate = useNavigate();


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
                    <div className="header-option1">
                        <i data-feather="map-pin1"></i>
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
                <button className="options-btn1 selected1">
                    <i data-feather="shopping-bag"></i>
                    <span>Tutte</span>
                </button>
                <button className="options-btn1">
                    <i data-feather="watch"></i>
                    <span>Filtra</span>
                </button>

            </div>

        </div>


        <div className="App">
            <Container>
                <Row>
                    <Col
                        className=".bg-light.bg-gradient p-2 square border border-muted d-flex align-items-center justify-content-center text-success">
                        <h4>Rimuovi una box</h4>
                    </Col>
                </Row>
            </Container>

            {reservations.map(item => (
                <NegozioItem reservation={item}></NegozioItem>

            ))}
        </div>
        </body>


    );
};

export default DeleteBox;