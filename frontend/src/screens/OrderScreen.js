import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap'
import { Link, useParams, useNavigate} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../actions/orderActions'
import Message from '../components/Message'



function OrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [isOrderLoaded, setIsOrderLoaded] = useState(false);

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(getOrderDetails(id));
      setIsOrderLoaded(true);
    }
  }, [dispatch, id, navigate, userInfo]);

  if (!userInfo) {
    return null; 
  }

  if (!isOrderLoaded || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <Container className='py-4'>
    <div>
    <Row className='m-2'>
        <Col>
          <h1>Order Details</h1>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p><strong>Name: </strong> {order.user.name}</p>
                    <p><strong>Email: </strong>{order.user.email}</p>
                    <p>
                        <strong>Shipping: </strong>
                        {order.shippingAddress.address},  {order.shippingAddress.city}
                        {'  '} {order.shippingAddress.postcode},{'  '}
                        {'New Zealand'}
                    </p>

                    {order.isPaid ? (
                        <Message variant='success'>Paid on {order.paidAt}</Message>
                    ) : (
                            <Message variant='warning'>Not Paid</Message>
                        )}

                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? <Message variant='info'>
                        Order is empty </Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col xs={2} md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                </ListGroup.Item>
                
            </ListGroup>
            

        </Col>
    </Row>
    </div>
    </Container>
  )
}

export default OrderScreen