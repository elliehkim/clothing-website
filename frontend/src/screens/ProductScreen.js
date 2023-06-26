import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductsDetails } from '../actions/productActions'

function ProductScreen({props}){
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState('s')

    const { id } = useParams();
    const dispatch = useDispatch()
    const productDetails = useSelector(state=> state.productDetails)
    const {error, loading, product} = productDetails
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(listProductsDetails(id))
    },[dispatch])

    const addToCartHandler = () =>{
        navigate(`/cart/${id}?qty=${qty}&size=${size}`)
    }

  return (
    <Container className='py-4'>
    <div>
        <Link to='/' className='btn btn-light my-3'> Go Back</Link>

        {loading ? <Loader />
            : error ? <Message variant='danger'> {error} </Message>
            : 
            <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Price : ${product.price}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>Price: </Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Size: </Col>
                                <Col xs='auto' className='my-1'>
                                <Form.Control 
                                as="select" 
                                value={size}
                                onChange={(e)=>setSize(e.target.value)}>
                                    <option value="s">S</option>
                                    <option value="m">M</option>
                                    <option value="l">L</option>
                                    <option value="xl">XL</option>
                                </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Status: </Col>
                                <Col>
                                     In Stock
                                </Col>
                            </Row>
                        </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Qty</Col>
                            <Col xs='auto' className='my-1'>
                                <Form.Control 
                                    as="select" 
                                    value={qty} 
                                    onChange={(e) => setQty(e.target.value)}>
                                    {

                                    [...Array(20).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                        </option>
                                    ))
                                    }

                                </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                        <ListGroup.Item>
                            <Button 
                            onClick={addToCartHandler}
                            className='btn btn-primary w-100'
                            disabled ={product.countInStock === 0} type='button'>Add to Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        }
    </div>
    </Container>
  )
}

export default ProductScreen