import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';


const PaymentPage = () => {
    const stripe = useStripe();
    const elements = useElements();
    
    const [paymentError, setPaymentError] = useState(null);
  
    const handlePayment = async () => {

      const response = await axios.post('/api/orders/create_payment_intent/', { amount: 1000 }, {
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
      <div>
        <h1>Payment</h1>
        
        <CardElement options={{}} />
  
        {paymentError && <div>{paymentError}</div>}
  
        <button onClick={handlePayment}>Pay</button>
      </div>
    );
  };

export default PaymentPage;