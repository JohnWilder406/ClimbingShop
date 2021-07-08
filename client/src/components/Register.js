import React, {useState} from 'react';
import {Card, Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios'
import { Link, navigate } from '@reach/router';

const Register= () => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const register = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/users/register', user)
            .then(res => {
                console.log(res.data);
                setUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                })
                setConfirmReg("Thank you for Registering, you can now log in!");
                setErrs({});
            })
            .catch((err) => {
                console.log(err);
                setErrs(err.res.data.errors);
            })
            navigate("/")
    }

    return (
        <Card border="dark" style={{margin: "50px"}}>
        <Link to="/">Cancel</Link>
        <Card.Header style={{textAlign: "center", fontSize: "24px"}}>Register</Card.Header>
        <Form style={{width: "800px", margin: "20px"}} onSubmit={register}>
            {/* { confirmReg !== "" ? <h4>{confirmReg}</h4> : null } */}
            <Form.Group as={Row}>
                <Form.Label column sm={2}>First Name:</Form.Label>
                <Col sm={10}>
                <Form.Control type="text" name="firstName" value={user.firstName} onChange={(e) => handleChange(e)} placeholder="Enter your first name" />
                </Col>
                {errs.firstName ? <span className="error-text">{errs.firstName.message}</span> : null}
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Last Name:</Form.Label>
                <Col sm={10}>
                <Form.Control type="text" name="lastName" value={user.lastName} onChange={(e) => handleChange(e)} placeholder="Enter your last name" />
                </Col>
                {errs.lastName ? <span className="error-text">{errs.lastName.message}</span> : null}
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Email:</Form.Label>
                <Col sm={10}>
                <Form.Control type="text" name="email" value={user.email} onChange={(e) => handleChange(e)} placeholder="Enter your email" />
                </Col>
                {errs.email ? <span className="error-text">{errs.email.message}</span> : null}
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Password:</Form.Label>
                <Col sm={10}>
                <Form.Control type="password" name="password" value={user.password} onChange={(e) => handleChange(e)} placeholder="Enter a password" />
                </Col>
                {errs.password ? <span className="error-text">{errs.password.message}</span> : null}
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={3}>Confirm Password:</Form.Label>
                <Col sm={9}>
                <Form.Control type="password" name="confirmPassword" value={user.confirmPassword} onChange={(e) => handleChange(e)} placeholder="Re-enter your password" />
                </Col>
                {errs.confirmPassword? <span className="error-text">{errs.confirmPassword.message}</span> : null}
            </Form.Group>
        <Button type="submit" style={{width: "150px", textAlign: "center"}}>Register</Button>
        </Form> 
    </Card> 
    )
}

export default Register;