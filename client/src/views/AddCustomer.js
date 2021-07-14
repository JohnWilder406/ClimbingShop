import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {Link, navigate} from '@reach/router'
import { Container, Navbar, Nav, Button} from 'react-bootstrap';
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

    //retrieves customer db to assign next customer number for new customer using numberGen.
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

    //submit handler- creates new customer in database
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
        <Container className="mainContainer">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/main">Bodie's Climbing</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button variant="outline-dark"><Link to="/main">Main Page</Link></Button>
                    <Button variant="outline-dark"><Link to="/products">Product Database</Link></Button>
                </Nav>
            </Navbar>
            <ModularForm idnumber={custNumber} object={customer} setObject={setCustomer} errors={errors} handleSubmit={handleSubmit} submitLabel={"Add Customer"} inventory={false}/>
        </Container>
    )
}

export default AddCustomer;