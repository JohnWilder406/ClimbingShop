import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link, navigate} from '@reach/router'
import { Container, Row, Col } from 'react-bootstrap';
import ModularForm from '../components/Form';
import DeleteButton from '../components/DeleteButton';

const EditCustomer = (props) => {
    const {id} = props
    const [errors, setErrors] = useState({});
    const [customer, setCustomer] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8000/api/customers/' + id)
            .then((res) => {
                console.log(res.data);
                setCustomer(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const afterDeleteHandler = () => {
        navigate('/main')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/customers/' + id, customer)
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
            <ModularForm idnumber={customer.number} object={customer} setObject={setCustomer} errors={errors} handleSubmit={handleSubmit} submitLabel={"Edit Customer"} />
            <DeleteButton id={id} afterDeleteHandler={afterDeleteHandler} deleteLabel={'Delete Customer'} mongoLabel={'customers'} />
        </Container>
    )
}

export default EditCustomer;