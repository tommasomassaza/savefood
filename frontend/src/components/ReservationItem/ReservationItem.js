import React from "react"
import {useNavigate} from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {FaTrashAlt} from "react-icons/fa";


const ReservationItem = ({reservation}) => {

    const navigate = useNavigate();

    return (


        <Container>
            <Row>
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
                    <h4>Totale €</h4>{reservation.price}
                </Col>
                <Col
                    className=".bg-light.bg-gradient p-2 square border border-muted d-flex align-items-center justify-content-center">
                    <Button className="w-100 h-100 p-3 mb-2 bg-dark text-white border-dark"> <FaTrashAlt></FaTrashAlt>
                    </Button>
                </Col>

            </Row>
        </Container>

    );
};

export default ReservationItem;