import React from "react"
import {useNavigate} from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const ReservationItem = ({ reservation }) => {

  const navigate = useNavigate();

    return (




<Container>  
<Row>  
  <Col className=".bg-light.bg-gradient p-2 square border border-dark">
     <h4>TransactionTime</h4>{reservation.transactionTime}
  </Col>  
  <Col className=".bg-light.bg-gradient p-2 square border border-dark">
     <h4>PaymentMethod</h4>{reservation.paymentMethod}
  </Col>  
  <Col className=".bg-light.bg-gradient p-2 square border border-dark">
     <h4>Customer</h4>{reservation.customer}
  </Col> 
  <Col className=".bg-light.bg-gradient p-2 square border border-dark d-flex align-items-center justify-content-center">
  <Button> Cancella </Button>
  </Col>  

</Row>  
</Container>  

);
};

export default ReservationItem;