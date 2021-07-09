import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router'; 
import { Container, Row, Col } from 'react-bootstrap';
import ModularForm from '../components/Form';
import DeleteButton from '../components/DeleteButton';

const EditProduct = (props) => {
    const {id} = props;
    const [errors, setErrors] = useState({});
    const [product, setProduct] = useState({});

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

    const afterDeleteHandler = () => {
        navigate('/products')
    }

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
            <ModularForm object={product} setObject={setProduct} errors={errors} handleSubmit={handleSubmit} submitLabel={"Edit Product"} inventory={true} />
            <DeleteButton id={id} afterDeleteHandler={afterDeleteHandler} deleteLabel={'Delete Product'} mongoLabel={'products'} />
        </Container>
    )
}

export default EditProduct;