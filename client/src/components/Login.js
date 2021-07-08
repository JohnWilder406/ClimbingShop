import React, {useState} from 'react';
import {Card, Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios'
import { Link, navigate } from '@reach/router';


const Login = (props) => {
    const {setToken} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login", {
            email: email,
            password: password,
        },
        {
            withCredentials: true
        })
        .then((res) => {
            setToken(true)
            navigate("/main")
        })
        .catch(err => {
            console.log(err.response);
            setErrorMessage(err.response.data.message)
        })
    }

    return (
        <Card border="dark" style={{margin: "50px"}}>
        <Card.Header style={{textAlign: "center", fontSize: "24px"}}>Login</Card.Header>
        <Form style={{width: "800px", margin: "20px"}} onSubmit={login}>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Email:</Form.Label>
                <Col sm={10}>
                <Form.Control type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                </Col>
            </Form.Group>
            {
                errorMessage ? <span className="error">{errorMessage}</span> : null
            }
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Password:</Form.Label>
                <Col sm={10}>
                <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                </Col>
            </Form.Group>
        <Button type="submit" style={{width: "150px", textAlign: "center"}}>Login</Button>
        </Form>
        <Link to="/register">Not registered? Click here.</Link>
    </Card>
    )
}

export default Login;