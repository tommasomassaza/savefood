import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {
    FaMapMarkerAlt,
    FaCalendarCheck, FaHome,
} from "react-icons/fa";
import {UserButton, useUser} from "@clerk/clerk-react";
import ReservationItemOwner from '../ReservationItem/ReservationItemOwner.js';
import ReservationItem from "../ReservationItem/ReservationItem";



const OrdiniPage = () => {
    const { user } = useUser();


    const navigate = useNavigate();


    //console.log(posts)
    const [reservations, setReservations] = useState([]);


    let userId = null; // Inizializza userId come null

    if (user) {
        userId = user.id; // Assegna il valore solo se user è definito
    }
    let getReservations = () => {
        fetch('http://localhost:8080/api/orders/getByUserId/'+ userId)
            .then(res => {
                console.log(res.status);
                console.log(res.headers);
                return res.json();

            })
            .then((result) => {
                    console.log("ecco la fetch:"+result);
                    setReservations(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    };

    useEffect(() => {
        getReservations();
    }, []);

    return (
        <body>

        <header>
            <div className="container1">
                <div className="logo1" onClick={() => {
                    navigate("/greeting_page");
                }}>
                    <h1>Save<span>Food</span></h1>
                </div>
                <div className="currentDetails1">
                    <div className="header-option1"onClick={() => {
                        navigate("/vendors/homepage");
                    }}>
                        <span>Home <FaHome></FaHome></span>
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
                    navigate("/vendors/homepage2");
                }}>
                    <i data-feather="shopping-bag"></i>
                    <span>Le mie box </span>
                </button>
                <button className="options-btn2 due" onClick={() => {
                    navigate("/vendors/homepage");
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


            <Container style={{ maxHeight: 500, overflow: 'scroll' }}>
                {[...reservations].reverse().map((item, index) => (
                    <ReservationItemOwner
                        reservation={item}
                        key={item.id}
                        isLastItem={index === 0} // Cambiato da 'reservations.length - 1' a '0'
                    ></ReservationItemOwner>
                ))}
            </Container>
        </div>


        </body>


    );
};

export default OrdiniPage;