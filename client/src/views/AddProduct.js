import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import {Container, Row, Col} from 'react-bootstrap';
import ModularForm from '../components/Form';
import numberGen from '../components/number';

const AddProduct = (props) => {
    const [prodNumber, setProdNumber] = useState()
    const [errors, setErrors] = useState({});
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        description: "",
    })

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
            <ModularForm idnumber={prodNumber} object={product} setObject={setProduct} errors={errors} handleSubmit={handleSubmit} submitLabel={"Add Product"} inventory={true}/>
        </Container>
    )
}

export default AddProduct;