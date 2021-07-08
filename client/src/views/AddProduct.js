import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import {Container, Row, Col} from 'react-bootstrap';
import ModularForm from '../components/Form';

const AddProduct = (props) => {
    const [errors, setErrors] = useState({});
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        description: "",
    })

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
        <Container>
            <ModularForm customer={product} setCustomer={setProduct} errors={errors} handleSubmit={handleSubmit} submitLabel={"Add Product"} />
        </Container>
    )
}

export default AddProduct;