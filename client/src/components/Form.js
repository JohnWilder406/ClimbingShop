import React from 'react';
import {Button, Card, Form, Row, Col} from 'react-bootstrap'

const ModularForm = (props) => {
    const {object, setObject, errors, handleSubmit, submitLabel, inventory, idnumber} = props;

    //input function to load changes into form for submission.
    const inputChange = (e) => {
        let newObject = { ...object};
        newObject.number = idnumber
        console.log(e.target.name)
        newObject[e.target.name] = e.target.value;
        setObject(newObject)
        console.log(newObject)
    }

    return (
        <Card border="dark" className="modularForm">
            <Card.Body>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            {inventory ? "Product Number" : "Customer Number"}
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control 
                            readOnly 
                            name={inventory ? "custnumber" : "prodnumber"}
                            value={idnumber} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            {inventory ? "Product Name" : "First Name"}
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="text"
                                name={inventory ? "name" : "firstName"}
                                value={inventory ? object.name : object.firstName ? object.firstName : ""}
                                onChange={(e) => inputChange(e)} />
                            {
                                errors.firstName ? <span className="error">{errors.firstName.message}</span> : 
                                errors.name ? <span className="error">{errors.name.message}</span> : null
                                
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            {inventory ? "Price" : "Last Name"}
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type={inventory ? "number" : "text"}
                                name={inventory ? "price" : "lastName"}
                                value={inventory ? object.price : object.lastName ? object.lastName : ""}
                                onChange={(e) => inputChange(e)} />
                                {
                                errors.lastName ? <span className="error">{errors.lastName.message}</span> : 
                                errors.price ? <span className="error">{errors.price.message}</span> : null
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm={2}>
                        {inventory ? "Description" : "Email Address"}
                    </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="text"
                                name={inventory ? "description" : "email"}
                                value={inventory ? object.description : object.email ? object.email : ""}
                                onChange={(e) => inputChange(e)} />
                                {
                                    errors.description ? <span className="error">{errors.description.message}</span> :
                                    errors.email ? <span className="error">{errors.email.message}</span> : null
                                }
                        </Col>
                    </Form.Group>
                    {inventory ? null : 
                        <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            Address:
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="text"
                                name="address"
                                value={object.address ? object.address : ""}
                                onChange={(e) => inputChange(e)} />
                                {
                                    errors.type ? 
                                    <span className="error">{errors.address.message}</span> : null
                                }
                        </Col>
                        </Form.Group>
                    }
                <Form.Group as={Row}>
                <Col sm={{span: 1, offset: 5}}>
                <Button variant="dark" style={{width: "150px"}} type="submit">{submitLabel}</Button>
                </Col>
                </Form.Group>
            </Form>
        </Card.Body>
    </Card>
    )
}

export default ModularForm;
