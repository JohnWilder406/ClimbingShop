import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import {Container, Card, Row, Col, Button, Table, Nav, Navbar, Form, FormControl, NavDropdown} from 'react-bootstrap';



const CustomerDetail = (props) => {
    const {id} = props;
    const [customer, setCustomer] = useState({});
    const [orders, setOrders] = useState([])

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

    const favoriteChange = (order, status) => {
        console.log(order)
        axios.put('http://localhost:8000/api/customers/' + id + '/favorite/' + order._id, {favorite: status})
        .then(() => {
            return axios.get('http://localhost:8000/api/customers/' + id)
                .then((res) => {
                    setOrders(res.data.orders)
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch(err => console.log(err));
    }


    return (
        <Container>
            <h1>Order History for {customer.firstName} </h1>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Bodie's Climbing</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to={'/customers/' + id + '/new_order'} state={{favorite: false}}>New Order</Link>
                    <NavDropdown title="Re-Order Favorite">
                        {
                            orders.map((order,idx) => {
                                if(order.favorite) {
                                    return (
                                        <NavDropdown.Item key={idx}><Link to={'/customers/' + id + '/new_order'} state={{favorite: true, idx: idx}}>{order.item}</Link></NavDropdown.Item>
                                    ) 
                                }
                            })
                        }
                    </NavDropdown>
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
                                <tr key={idx}><td>{idx + 1}</td><td>{order.item}</td><td>{order.quantity}</td><td>{order.price}</td><td>{order.shipped ? "Yes" : "No"}</td><td>{order.favorite ? <Button variant="primary" onClick={(e)=>favoriteChange(order, false)}>Yes</Button>: <Button onClick={(e)=>favoriteChange(order, true)} variant="secondary">No</Button>}</td></tr>
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