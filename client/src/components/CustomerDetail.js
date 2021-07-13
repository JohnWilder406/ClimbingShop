import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import {Container, Card, Row, Col, Button, Table, Nav, Navbar, Form, FormControl, NavDropdown} from 'react-bootstrap';
import Search from '../components/Search'



const CustomerDetail = (props) => {
    const {id} = props;
    const [customer, setCustomer] = useState({});
    const [orders, setOrders] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [orderDef, setOrderDef] = useState([]);

    //retrieve customer detail and order history and set into different states.
    useEffect(() => {
        axios.get('http://localhost:8000/api/customers/' + id)
            .then((res) => {
                console.log(res.data);
                setCustomer(res.data);
                setOrders(res.data.orders)
                setOrderDef(res.data.orders)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    //updates favorite status of each order in the database and also refreshes axios upon change so button 
    //reflects current status of favorite.
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

    //search filter
    const updateInput = async (searchQuery) => {
        const filtered = orderDef.filter(order => {
            if(order.item.toLowerCase().includes(searchQuery.toLowerCase())) {
                return order.item.toLowerCase().includes(searchQuery.toLowerCase())
            } 
        })
        setSearchQuery(searchQuery);
        setOrders(filtered)
    }


    return (
        <Container className='mainContainer'>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Bodie's Climbing</Navbar.Brand>
                    <NavDropdown title="Re-Order Options">
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
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to={'/customers/' + id + '/new_order'} state={{favorite: false}}> New Order </Link></Button>
                    <Nav.Link href="/main">Return Home</Nav.Link>
                </Nav>
                <Navbar.Brand>Order History for {customer.firstName}</Navbar.Brand>
                <Search searchQuery={searchQuery} onChange={updateInput} />
            </Navbar>
            <Table variant="dark" bordered size="sm">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Physical Address</th>
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
            <Table bordered striped responsive="lg">
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Shipped?</th>
                        <th>Favorite?</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order,idx) => {
                            return (
                                <tr key={idx}><td>{idx + 1}</td><td>{order.item}</td><td>{order.quantity}</td><td>{order.price}</td><td>{order.shipped ? "Yes" : "No"}</td><td>{order.favorite ? <Button variant="success" onClick={(e)=>favoriteChange(order, false)}>Yes</Button>: <Button onClick={(e)=>favoriteChange(order, true)} variant="secondary">No</Button>}</td></tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default CustomerDetail;