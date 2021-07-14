import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link, navigate} from '@reach/router'
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import ModularForm from '../components/Form';
import DeleteButton from '../components/DeleteButton';

const EditCustomer = (props) => {
    const {id} = props
    const [errors, setErrors] = useState({});
    const [customer, setCustomer] = useState({})

    //retrieves specific customer and loads customer info into form.
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

    //navigates to main page if customer is deleted
    const afterDeleteHandler = () => {
        navigate('/main')
    }

    //submits changes to customer
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
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Bodie's Climbing</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/main">Main Page</Link></Button>
                    <Button variant="outline-dark"><Link to={"/customers/" + id + "/history"}>Customer History</Link></Button>
                </Nav>
                <DeleteButton id={id} afterDeleteHandler={afterDeleteHandler} deleteLabel={'Delete Customer'} mongoLabel={'customers'} />
            </Navbar>
            <ModularForm idnumber={customer.number} object={customer} setObject={setCustomer} errors={errors} handleSubmit={handleSubmit} submitLabel={"Edit Customer"} />
        </Container>
    )
}

export default EditCustomer;