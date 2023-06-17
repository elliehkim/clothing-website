import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { Row, Col, ListGroup, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js';

import PaymentPage from '../components/PaymentPage';
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const stripePromise = loadStripe('pk_test_51NJVlgK7OSOLxLoxDdqP99eSfNHNEBWnlyaC3PFZZusZ17FRXOM7rT1ebMCA06ThRrv8JQVHm8gPDQy1qLgDryhA00w53sa8dS');

const PaymentScreen = () => {
  const cart = useSelector(state => state.cart)
  cart.itemPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0).toFixed(2)
  cart.itemQty = cart.cartItems.reduce(
    (acc, item) => acc + item.qty, 0)
  
  
  return (
    <Row className='m-5'>
        <CheckoutSteps step1 step2 />
        <ListGroup variant='flush'>
          <ListGroup.Item>
          <h2> Order Items </h2>
          {cart.cartItems.length === 0?
          <Message variant='info'>
            Your cart is empty
          </Message> : (
            <ListGroup variant='flush'>
              <Row className='text-center mt-4 mb-4'>
                    <Col xs={2} md={1}></Col>
                    <Col>Name</Col>
                    <Col>Qty</Col>
                    <Col>Price</Col>
                    <Col>Total</Col>
                  </Row>
              {cart.cartItems.map((item, index)=>(
                <ListGroup.Item key={index}>
                  <Row className='text-center'>
                    <Col xs={2} md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded/>
                    </Col>
                    <Col>{item.name}</Col>
                    <Col>{item.qty}</Col>
                    <Col>$ {item.price}</Col>
                    <Col>{(item.qty * item.price).toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
                <Row md={2}className='text-center mt-5 mb-2' >
                  <h5>Total Items: {cart.itemQty}</h5>
                  <h5>Total Amount: $ {cart.itemPrice}</h5>
                </Row>
            </ListGroup>
          )}
          </ListGroup.Item>
        </ListGroup>

      <hr class="mt-2 mb-3"/>

        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <div>{cart.shippingAddress.address}, {'   '}
            {cart.shippingAddress.city}, {'   '} {cart.shippingAddress.postcode}</div>
          </ListGroup.Item>
        </ListGroup>  

      <hr class="mt-4 mb-3"/>

      <Elements stripe={stripePromise}>
        <PaymentPage />
      </Elements>
    </Row>
  );
};

export default PaymentScreen;
