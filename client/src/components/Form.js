import React from 'react';
import {Button, Container, Form, Row, Col} from 'react-bootstrap'

const ModularForm = (props) => {
    const {customer, setCustomer, errors, handleSubmit, submitLabel} = props;

    const inputChange = (e) => {
        let newCustomer = { ...customer};
        console.log(e.target.name)
        newCustomer[e.target.name] = e.target.value;
        setCustomer(newCustomer)
    }

    console.log(errors)

    return (
        <Container className="border border-dark">
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label column sm={4}>
                            First Name:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={customer.firstName}
                                onChange={(e) => inputChange(e)} />
                            {
                                errors.name ? 
                                <span className="error">{errors.firstName.message}</span> : null
                            }
                        </Col>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label column sm={4}>
                            Last Name:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={customer.lastName}
                                onChange={(e) => inputChange(e)} />
                                {
                                errors.type ? 
                                <span className="error">{errors.lastName.message}</span> : null
                            }
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" >
                    <Form.Label column sm={2}>
                        Email Address:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="email"
                            value={customer.email}
                            onChange={(e) => inputChange(e)} />
                            {
                                errors.type ? 
                                <span className="error">{errors.email.message}</span> : null
                            }
                </Col>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                    <Form.Label column sm={4}>
                        Address:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="textarea"
                            name="address"
                            value={customer.address}
                            onChange={(e) => inputChange(e)} />
                            {
                                errors.type ? 
                                <span className="error">{errors.address.message}</span> : null
                            }
                    </Col>
                    </Form.Group>
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
