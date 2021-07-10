import React from 'react';
import {Button, Container, Form, Row, Col} from 'react-bootstrap'

const ModularForm = (props) => {
    const {object, setObject, errors, handleSubmit, submitLabel, inventory, idnumber} = props;

    const inputChange = (e) => {
        let newObject = { ...object};
        newObject.number = idnumber
        console.log(e.target.name)
        newObject[e.target.name] = e.target.value;
        setObject(newObject)
        console.log(newObject)
    }

    return (
        <Container className="border border-dark">
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
                <Form.Label>Customer Number:</Form.Label>
                <Form.Control 
                readOnly 
                name={inventory ? "custnumber" : "prodnumber"}
                value={idnumber} />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label column sm={4}>
                            {inventory ? "Product Name" : "First Name"}
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name={inventory ? "name" : "firstName"}
                                value={inventory ? object.name : object.firstName}
                                onChange={(e) => inputChange(e)} />
                            {
                                errors.firstName ? <span className="error">{errors.firstName.message}</span> : 
                                errors.name ? <span className="error">{errors.name.message}</span> : null
                                
                            }
                        </Col>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label column sm={4}>
                            {inventory ? "Price" : "Last Name"}
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type={inventory ? "number" : "text"}
                                name={inventory ? "price" : "lastName"}
                                value={inventory ? object.price : object.lastName}
                                onChange={(e) => inputChange(e)} />
                                {
                                errors.lastName ? <span className="error">{errors.lastName.message}</span> : 
                                errors.price ? <span className="error">{errors.price.message}</span> : null
                            }
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" >
                    <Form.Label column sm={2}>
                        {inventory ? "Description" : "Email Address"}
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name={inventory ? "description" : "email"}
                            value={inventory ? object.description : object.email}
                            onChange={(e) => inputChange(e)} />
                            {
                                errors.description ? <span className="error">{errors.description.message}</span> :
                                errors.email ? <span className="error">{errors.email.message}</span> : null
                            }
                </Col>
                    </Form.Group>
                </Col>
                <Col>
                {inventory ? null : 
                    <Form.Group className="mb-3">
                    <Form.Label column sm={4}>
                        Address:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="textarea"
                            name="address"
                            value={object.address}
                            onChange={(e) => inputChange(e)} />
                            {
                                errors.type ? 
                                <span className="error">{errors.address.message}</span> : null
                            }
                    </Col>
                    </Form.Group>
                }
                </Col>
            </Row>
            <Form.Group as={Row}>
            <Col sm={{span: 2, offset: 1}}>
            <Button style={{width: "200px"}} type="submit">{submitLabel}</Button>
            </Col>
            </Form.Group>
        </Form>
    </Container>
    )
}

export default ModularForm;
