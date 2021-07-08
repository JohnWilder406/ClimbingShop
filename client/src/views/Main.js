import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Row, Col, Form, Navbar, Nav, FormControl } from 'react-bootstrap';
import {Link, navigate} from '@reach/router';
import axios from 'axios';
import Logout from '../components/Logout';

const Main = (props) => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/customers')
            .then((res) => {
                setCustomers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <div>
            <h1>Main Page Testing</h1>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Bodie's Climbing</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/customers/add">New Customer</Nav.Link>
                    <Nav.Link href="/products/add">New Product</Nav.Link>
                    <Nav.Link href="/products">Product Database</Nav.Link>
                    <Logout />
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>

            <Table bordered striped>
                <thead>
                    <tr>
                        <td>Customer Name</td>
                        <td>Numer of Orders</td>
                        <td>Actions Available</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map((customer, idx) => {
                            return (
                                <tr key={idx}><td>{customer.firstName +' '+ customer.lastName}</td><td>{customer.orders.length}</td><td><Button>New Order</Button><Button variant="none"><Link to={'/customers/' + customer._id + '/history'}>View Orders</Link></Button><Button variant="none"><Link to={'/customers/' + customer._id + '/edit'}>Edit Customer</Link></Button></td></tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Main;