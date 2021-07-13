import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Nav, Navbar, Row, Col, Card, FormGroup, Form, FormControl } from 'react-bootstrap';
import {Link, navigate} from '@reach/router';
import Search from './Search';

const NewOrder = (props) => {
    const {id, location} = props;
    const [customer, setCustomer] = useState({});
    const [products, setProducts] = useState([]);
    const [prodDefault, setProdDefault] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [order, setOrder] = useState({
        item: "",
        quantity: 0,
        price: 0,
        shipped: false,
        favorite: false
    })
    const [quantity, setQuantity] = useState();

    //retrieve customer id, if favorite is selected from History page, 
    //this call assigns that order to the order in state on this page

    useEffect(() => {
        axios.get('http://localhost:8000/api/customers/' + id)
            .then((res) => {
                setCustomer(res.data);
                if(location.state.favorite) {
                    let array = (res.data.orders)
                    let index = (location.state.idx)
                    setOrder({
                        item: array[index].item,
                        quantity: array[index].quantity,
                        price: array[index].price,
                        shipped: false,
                        favorite: false
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    //retrieve inventory for the store
    useEffect(() => {
        axios.get('http://localhost:8000/api/products')
        .then((res) => {
            setProducts(res.data);
            setProdDefault(res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    //adds product to the order from the inventory table
    const addHandler = (item, price, qty) => {
        setOrder({
            item: item,
            quantity: qty,
            price: price,
            shipped: false,
            favorite: false
        })
    }

    //submits order to customers order schema in the db.
    const submitHandler = (e) => {
        console.log(order)
        e.preventDefault();
        axios.put('http://localhost:8000/api/customers/' + id + '/add', {order})
            .then((res) => {
                console.log(res)
                navigate('/customers/' + id + '/history')
            })
            .catch((err) => {
                console.log(err)
            })
    }

       //search filter
    const updateInput = async (searchQuery) => {
        const filtered = prodDefault.filter(product => {
            return product.name.toLowerCase().includes(searchQuery.toLowerCase())
        })
        setSearchQuery(searchQuery);
        setProducts(filtered);
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/main">Bodie's Climbing</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/main">Main Page</Nav.Link>
                    <Nav.Link href={"/customers/" + id + "/history"}>Return To History</Nav.Link>
                </Nav>
                <Search searchQuery={searchQuery} onChange={updateInput} />
            </Navbar>
            <h3>Order form for {customer.firstName}</h3>
            <Card className='modularForm'>
                <Card.Body>
                    <Form inline>
                        <Form.Group>
                            <Form.Label className="mb-2 mr-sm-2">Item:</Form.Label>
                            <Form.Control className="mb-2 mr-sm-2" readOnly value={order.item} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mb-2 mr-sm-2">Price: </Form.Label>
                            <Form.Control className="mb-2 mr-sm-2" readOnly value={order.price} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mb-2 mr-sm-2">Quantity:</Form.Label>
                            <Form.Control  className="mb-2 mr-sm-2" readOnly value={order.quantity} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="mb-2 mr-sm-5">
                                Total Price: ${!order.price ? 0 : order.price * order.quantity}
                            </Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <Button className="mb-2 mr-sm-2" variant="dark" onClick={(e) => submitHandler(e, order)}>Submit Order</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            <Table bordered striped>
                <thead>
                    <tr>
                        <th>Product Number</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Edit Product</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, idx) => {
                            return (
                                <tr key={idx}><td>{product.number}</td>
                                <td>{product.name}</td><td>{product.price}</td>
                                <td><Form.Control as="select" onChange={(e) => setQuantity(e.target.value)}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                </Form.Control></td>
                                <td>{product.description}</td>
                                <td>{location.state.favorite ? <Button disabled>Add to Order</Button> : <Button variant="dark" onClick={(e) => addHandler(product.name, product.price, quantity)}>Add to Order</Button>}</td></tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
export default NewOrder;