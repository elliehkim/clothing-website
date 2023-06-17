import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import axios from 'axios';


const PaymentPage = () => {
    const stripe = useStripe();
    const elements = useElements();
    const cart = useSelector(state => state.cart)
    
    const [paymentError, setPaymentError] = useState(null);
  
    const getTotalAmount = () => {
      return cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0).toFixed(2);
    };

    const handlePayment = async () => {
      const totalAmount = getTotalAmount() * 100;
      
      const response = await axios.post('/api/orders/create_payment_intent/', { amount: totalAmount }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const clientSecret = response.data.clientSecret;
  
      // Confirm the card payment with the client secret
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            // Add relevant billing details here (e.g., name, email)
          },
        },
      });
  
      if (result.error) {
        // Handle payment error
        setPaymentError(result.error.message);
      } else {
        // Payment success
        console.log('Payment succeeded!');
      }
    };
  
    
    return (
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>Payment</h2>
          <CardElement options={{}} />
          {paymentError && <div>{paymentError}</div>}

          <div className="text-center">
          <button onClick={handlePayment} className='btn btn-primary mt-5 pay-btn'>Pay</button>
          </div>
        </ListGroup.Item>
      </ListGroup>
    );
  };

export default PaymentPage;