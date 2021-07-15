import React, { useState, useEffect } from 'react';
import { Table, Button, Navbar, Nav, Container } from 'react-bootstrap';
import {Link} from '@reach/router';
import axios from 'axios';
import Logout from '../components/Logout';
import Search from '../components/Search';

//sort function for products display
function Sort(array) {
    const sorted = array.sort((a,b) => (a.name > b.name) ? 1 : -1)

    return sorted
}

const Products = (props) => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState();
    const [prodDefault, setProdDefault] = useState([]);

    //retrieve all products from database
    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then((res) => {
                setProducts(res.data)
                setProdDefault(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    //search filter
    const updateInput = async (searchQuery) => {
        const filtered = prodDefault.filter(product => {
            return product.name.toLowerCase().includes(searchQuery.toLowerCase())
        })
        setSearchQuery(searchQuery);
        setProducts(filtered);
    }

    const sortProducts = Sort(products)

    return (
        <Container className="mainContainer">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Bodie's Climbing</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/products/add">Add Product</Link></Button>
                    <Button variant="outline-dark"><Link to="/main">Main Page</Link></Button>
                </Nav>
                <Logout />
                <Search searchQuery={searchQuery} onChange={updateInput} />
            </Navbar>

            <Table bordered striped hover>
                <thead>
                    <tr>
                        <td>Product Number</td>
                        <td>Product Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Edit Product</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortProducts.map((product, idx) => {
                            return (
                                <tr key={idx}><td>{product.number}</td><td>{product.name}</td><td>{product.price}</td><td>{product.description}</td><td><Button variant="none"><Link to={'/products/' + product._id + '/edit'}>Edit</Link></Button></td></tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default Products;