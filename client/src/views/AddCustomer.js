import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link, navigate} from '@reach/router'
import { Container, Row, Col } from 'react-bootstrap';
import ModularForm from '../components/Form';
import numberGen from '../components/number';

const AddCustomer = (props) => {
    const [errors, setErrors] = useState({});
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName:"",
        email: "",
        address: "",
        orders: [],
        number: "",
    })
    const [custNumber, setCustNumber] = useState();

    useEffect(() => {
        axios.get('http://localhost:8000/api/customers')
            .then((res) => {
                console.log(res.data)
                setCustNumber(numberGen(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);


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
            <ModularForm idnumber={custNumber} object={customer} setObject={setCustomer} errors={errors} handleSubmit={handleSubmit} submitLabel={"Add Customer"} inventory={false}/>
        </Container>
    )
}

export default AddCustomer;