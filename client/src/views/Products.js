import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Row, Col, Form, Navbar, Nav, FormControl } from 'react-bootstrap';
import {Link, navigate} from '@reach/router';
import axios from 'axios';
import Logout from '../components/Logout';

const Products = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <div>
            <h1>Product Page Testing</h1>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Bodie's Climbing</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/products/add">Add Product</Nav.Link>
                    <Nav.Link href="/main">Customer Database</Nav.Link>
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
                        <td>Product Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Edit Product</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, idx) => {
                            return (
                                <tr key={idx}><td>{product.name}</td><td>{product.price}</td><td>{product.description}</td><td><Button variant="none"><Link to={'/products/' + product._id + '/edit'}>Edit</Link></Button></td></tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Products;