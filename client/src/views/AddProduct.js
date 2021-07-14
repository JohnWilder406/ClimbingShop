import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import {Container, Nav, Navbar, Button} from 'react-bootstrap';
import ModularForm from '../components/Form';
import numberGen from '../components/number';

const AddProduct = (props) => {
    const [prodNumber, setProdNumber] = useState(0)
    const [errors, setErrors] = useState({});
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        description: "",
    })

    //retrieves inventory db to assign next inventory number for new product using numberGen.
    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
            .then((res) => {
                console.log(res.data)
                setProdNumber(numberGen(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    //adds product to db
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/products', product)
            .then((res) => {
                console.log(res.data);
                if(res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    navigate('/products')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Container className="mainContainer">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/main">Bodie's Climbing</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/main">Return Home</Link></Button>
                    <Button variant="outline-dark"><Link to="/products">Product Database</Link></Button>
                </Nav>
            </Navbar>
            <ModularForm idnumber={prodNumber} object={product} setObject={setProduct} errors={errors} handleSubmit={handleSubmit} submitLabel={"Add Product"} inventory={true}/>
        </Container>
    )
}

export default AddProduct;