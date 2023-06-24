import React, { useState, useEffect }  from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { Row, Col, ListGroup, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js';
import { Container } from 'react-bootstrap'

import CheckoutForm from '../components/CheckoutForm';
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'



const stripePromise = loadStripe('pk_test_51NJVlgK7OSOLxLoxDdqP99eSfNHNEBWnlyaC3PFZZusZ17FRXOM7rT1ebMCA06ThRrv8JQVHm8gPDQy1qLgDryhA00w53sa8dS');

const PaymentScreen = () => {
  
  const cart = useSelector(state => state.cart)
  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0).toFixed(2)
  cart.shippingPrice = (cart.itemsPrice>100? 0: 10).toFixed(2)
  cart.totalPrice= (Number(cart.itemsPrice)+ Number(cart.shippingPrice)).toFixed(2)
  
  const total_amount = cart.totalPrice*100
  const [clientSecret, setClientSecret] = useState("");

  const userLogin = useSelector(state=> state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
      // Create PaymentIntent as soon as the page loads
    fetch("/api/orders/create_payment_intent/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount:total_amount,
        order_items: JSON.stringify(cart.cartItems),
        shipping_address: JSON.stringify(cart.shippingAddress),
        items_price: cart.itemsPrice,
        shipping_price: cart.shippingPrice,
        total_price: cart.totalPrice,
        user: userInfo._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));

  }, []);
    
  const appearance = {
      theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  
  return (
    <Container className='py-4'>
    <div className='m-3'>
      <CheckoutSteps step1 step2/>
      <Row>
        <Col>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2> Order Items </h2>
          {cart.cartItems.length === 0?
          <Message variant='info'>
            Your cart is empty </Message> 
            : ( <ListGroup variant='flush'>
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
            </ListGroup>
            )}
            <ListGroup variant='flush'>
            <ListGroup.Item className='text-end mt-3 me-5' >
              <h5>Items Price: $ {cart.itemsPrice}</h5>
              <h5>Shipping Price: $ {cart.shippingPrice}</h5>
              <h5>Total Price: $ {cart.totalPrice}</h5>
            </ListGroup.Item>
          </ListGroup>
           
          </ListGroup.Item>
          </ListGroup>

        <hr className="mt-2 mb-3"/>

          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <div>{cart.shippingAddress.address}, {'   '}
              {cart.shippingAddress.city}, {'   '} {cart.shippingAddress.postcode}</div>
            </ListGroup.Item>
          </ListGroup> 

        <hr className="mt-3 mb-4"/>


        </Col>
      </Row>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>Payment</h2>
          <div className="d-flex justify-content-center mt-3">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
    </Container>
  );
};

export default PaymentScreen;