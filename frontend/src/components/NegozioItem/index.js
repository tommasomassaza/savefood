import React from "react"
import {useNavigate} from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const Negoziotem = ({reservation}) => {

    const navigate = useNavigate();

    return (


        <Container>
            <Row>
                <Col className=".bg-light.bg-gradient p-3 square border border-muted">
                    <img
                        src={require('../../data/sushi.jpg')} alt="Listing pic"
                    />

                </Col>
                <Col className=".bg-light.bg-gradient p-2 square border border-muted">
                    <h4>PaymentMethod</h4>{reservation.paymentMethod}
                </Col>
                <Col className=".bg-light.bg-gradient p-2 square border border-muted">
                    <h4>Customer</h4>{reservation.customer}
                </Col>
                <Col className=".bg-light.bg-gradient p-2 square border border-muted">
                    <h4>Customer</h4>{reservation.customer}
                </Col>
                <Col
                    className=".bg-light.bg-gradient p-2 square border border-muted d-flex align-items-center justify-content-center">
                    <Button className="w-100 h-100 p-3 mb-2 bg-danger text-white border-danger"> Rimuovi </Button>
                </Col>

            </Row>
        </Container>

    );
};

export default Negoziotem;