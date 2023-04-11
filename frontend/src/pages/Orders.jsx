import React, { useState, useEffect } from "react";
import {Col, Container, Row, Table} from "reactstrap";

const ordersData = [
  { id: 1, customer: 'Negozio dolci', product: 'box1', quantity: 2, total: 20 },
  { id: 2, customer: 'Pizzeria prova', product: 'box2', quantity: 1, total: 15 },
  { id: 3, customer: 'Pasticceria 2', product: 'box3', quantity: 3, total: 3 },
];
const Orders = () => {
    const [orders, setOrders] = useState(ordersData);

    return (
        <Container>
          <Row>
            <Col>
              <Table responsive>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Negozio</th>
                  <th>Prodotto</th>
                  <th>Quantità</th>
                  <th>Totale</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td>{order.quantity}</td>
                      <td>{order.total}</td>
                    </tr>
                ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>

    );

};

export default Orders;
