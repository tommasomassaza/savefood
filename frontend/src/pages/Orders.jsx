import React, { useState, useEffect } from "react";
import {Col, Container, Row, Table} from "reactstrap";

const ordersData = [
  { id: 1, customer: 'John', product: 'box1', quantity: 2, total: 2000 },
  { id: 2, customer: 'Jane', product: 'box2', quantity: 1, total: 1500 },
  { id: 3, customer: 'Mike', product: 'box3', quantity: 3, total: 3000 },
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
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total</th>
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
