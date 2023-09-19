import React from "react"
import {useNavigate} from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'


import {
    FaArrowLeft,
    FaSearch,
    FaMapMarkerAlt,
    FaCalendarCheck,
    FaUserAlt,
    FaArrowRight,
    FaArrowUp,
    FaArrowDown
} from "react-icons/fa";
import {UserButton} from "@clerk/clerk-react";


import ReservationItemOwner from '../ReservationItem/ReservationItemOwner.js';
import reservations from "../../data/reservations.json";


const OrdiniPage = () => {


    const navigate = useNavigate();


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


        <div className="options2">
            <div className="container1">
                <button className="options-btn2 uno" onClick={() => {
                    navigate("/modifyshop3");
                }}>
                    <i data-feather="shopping-bag"></i>
                    <span>Le mie box </span>
                </button>
                <button className="options-btn2 due" onClick={() => {
                    navigate("/modifyshop2");
                }}>
                    <i data-feather="watch"></i>
                    <span>I miei locali</span>
                </button>
                <button className="options-btn2  selected2 tre">
                    <i data-feather="watch"></i>
                    <span>I miei ordini</span>
                </button>


            </div>


        </div>

        <div className="App">


            <Container>
                <Row>
                    <Col
                        className=".bg-light.bg-gradient p-2 square border border-muted d-flex align-items-center justify-content-center text-success">
                        <h4>Ordini</h4>
                    </Col>
                </Row>
            </Container>


            <Container style={{maxHeight: 500, overflow: 'scroll'}}>
                {reservations.map(item => (
                    <ReservationItemOwner reservation={item}></ReservationItemOwner>

                ))}
            </Container>
        </div>


        </body>


    );
};

export default OrdiniPage;