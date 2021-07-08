import React from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import {navigate} from '@reach/router'

const Logout = () => {
    const logout = () => {
        axios.post("http://localhost:8000/api/users/logout")
        .then((res) => {
            console.log(res.data);
            navigate("/")
        })
    }

    return (
        <Button variant="danger" onClick={logout}>Log Out</Button>
    )
}

export default Logout;