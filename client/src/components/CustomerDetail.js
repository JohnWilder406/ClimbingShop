import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import {Container, Card, Row, Col, Button, Table, Nav, Navbar, Form, FormControl} from 'react-bootstrap';

const CustomerDetail = (props) => {
    const {id} = props;
    const [customer, setCustomer] = useState({});
    const [orders, setOrders] = useState([])
    // const [favorite, setFavorite] = useState();
    // const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/customers/' + id)
            .then((res) => {
                console.log(res.data);
                setCustomer(res.data);
                setOrders(res.data.orders)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    return (
        <Container>
            <h1>Order History for {customer.firstName} </h1>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Bodie's Climbing</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="">New Order</Nav.Link>
                    <Nav.Link href="">Re-Order Favorite</Nav.Link>
                    <Nav.Link href="/main">Return Home</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
            <Table bordered striped>
                <thead>
                    <tr>
                        <td>Order #</td>
                        <td>Item</td>
                        <td>Qty</td>
                        <td>Price</td>
                        <td>Shipped?</td>
                        <td>Favorite?</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order,idx) => {
                            return (
                                <tr key={idx}><td>None</td><td>{order.item}</td><td>{order.quantity}</td><td>{order.price}</td><td>{order.shipped ? "Yes" : "No"}</td><td>{order.favorite ? "Yes" : "No"}</td></tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <Table bordered striped>
                <thead>
                    <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Email Address</td>
                        <td>Physical Address</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{customer.firstName}</td>
                        <td>{customer.lastName}</td>
                        <td>{customer.email}</td>
                        <td>{customer.address}</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default CustomerDetail;