import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router'; 
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import ModularForm from '../components/Form';
import DeleteButton from '../components/DeleteButton';

const EditProduct = (props) => {
    const {id} = props;
    const [errors, setErrors] = useState({});
    const [product, setProduct] = useState({});

    //retrieves product info and loads it into the form
    useEffect(() => {
        axios.get('http://localhost:8000/api/products/' + id)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    //navigates back to products database after product delete
    const afterDeleteHandler = () => {
        navigate('/products')
    }

    //uploads changes to product
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/products/' + id, product)
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
        <Container>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Bodie's Climbing</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/main">Return Home</Link></Button>
                    <Button variant="outline-dark"><Link to="/products">Product Database</Link></Button>
                </Nav>
                <DeleteButton id={id} afterDeleteHandler={afterDeleteHandler} deleteLabel={'Delete Product'} mongoLabel={'products'} />
            </Navbar>
            <ModularForm object={product} setObject={setProduct} errors={errors} handleSubmit={handleSubmit} submitLabel={"Edit Product"} inventory={true} idnumber={product.number}/>
        </Container>
    )
}

export default EditProduct;