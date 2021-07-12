import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Nav, Navbar, Row, Col, Card, FormGroup, Form, FormControl } from 'react-bootstrap';
import {Link, navigate} from '@reach/router';
import Search from './Search';

const NewOrder = (props) => {
    const {id, location, favorite} = props;
    const [customer, setCustomer] = useState({});
    const [products, setProducts] = useState([]);
    const [prodDefault, setProdDefault] = useState([])
    const [searchQuery, setSearchQuery] = useState()
    const [order, setOrder] = useState({
        item: "",
        quantity: 0,
        price: 0,
        shipped: false,
        favorite: false
    })
    const [orders, setOrders] = useState([])
    const [quantity, setQuantity] = useState();

    console.log(location.state.favorite)
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/customers/' + id)
            .then((res) => {
                setCustomer(res.data);
                if(location.state.favorite) {
                    let array = (res.data.orders)
                    for(var i = 0; i < array.length; i++) {
                        if(array[i].favorite) {
                            setOrder({
                                item: array[i].item,
                                quantity: array[i].quantity,
                                price: array[i].price
                            })
                        }
                    }
                }
            })
            .then(() => {
                if(location.state.favorite) {
                    setOrders([...customer.orders, order])
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

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

    const addHandler = (item, price, qty) => {
        setOrder({
            item: item,
            quantity: qty,
            price: price
        })
        setOrders([...customer.orders, {
            item: item,
            quantity: qty,
            price: price,
            shipped: false,
            favorite: false
        }])
        
    }

    //submit handler - need to set quantity and set up order, then need to setOrders with order and then submit to update.
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(orders)
        axios.put('http://localhost:8000/api/customers/' + id, {orders: orders})
            .then((res) => {
                console.log(res)
                navigate('/main')
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
                <Navbar.Brand>Bodie's Climbing</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="">Re-Order Favorite</Nav.Link>
                    <Nav.Link href="/main">Return Home</Nav.Link>
                </Nav>
                <Search searchQuery={searchQuery} onChange={updateInput} />
            </Navbar>
            <h3>Order form for {customer.firstName}</h3>
            <Form>
                <Form.Group>
                    <Form.Label>Item:</Form.Label>
                    <Form.Control readOnly value={order.item} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price: </Form.Label>
                    <Form.Control readOnly value={order.price} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control readOnly value={order.quantity} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Total Price: {!order.price ? 0 : order.price * order.quantity}
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                    <Button onClick={(e) => submitHandler(e, orders)}>Submit Order</Button>
                </Form.Group>
            </Form>
            <Table bordered striped>
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Description</td>
                        <td>Edit Product</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, idx) => {
                            return (
                                <tr key={idx}><td>{product.name}</td><td>{product.price}</td>
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
                                <td><Button onClick={(e) => addHandler(product.name, product.price, quantity)}>Add to Order</Button></td></tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
export default NewOrder;