import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {
    FaBoxOpen,
    FaArrowLeft,
    FaSearch,
    FaMapMarkerAlt,
    FaCalendarCheck,
    FaUserAlt,
    FaArrowUp,
    FaArrowDown
} from "react-icons/fa";
import {UserButton} from "@clerk/clerk-react";

import Button from 'react-bootstrap/Button';


const GreetingPage = () => {

    const [role, setRole] = useState("");
    const navigate = useNavigate();


    return (
        <body>

        <div className="colore">
            <div className="greetgriglia">
                <Col
                    className="  .bg-light.bg-gradient  square   d-flex align-items-center justify-content-center text-success">


                    <button type="button" class="btn btn-success btn-sq-responsive">
                        <div className="logo1">
                            <h1>Save<span>Food</span></h1>
                        </div>
                    </button>

                    <button type="button" class="btn btn-warning btn-sq-responsive text-light" onClick={() => {
                        navigate("/modifyshop2");
                        setRole("venditore");
                    }}><h3>Venditore</h3></button>
                </Col>
                <Col
                    className="  .bg-light.bg-gradient  square   d-flex align-items-center justify-content-center text-success">
                    <button type="button" class="btn btn-light btn-sq-responsive">


                        <div className="imagegreet">
                            <img
                                src={require('../../images/box.png')} alt="Lis"
                            />
                        </div>


                    </button>


                    <button type="button" class="btn btn-info btn-sq-responsive text-light" onClick={() => {
                        navigate("/");
                        setRole("cliente");
                    }}><h3>Cliente</h3></button>
                </Col>

            </div>


        </div>

        </body>


    );
};

export default GreetingPage;