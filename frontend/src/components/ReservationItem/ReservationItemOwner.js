import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButton';
import {FaTrashAlt, FaRegCalendarAlt, FaRegCalendarCheck} from "react-icons/fa";


const ReservationItemOwner = ({reservation,isLastItem}) => {

    const [value, setValue] = useState([1, 3]);
    const navigate = useNavigate();
    const classNames = isLastItem ? "green-reservation" : "";



    return (


        <Container className={classNames}>
            <Row>
                <Col className=".bg-light.bg-gradient p-2 square border border-muted">
                    <h4>Cliente</h4>{reservation.userName}
                </Col>
                <Col className=".bg-light.bg-gradient p-2 square border border-muted">
                    <h4>Box</h4>{reservation.boxName}
                </Col>
                <Col className=".bg-light.bg-gradient p-2 square border border-muted">
                    <h4>Quantità</h4>{reservation.quantity}
                </Col>
                <Col className=".bg-light.bg-gradient p-2 square border border-muted">
                    <h4>Ora di ritiro</h4>{reservation.pickUpTime}
                </Col>
                <Col className=".bg-light.bg-gradient p-2 square border border-muted">
                    <h4>Totale</h4>{reservation.price}
                </Col>
                <Col
                    className=".bg-light.bg-gradient p-2 square border border-muted d-flex align-items-center justify-content-center">

                    <ToggleButton id="tbg-btn-2" value={2}
                                  className=" button w-100 h-100 p-3 mb-2 bg-primal text-white border-primal"
                                  type="button" data-toggle="button" aria-pressed="false"
                                  autocomplete="off"> Consegnato <FaRegCalendarCheck></FaRegCalendarCheck>
                    </ToggleButton>

                </Col>

            </Row>
        </Container>

    );
};

export default ReservationItemOwner;