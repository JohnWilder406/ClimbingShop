import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link, navigate} from '@reach/router'
import { Container, Row, Col } from 'react-bootstrap';
import ModularForm from '../components/Form';

const AddCustomer = (props) => {
    const [errors, setErrors] = useState({});
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName:"",
        email: "",
        address: "",
        orders: [],
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/customers', customer)
            .then((res) => {
                console.log(res.data);
                if(res.data.errors) {
                    setErrors(res.data.errors)
                } else {
                    navigate('/main')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Container>
            <ModularForm object={customer} setObject={setCustomer} errors={errors} handleSubmit={handleSubmit} submitLabel={"Add Customer"} inventory={false}/>
        </Container>
    )
}

export default AddCustomer;