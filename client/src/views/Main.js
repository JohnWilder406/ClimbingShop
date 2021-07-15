import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Navbar, Nav, Container } from 'react-bootstrap';
import {Link} from '@reach/router';
import axios from 'axios';
import Logout from '../components/Logout';
import Search from '../components/Search';
import number from '../components/number';

//sorting function for displaying customers
function Sort(array) {
    const sorted = array.sort((a,b) => (a.firstName > b.firstName) ? 1 : -1)

    return sorted
}

const Main = (props) => {
    const [customers, setCustomers] = useState([]);
    const [searchQuery, setSearchQuery] = useState();
    const [custDefault, setCustDefault] = useState([]);
    const [custNumber, setCustNumber] = useState();

    //retrieve all customers from database
    useEffect(() => {
        axios.get('http://localhost:8000/api/customers')
            .then((res) => {
                setCustomers(res.data)
                setCustDefault(res.data)
                setCustNumber(number(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    //search filter
    const updateInput = async (searchQuery) => {
        const filtered = custDefault.filter(customer => {
            if(customer.firstName.toLowerCase().includes(searchQuery.toLowerCase())) {
                return customer.firstName.toLowerCase().includes(searchQuery.toLowerCase())
            } else if(customer.lastName.toLowerCase().includes(searchQuery.toLowerCase())) {
                return customer.lastName.toLowerCase().includes(searchQuery.toLowerCase())
            }
            
        })
        setSearchQuery(searchQuery);
        setCustomers(filtered)
    }

    const sortCustomers = Sort(customers)

    return (
        <Container className="mainContainer">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Bodie's Climbing</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/customers/add">New Customer</Link></Button>
                    <Button variant="outline-dark"><Link to="/products/add">New Product</Link></Button>
                    <Button variant="outline-dark"><Link to="/products">Product Database</Link></Button>
                </Nav>
                <Logout />
                <Search searchQuery={searchQuery} onChange={updateInput} />
            </Navbar>
            <Card className="modularForm">
                <Card.Body>
                    <Table bordered striped hover>
                        <thead>
                            <tr>
                                <th>Customer Number</th>
                                <th>Customer Name</th>
                                <th>Numer of Orders</th>
                                <th>Actions Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sortCustomers.map((customer, idx) => {
                                    return (
                                        <tr key={idx}><td>{customer.number}</td><td>{customer.firstName +' '+ customer.lastName}</td><td>{customer.orders.length}</td><td><Button variant="none"><Link to={'/customers/' + customer._id + '/new_order'}>New Order</Link></Button><Button variant="none"><Link to={'/customers/' + customer._id + '/history'}>View Orders</Link></Button><Button variant="none"><Link to={'/customers/' + customer._id + '/edit'}>Edit Customer</Link></Button></td></tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Main;