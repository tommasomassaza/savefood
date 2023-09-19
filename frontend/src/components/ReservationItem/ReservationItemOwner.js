import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButton';
import {FaTrashAlt, FaRegCalendarAlt, FaRegCalendarCheck} from "react-icons/fa";


const ReservationItemOwner = ({reservation}) => {

    const [value, setValue] = useState([1, 3]);

    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = (val) => setValue(val);


    const navigate = useNavigate();

    return (


        <Container>
            <Row>
                <Col className=".bg-light.bg-gradient p-2 square border border-muted">
                    <h4>TransactionTime</h4>{reservation.transactionTime}
                </Col>
                <Col className=".bg-light.bg-gradient p-2 square border border-muted">
                    <h4>PaymentMethod</h4>{reservation.paymentMethod}
                </Col>
                <Col className=".bg-light.bg-gradient p-2 square border border-muted">
                    <h4>Customer</h4>{reservation.customer}
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