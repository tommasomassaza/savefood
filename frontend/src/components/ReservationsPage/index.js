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
    FaArrowUp,
    FaArrowDown
} from "react-icons/fa";
import {UserButton} from "@clerk/clerk-react";


import ReservationItem from '../ReservationItem/ReservationItem.js';
import reservations from "../../data/reservations.json";


import Sidebar from "../HomePage/sidebar";

const ReservationsPage = () => {


    const navigate = useNavigate();


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
                        <UserButton></UserButton>
                    </div>
                </div>
            </div>
        </header>


        <div className="options1">
            <Sidebar className="barra"></Sidebar>
            <div className="listings1">
                <div className="container1">


                    <div className="header1">

                        <div className="header-viewOptions1">
                            <div className="viewAll1" onClick={() => {
                                navigate("/");
                                navigate(0);
                            }}>
                                <span> <FaArrowLeft/> Torna alla Home</span>
                                <br></br>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="App">


                <Container>
                    <Row>
                        <Col
                            className=".bg-light.bg-gradient p-2 square border border-muted d-flex align-items-center justify-content-center text-success">
                            <h4>Prenotazioni</h4>
                        </Col>
                    </Row>
                </Container>

                <Container style={{maxHeight: 500, overflow: 'scroll'}}>


                    {reservations.map(item => (
                        <ReservationItem reservation={item}></ReservationItem>

                    ))}

                </Container>

            </div>
        </div>
        </body>


    );
};

export default ReservationsPage;