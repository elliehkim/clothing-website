import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card, Container } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen() {
    const { id } = useParams()
    const productId = id
    const location = useLocation()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    
    const userLogin = useSelector(state=> state.userLogin)
    const { userInfo } = userLogin

    const queryParams = new URLSearchParams(location.search);
    const qty = queryParams.get('qty') ? Number(queryParams.get('qty')) : 1;
    const size = queryParams.get('size');

    useEffect (() =>{
        if(productId){
            dispatch(addToCart(productId, qty, size))
        }
    },[dispatch, productId, qty, size])  
    

    const removeFromCartHandler= (id) =>{
        dispatch(removeFromCart(id))
    }

    const checkoutHandler= () =>{
        if(!userInfo){
            navigate('/login')
        }else{
            navigate('/shipping')
        }
    }
    
  return (
    <Container className='py-4'>
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? 
                <Message variant='info'>
                    Your Cart is empty <Link to ='/'>Go back</Link>
                </Message>
                : <ListGroup variant='flush'>
                    <ListGroup.Item>
                            <Row>
                                <Col md={2}>
                                </Col>
                                <Col md={3}>
                                  <h6>Product</h6>
                                </Col>
                                <Col md={2}>
                                    <h6>Price</h6>
                                </Col>

                                <Col md={2}>
                                   <h6>Size</h6>
                                </Col>

                                <Col md={2}>
                                    <h6>Qty</h6>
                                </Col>

                                <Col md={1}>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    {cartItems.map(item =>
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src= {item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}> {item.name} </Link>
                                </Col>
                                <Col md={2}>
                                    $ {item.price}
                                </Col>

                                <Col md={2}>
                                    {(item.size).toUpperCase()}
                                </Col>

                                <Col md={2}>
                                <Form.Control 
                                    as="select" 
                                    value={item.qty} 
                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value), item.size))}>
                                    {

                                        [...Array(item.countInStock).keys()].map((x) => ( 
                                                <option key={x + 1} value={x + 1}> 
                                                {x + 1} 
                                                </option>
                                            ))
                                    }

                                </Form.Control>
                                </Col>

                                <Col md={1}>
                                    <Button
                                    type='button'
                                    variant='light'
                                    onClick ={()=> removeFromCartHandler(item.product)}>
                                        <i className="fas fa-xmark"></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>)}
                </ListGroup>
                }
                <Link to ='/' className="d-flex justify-content-center mt-4">
                <Button>Continue Shopping</Button>
                </Link>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Subtotal</h2>
                        $ {cartItems.reduce((acc,item)=> acc +item.qty * item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                </ListGroup>

                <ListGroup.Item>
                    <Button
                        type='button'
                        className='btn btn-primary w-100'
                        disabled={cartItems.length==0}
                        onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                    </Button>
                </ListGroup.Item>

            </Card>
        </Col>
    </Row>
    </Container>
  )
}

export default CartScreen